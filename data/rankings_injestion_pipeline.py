from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import datetime
import json


def getElementText(element):
    return element.text.strip()


def getElementTextByXPath(container, xpath):
    return getElementText(container.find_element(By.XPATH, xpath))


def getElementsTextByXPath(container, xpath):
    return list(map(getElementText, container.find_elements(By.XPATH, xpath)))


def formatDate(date):
    return date.strftime('%Y-%m-%d')


def sanitizeDivisionName(name):
    nameUpper = name.upper()

    if ("POUND-FOR-POUND" in nameUpper):
        nameUpper = "POUND-FOR-POUND"

    return nameUpper


def pull_rankings():
    # Set up web driver
    options = webdriver.ChromeOptions()
    options.headless = True
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)

    # Nagivate and wait to load
    BASE_URL = "https://www.ufc.com/rankings"
    driver.get(BASE_URL)
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.XPATH, "//div[contains(@class, 'athlete-rankings')]"))
    )
    print("Loaded {}".format(BASE_URL))

    # Scroll till bottom of page
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")

    # Last updated
    last_updated = driver.find_element(
        By.XPATH, "//p[contains(text(), 'Last') and contains(text(), 'updated:')]").text
    last_updated = last_updated.split('UPDATED: ')[1].split(', ')[1]
    last_updated = datetime.datetime.strptime(
        last_updated, '%b. %d').replace(year=datetime.datetime.today().year)
    print("Last updated: {}".format(last_updated))

    # Get division containers
    division_containers = driver.find_elements(
        By.XPATH, "//div[@class='view-grouping']")
    print("{} division containers visible".format(len(division_containers)))

    # Build rankings object
    rankings = {}
    for division_container in division_containers:
        division_name = sanitizeDivisionName(
            getElementTextByXPath(
                division_container, ".//div[contains(@class, 'rankings--athlete--champion')]//h4"))
        champion_name = getElementTextByXPath(
            division_container, ".//div[contains(@class, 'rankings--athlete--champion')]//a[contains(@href, '/athlete/')]")
        fighters = getElementsTextByXPath(
            division_container, ".//tr//a[contains(@href, '/athlete/')]")

        division = []
        division.append({
            "rank": 0,
            "fighter": champion_name
        })
        rank = 0
        for fighter in fighters:
            rank = rank + 1
            division.append({
                "rank": rank,
                "fighter": fighter
            })

        rankings[division_name] = division

    hist_rankings = {}
    hist_rankings[formatDate(last_updated)] = rankings
    return hist_rankings


# Output structured dict as json into file
new_rankings = pull_rankings()
date = list(new_rankings.keys())[0]
file = open(f"{date}.json", "w")
s = json.dumps(new_rankings, indent=4)
file.write(s)
