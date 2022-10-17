import schema from './company-identity-schema.json'
import credential from './company-identity-credential.json'
import { verifyCredentialSubjectSchema } from '../../../test/verify-credential-subject-schema'
import { issueAndVerify } from '../../../test/issue-and-verify'

describe("Company Identity", () => {
  test("Credential should match JSON Schema", async () => {
    verifyCredentialSubjectSchema(schema, credential)
  })

  test("Credential can be issued and verified", async () => {
    await issueAndVerify(credential)
  })
})