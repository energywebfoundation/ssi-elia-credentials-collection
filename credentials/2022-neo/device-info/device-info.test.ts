import credential from './device-info-credential.json'
import { verifyCredentialSubjectSchema } from '../../../test/verify-credential-subject-schema'
import { issueAndVerify } from '../../../test/issue-and-verify'

describe("Device Info", () => {
  // test("Credential should match JSON Schema", async () => {
  //   verifyCredentialSubjectSchema(schema, credential)
  // })

  test("Credential can be issued and verified", async () => {
    await issueAndVerify(credential)
  })
})