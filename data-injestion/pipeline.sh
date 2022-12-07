#!/bin/bash

function quit {
    echo "$1"
    exit 1
}

master_file_name=rankings_history.json
if [ ! -z "$1" ]; then
    master_file_name=$1
fi

if ! aws s3 cp s3://andrewlor.me/demos/historical-ufc-rankings/data/$master_file_name ./$master_file_name ||
    [ ! -f "./$master_file_name" ]; then
    quit "Download master rankings failed"
fi

if ! python3 pull_rankings.py; then
    quit "Pull rankings failed."
fi

pattern="./*.json"
files=( $pattern )
pulled_file_name=${files[0]}
if [ ! -f "$pulled_file_name" ]; then
    quit "Pull rankings failed."
fi
pulled_file_name=${pulled_file_name:2}

if ! python3 verify_rankings.py ./$pulled_file_name; then
    quit "Pulled verification failed."
fi

if ! python3 append_json.py -f ./$pulled_file_name ./$master_file_name; then
    quit "Append JSON failed."
fi

if ! aws s3 cp ./$pulled_file_name s3://andrewlor.me/demos/historical-ufc-rankings/data/pulled/$pulled_file_name; then
    quit "Upload pulled rankings failed."
fi

if ! aws s3 cp ./$master_file_name s3://andrewlor.me/demos/historical-ufc-rankings/data/$master_file_name; then
    quit "Upload master rankings failed."
fi

if ! rm ./$pulled_file_name || ! rm ./$master_file_name; then
    quit "Clean up failed."
fi
