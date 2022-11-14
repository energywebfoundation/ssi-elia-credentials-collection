import { Options, compact } from 'jsonld'
import credential from './energy-location-credential.json'
import { issueAndVerify } from '../../../test/issue-and-verify'
import { digitalBazaarDocumentLoader, transmuteDocumentLoader } from '../neo-document-loader'

describe("Energy Location", () => {
  // test("Credential should match JSON Schema", async () => {
  //   verifyCredentialSubjectSchema(schema, credential)
  // })

  test("Credential can be issued and verified", async () => {
    await issueAndVerify(credential, transmuteDocumentLoader)
  })

  test("Compacted credential is as expected", async () => {
    const options: Options.Compact = {
      documentLoader: digitalBazaarDocumentLoader
    }
    const compacted = await compact(credential, {}, options)
    const expected = {
      "@id": "<some URI, e.g. https://elia.be/credential/1>",
      "@type": [
        "https://www.w3.org/2018/credentials#VerifiableCredential",
        "https://vc-context.elia.be/2022/v1/EnergyLocationCredential"
      ],
      "https://www.w3.org/2018/credentials#credentialSubject": {
        "@type": "https://vc-context.elia.be/2022/v1/EnergyLocation",
        "https://vc-context.elia.be/2022/v1/HeadMeter": {
          "@type": "https://vc-context.elia.be/2022/v1/HeadMeter",
          "https://vc-context.elia.be/2022/v1/eanCode": "5464531654654",
          "https://vc-context.elia.be/2022/v1/idCountry": "BE",
          "https://vc-context.elia.be/2022/v1/meterId": "65431654"
        },
        "https://vc-context.elia.be/2022/v1/localIdentificationMethodOfHeadMeter": "<some location id>"
      },
      "https://www.w3.org/2018/credentials#issuanceDate": {
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        "@value": "2021-05-14T12:55:30Z"
      },
      "https://www.w3.org/2018/credentials#issuer": {
        "@id": "did:example:dso"
      }
    }
    expect(compacted).toEqual(expected)
  })
})