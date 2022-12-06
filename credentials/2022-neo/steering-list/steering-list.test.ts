import { Options, compact } from 'jsonld'
import credential from './steering-list-credential.json'
import { issueAndVerify } from '../../../test/issue-and-verify'
import { digitalBazaarDocumentLoader, transmuteDocumentLoader } from '../neo-document-loader'

describe("Production ", () => {
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
      "@id": "some URI, e.g. https://installer.example.com/credential/1",
      "@type": [
        "https://www.w3.org/2018/credentials#VerifiableCredential",
        "https://vc-context.elia.be/2022/v1/SteeringListCredential",
      ],
      "https://www.w3.org/2018/credentials#credentialSubject": {
        "@id": "deviceIdScheme:123",
        "@type": "https://vc-context.elia.be/2022/v1/SteerableDevice",
        "https://vc-context.elia.be/2022/v1/hasCloudSteeringList": {
          "@type": "https://vc-context.elia.be/2022/v1/CloudSteeringList",
          "https://vc-context.elia.be/2022/v1/documentationLink": "https://example.com/cloud",
          "https://vc-context.elia.be/2022/v1/documentationTags": [
            "tag1",
            "tag2",
          ],
        },
        "https://vc-context.elia.be/2022/v1/hasLocalSteeringList": {
          "@type": "https://vc-context.elia.be/2022/v1/LocalSteeringList",
          "https://vc-context.elia.be/2022/v1/communicationProtocol": "zigbee",
          "https://vc-context.elia.be/2022/v1/communicationType": "modbus",
          "https://vc-context.elia.be/2022/v1/documentationLink": "https://example.com/local",
        },
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