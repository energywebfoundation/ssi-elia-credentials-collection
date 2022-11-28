import { Options, compact } from 'jsonld'
import credential from './production-credential.json'
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
        "https://vc-context.elia.be/2022/v1/PowerProductinDeviceCredential",
      ],
      "https://www.w3.org/2018/credentials#credentialSubject": {
        "@id": "deviceIdScheme:123",
        "@type": "https://vc-context.elia.be/2022/v1/PowerProducingDevice",
        "https://saref.etsi.org/saref4ener/powerSource": "mains3Phase",
        "https://vc-context.elia.be/2022/v1/cosPhi": 0.9,
        "https://vc-context.elia.be/2022/v1/cutoffFrequencyProduction": 15,
        "https://vc-context.elia.be/2022/v1/cutoffVoltageProduction": 15,
        "https://vc-context.elia.be/2022/v1/gridConnectionCapability": "1P2W",
        "https://vc-context.elia.be/2022/v1/marginalProductionCosts": 5,
        "https://vc-context.elia.be/2022/v1/maximumCurrentProduction": 20,
        "https://vc-context.elia.be/2022/v1/maximumPowerProduction": 40,
        "https://vc-context.elia.be/2022/v1/maximumVoltageProduction": 20,
        "https://vc-context.elia.be/2022/v1/nominalCurrentProduction": 10,
        "https://vc-context.elia.be/2022/v1/nominalPowerProduction": 40,
        "https://vc-context.elia.be/2022/v1/nominalVoltageProduction": 10,
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