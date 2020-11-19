import json
import sys

file_name = sys.argv[1]

file = open(file_name, "r")
rankings = json.load(file)

new_rankings = {}

for key in sorted(rankings):
    new_rankings[key] = rankings[key]

new_file = open(file_name, "w")
s = json.dumps(new_rankings)
new_file.write(s)
