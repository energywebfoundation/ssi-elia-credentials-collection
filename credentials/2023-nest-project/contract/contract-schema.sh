#!/bin/bash

# Commands to run
COMMANDS=(
  "tldrc -i contract.tldr json-schema https://vc-context.elia.be/2022/v1/Contract"
  "tldrc -i contract.tldr json-schema https://schema.org/Organization"
  "tldrc -i contract.tldr json-schema https://schema.org/Person"
)

FILES=(
  "schemas/contract-schema.json"
  "schemas/organization-schema.json"
  "schemas/person-schema.json"
)

for index in "${!COMMANDS[@]}"; do
    result=$(${COMMANDS[$index]})
    echo $result > ${FILES[$index]}
done
