import { Options, expand } from 'jsonld'
import credential from './consumption-assessment-credential.json'
import { issueAndVerify } from '../../../test/issue-and-verify'
import { digitalBazaarDocumentLoader, transmuteDocumentLoader } from '../neo-document-loader'

describe("Consumption Assessment", () => {
  // test("Credential should match JSON Schema", async () => {
  //   verifyCredentialSubjectSchema(schema, credential)
  // })

  test("Credential can be issued and verified", async () => {
    await issueAndVerify(credential, transmuteDocumentLoader)
  })

  test("Credential expands as expected", async () => {
    const options: Options.Expand = {
      documentLoader: digitalBazaarDocumentLoader
    }
    const expanded = await expand(credential, options)
    console.log(expanded)
  })
})