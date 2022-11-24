import Ajv, { Schema } from "ajv"
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

export const verifyDataDisplayStructure = (dataDisplayApplication: { dataTypeIRI: string, dataDisplay: { properties: Record<string, unknown>[] }}): void => {
  const validate = ajv.compile(labeledDisplayMappingObjectSchema)
  dataDisplayApplication.dataDisplay.properties.forEach(property => {
    const valid = validate(property)
    expect(valid).toBeTruthy()
  })
}

// https://identity.foundation/wallet-rendering/#labeled-display-mapping-object-2
const labeledDisplayMappingObjectSchema: Schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Labeled Display Mapping Object",
  "oneOf": [
    {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "path": {
          "type": "array",
          "items": {"type": "string"}
        },
        "schema": {
          "oneOf": [
            {
              "type": "object",
              "additionalProperties": false,
              "properties": {
                "type": {
                  "type": "string",
                  "enum": ["boolean", "number", "integer"]
                }
              },
              "required": ["type"]
            },
            {
              "anyOf": [
                {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "type": {
                      "type": "string",
                      "enum": ["string"]
                    },
                    "format": {
                      "type": "string",
                      "enum": ["date-time", "time", "date", "email", "idn-email", "hostname", "idn-hostname", "ipv4", "ipv6", "uri", "uri-reference", "iri", "iri-reference"]
                    }
                  },
                  "required": ["type"]
                },
                {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "type": {
                      "type": "string",
                      "enum": ["string"]
                    },
                    "contentEncoding": {
                      "type": "string",
                      "enum": ["7bit", "8bit", "binary", "quoted-printable", "base16", "base32", "base64"]
                    },
                    "contentMediaType": {
                      "type": "string"
                    }
                  },
                  "required": ["type"]
                }
              ]
            }
          ]
        },
        "fallback": {
          "type": "string"
        },
        "label": {
          "type": "string"
        }
      },
      "required": ["path", "schema", "label"]
    },
    {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "text": {
          "type": "string"
        },
        "label": {
          "type": "string"
        }
      },
      "required": ["text", "label"]
    }
  ]
}