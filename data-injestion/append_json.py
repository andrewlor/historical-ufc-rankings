import json
import sys

force = False
if "-f" in sys.argv:
    force = True
    sys.argv.remove("-f")

src_file_name = sys.argv[1]
target_file_name = sys.argv[2]

src_file = open(src_file_name, "r")
src_rankings = json.load(src_file)

target_file = open(target_file_name, "r")
target_rankings = json.load(target_file)

if (len(set(src_rankings.keys()) & set(target_rankings.keys())) > 0 and not force):
    print(
        f"WARNING: Some keys from {src_file_name} already in {target_file_name}")
    print(f"WARNING: Not appending data")
    print(f"Use -f flag to force override the data")
else:
    target_rankings.update(src_rankings)
    new_target_file = open(target_file_name, "w")
    s = json.dumps(target_rankings)
    new_target_file.write(s)
