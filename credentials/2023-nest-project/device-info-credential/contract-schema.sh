#!/bin/bash

# Commands to run
COMMANDS=(
  "tldrc -i contract.tldr json-schema https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/Device"
)

FILES=(
  "schemas/device-schema.json"
)

for index in "${!COMMANDS[@]}"; do
    result=$(${COMMANDS[$index]})
    echo $result > ${FILES[$index]}
done
