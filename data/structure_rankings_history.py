import json

# Take the data in rankings_history.csv, structure it, and output into JS object literal module in rankings_history.js
# Input CSV Schema: date, weightclass, fighter, rank
# Output JSON Schema:
# {
#   "{date}": {
#       "{weight_class}": [
#           {
#               fighter: String,
#               rank: Integer
#           },
#           ...
#       ],
#       ...
#   ],
#   ...       
# }

# Read in file contents and chop first and last line
file = open("rankings_history.csv", "r")
file_contents = file.read()
lines = file_contents.split("\n")[1:]
lines = lines[0:len(lines) - 1]

print("Read in {} lines from rankings_history.csv".format(len(lines)))

# Parse lines and put into structed dict
rankings_history = {}
for line in lines:
    date,weight_class,fighter,rank = line.split(",")

    if not date in rankings_history.keys(): rankings_history[date] = {}

    if not weight_class in rankings_history[date].keys():
        rankings_history[date][weight_class] = []

    rankings_history[date][weight_class].append({
        "fighter": fighter,
        "rank": int(rank)
    })

print("Parsed data into {} records".format(len(rankings_history)))

for date in rankings_history:
    for weight_class in rankings_history[date]:
        ranks = list(map(lambda rank: rank["rank"], rankings_history[date][weight_class]))
        if len(ranks) / 2 == len(list(dict.fromkeys(ranks))):
            print(f"Splitting {date} {weight_class} into male and female")
            division = rankings_history[date][weight_class]
            del rankings_history[date][weight_class]

            mens_weight_class = f"Men's {weight_class}"
            womens_weight_class = f"Women's {weight_class}"

            rankings_history[date][mens_weight_class] = []
            rankings_history[date][womens_weight_class] = []

            for i in range(len(ranks)):
                if i % 2 == 0:
                    rankings_history[date][mens_weight_class].append(division[i])
                else:
                    rankings_history[date][womens_weight_class].append(division[i])

            break

# Output structured dict as json into file
file = open("rankings_history.json", "w")
s = json.dumps(rankings_history, indent=4)
file.write(s)

print("Output to rankings_history.json")