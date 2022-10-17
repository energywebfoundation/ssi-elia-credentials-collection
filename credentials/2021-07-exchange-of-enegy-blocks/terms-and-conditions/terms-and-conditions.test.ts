import credential from './terms-and-conditions-credential.json'
import { issueAndVerify } from '../../../test/issue-and-verify'

describe("Terms And Conditions", () => {
  // test("Credential should match JSON Schema", async () => {
  //   verifyCredentialSubjectSchema(schema, credential)
  // })

  test("Credential can be issued and verified", async () => {
    await issueAndVerify(credential)
  })
})