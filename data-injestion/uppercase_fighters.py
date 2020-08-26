import json
import sys


src_file_name = sys.argv[1]

src_file = open(src_file_name, "r")
src_rankings = json.load(src_file)

for date in src_rankings:
    for division in src_rankings[date]:
        for rank in src_rankings[date][division]:
            rank["fighter"] = rank["fighter"].upper()

upper_file = open(src_file_name, "w")
s = json.dumps(src_rankings, indent=4)
upper_file.write(s)
