import { Schema } from "ajv"
import Ajv2020 from "ajv/dist/2020"
import addFormats from "ajv-formats"

export const verifyCredentialSubjectSchema2020 = (
  schema: Schema,
  credential: { credentialSubject: Record<string, unknown> },
  refSchemas?: Schema[]
): void => {
  const ajv = new Ajv2020()
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
