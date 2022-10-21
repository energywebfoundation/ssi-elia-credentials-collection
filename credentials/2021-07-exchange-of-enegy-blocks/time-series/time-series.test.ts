import schema from './time-series-schema.json'
import credential from './time-series-credential.json'
import { verifyCredentialSubjectSchema } from '../../../test/verify-credential-subject-schema'
import { issueAndVerify } from '../../../test/issue-and-verify'
import { documentLoader } from '../../../test/document-loader'

describe("Time Series", () => {
  test("Credential should match JSON Schema", async () => {
    verifyCredentialSubjectSchema(schema, credential)
  })

  test("Credential can be issued and verified", async () => {
    await issueAndVerify(credential, documentLoader)
  })
})