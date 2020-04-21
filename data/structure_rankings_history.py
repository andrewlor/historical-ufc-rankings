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

# Output structured dict as json into file
file = open("rankings_history.js", "w")
s = json.dumps(rankings_history, indent=4)
s = "const rankings_history = " + s + ";\n\nexport default rankings_history;"
file.write(s)

print("Output to rankings_history.js")