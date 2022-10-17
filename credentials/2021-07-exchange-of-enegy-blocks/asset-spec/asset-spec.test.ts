import schema from './asset-spec-schema.json'
import credential from './asset-spec-credential.json'
import { verifyCredentialSubjectSchema } from '../../../test/verify-credential-subject-schema'
import { issueAndVerify } from '../../../test/issue-and-verify'

describe("AssetSpec", () => {
  test("Credential should match JSON Schema", async () => {
    verifyCredentialSubjectSchema(schema, credential)
  })

  test("Credential can be issued and verified", async () => {
    await issueAndVerify(credential)
  })
})