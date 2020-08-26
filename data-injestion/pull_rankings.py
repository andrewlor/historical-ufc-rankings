from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import datetime
import json
import sys

P4P = "POUND-FOR-POUND"


def get_element_text(element):
    return element.text.strip().upper()


def get_element_text_by_xpath(container, xpath):
    return get_element_text(container.find_element(By.XPATH, xpath))


def get_elements_text_by_xpath(container, xpath):
    return list(map(get_element_text, container.find_elements(By.XPATH, xpath)))


def format_date(date):
    return date.strftime('%Y-%m-%d')


def is_division_p4p(name):
    return P4P in name.upper()


def sanitize_division_name(name):
    if (is_division_p4p(name)):
        if ("WOMEN" in name.upper()):
            return f"{P4P} (W)"
        else:
            return f"{P4P} (M)"
    else:
        return name


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
last_updated = format_date(last_updated)
print("Last updated: {}".format(last_updated))

# Get division containers
division_containers = driver.find_elements(
    By.XPATH, "//div[@class='view-grouping']")
print("{} division containers visible".format(len(division_containers)))

# Build rankings object
rankings = {}
for division_container in division_containers:
    division_name = sanitize_division_name(
        get_element_text_by_xpath(
            division_container, ".//div[contains(@class, 'rankings--athlete--champion')]//h4"))

    champion_name = ""
    try:
        champion_name = get_element_text_by_xpath(
            division_container, ".//div[contains(@class, 'rankings--athlete--champion')]//a[contains(@href, '/athlete/')]")
    except NoSuchElementException:
        champion_name = "NA"
        print(f"No champ found for {division_name}")

    fighters = get_elements_text_by_xpath(
        division_container, ".//tr//a[contains(@href, '/athlete/')]")

    print(
        f"Building {division_name} rankings object with champion {champion_name} and {len(fighters)} fighters")

    rank = 1 if is_division_p4p(division_name) else 0
    division = []
    division.append({
        "rank": rank,
        "fighter": champion_name
    })
    for fighter in fighters:
        rank = rank + 1
        division.append({
            "rank": rank,
            "fighter": fighter
        })

    rankings[division_name] = division


new_rankings = {}
new_rankings[last_updated] = rankings

# Parse CLI args
target_dir = sys.argv[1] if len(sys.argv) == 2 else "."
target_dir = target_dir.replace("/", "")

# Output structured dict as json into file
file_path = f"{target_dir}/{last_updated}.json"
file = open(file_path, "w")
s = json.dumps(new_rankings, indent=4)
file.write(s)
print(f"Output to {file_path}")
