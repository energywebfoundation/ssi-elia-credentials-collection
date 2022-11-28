import { Options, compact } from 'jsonld'
import credential from './energy-storage-credential.json'
import { issueAndVerify } from '../../../test/issue-and-verify'
import { digitalBazaarDocumentLoader, transmuteDocumentLoader } from '../neo-document-loader'

describe("Energy Storage", () => {
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
        "https://vc-context.elia.be/2022/v1/EnergyStorageDeviceCredential",
      ],
      "https://www.w3.org/2018/credentials#credentialSubject": {
        "@id": "deviceIdScheme:123",
        "@type": "https://vc-context.elia.be/2022/v1/EnergyStorageDevice",
        "https://vc-context.elia.be/2022/v1/annualizedWarrantyCapacity": 10,
        "https://vc-context.elia.be/2022/v1/bmsFeedbackLoopAvailable": true,
        "https://vc-context.elia.be/2022/v1/cRateAllowed": "0.5C",
        "https://vc-context.elia.be/2022/v1/capacityTotalTheoretical": 10,
        "https://vc-context.elia.be/2022/v1/cellChemistry": [
          "chemical1",
          "chemical2",
        ],
        "https://vc-context.elia.be/2022/v1/depthOfDischarge": 10,
      },
      "https://www.w3.org/2018/credentials#issuanceDate": {
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        "@value": "2021-05-14T12:55:30Z",
      },
      "https://www.w3.org/2018/credentials#issuer": {
        "@id": "did:example:dso",
      },
    }
    expect(compacted).toEqual(expected)
  })
})