import { check } from '@transmute/jsonld-schema'
import { Options, expand } from 'jsonld';
import credential from './device-info-credential.json'
import { verifyCredentialSubjectSchema } from '../../../test/verify-credential-subject-schema'
import { issueAndVerify } from '../../../test/issue-and-verify'
import { documentLoader } from '../../../test/bloomDocumentLoader'

describe("Device Info", () => {
  // test("Credential should match JSON Schema", async () => {
  //   verifyCredentialSubjectSchema(schema, credential)
  // })

  test("Credential can be issued and verified", async () => {
    await issueAndVerify(credential)
  })

  test("Credential is valid JSON-LD", async () => {
    const result = await check({input: credential, documentLoader })
    expect(result.ok).toBeTruthy()
    // const options: Options.Expand = {
    //   documentLoader: documentLoader
    // }
    // const expanded = await expand(credential, options)
    // console.log(expanded)
  })
})