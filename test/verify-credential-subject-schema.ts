import Ajv, { Schema } from "ajv"
import addFormats from "ajv-formats"

export const verifyCredentialSubjectSchema = (
  schema: Schema,
  credential: { credentialSubject: Record<string, unknown> },
  refSchemas?: Schema[]
): void => {
  const ajv = new Ajv()
  addFormats(ajv)
  if (refSchemas) {
    refSchemas.forEach((schema) => {
      ajv.addSchema(schema)
    })
  }
  const validate = ajv.compile(schema)
  const valid = validate(credential.credentialSubject)
  expect(valid).toBeTruthy()
}