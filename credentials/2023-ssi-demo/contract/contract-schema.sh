#!/bin/bash

# Name of the output JSON file
OUTPUT_FILE="contract-schema.json"

# Run the command and capture its output
CMD_OUTPUT=$(tldrc -i contract.tldr json-schema https://vc-context.elia.be/2022/v1/Contract)

# Print the command output in JSON format and write it to a file
echo $CMD_OUTPUT > "$OUTPUT_FILE"

echo "Result written to $OUTPUT_FILE"
