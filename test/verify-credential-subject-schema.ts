import Ajv, { Schema } from "ajv"
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

export const verifyCredentialSubjectSchema = (schema: Schema, credential: { credentialSubject: Record<string, unknown> }): void => {
  const validate = ajv.compile(schema)
  const valid = validate(credential.credentialSubject)
  expect(valid).toBeTruthy()
}