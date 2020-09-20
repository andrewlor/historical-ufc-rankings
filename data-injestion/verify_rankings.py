import json
import sys

P4P = "POUND-FOR-POUND"


def is_division_p4p(name):
    return P4P in name.upper()


target_file_name = sys.argv[1]

target_file = open(target_file_name, "r")
rankings_history = json.load(target_file)

assert len(rankings_history) == 1

for date in rankings_history:
    rankings = rankings_history[date]
    assert len(rankings) == 14

    for division_name in rankings:
        division = rankings[division_name]

        format_string = f"{len(division)} {division_name} FIGHTERS"
        ranks = list(map(lambda rank: rank['rank'], division))

        if is_division_p4p(division_name):
            assert len(division) == 15, format_string

            assert ranks == list(
                range(1, 16)), f"{division_name} ranks {ranks}"
        else:
            if division_name == "WOMEN'S FEATHERWEIGHT":
                assert len(division) == 1, format_string
                assert ranks == [0], f"{division_name} ranks {ranks}"
            else:
                assert len(division) == 16, format_string
                assert ranks == list(
                    range(0, 16)), f"{division_name} ranks {ranks}"
