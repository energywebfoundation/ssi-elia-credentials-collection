#!/bin/bash

# Commands to run
COMMANDS=(
  "tldrc -i contract.tldr json-schema https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/Contract"
  "tldrc -i contract.tldr json-schema https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/Device"
  "tldrc -i contract.tldr json-schema https://schema.org/Organization"
  "tldrc -i contract.tldr json-schema https://schema.org/Person"
)

FILES=(
  "schemas/contract-schema.json"
  "schemas/device-schema.json"
  "schemas/organization-schema.json"
  "schemas/person-schema.json"
)

for index in "${!COMMANDS[@]}"; do
    result=$(${COMMANDS[$index]})
    echo $result > ${FILES[$index]}
done
