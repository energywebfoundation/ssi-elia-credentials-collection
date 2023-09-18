#!/bin/bash

# Name of the output JSON file
OUTPUT_FILE="device-info-context.json"

# Ensure that jq (a lightweight and flexible command-line JSON processor) is installed
if ! command -v jq &> /dev/null
then
    echo "jq could not be found. Please install it first."
    exit
fi

# Ensure that treeLDR is installed
if ! command -v tldrc &> /dev/null
then
    echo "tldrc could not be found. Please install it first."
    exit
fi

# Initialize the output file with an empty JSON array
echo '[]' > "$OUTPUT_FILE"

# Function to append command result to the JSON array
append_to_json() {
    local result=$1
    tmp=$(mktemp)
    jq ". += [$result]" "$OUTPUT_FILE" > "$tmp" && mv "$tmp" "$OUTPUT_FILE"
}

# Commands to run
COMMANDS=(
  "tldrc -i device-info.tldr json-ld-context https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/Device"
)

# Loop through each command, execute it, and append its result to the JSON array
for cmd in "${COMMANDS[@]}"; do
    echo "Executing: $cmd"
    result=$($cmd)
    append_to_json "$result"
done

echo "Results written to $OUTPUT_FILE"
