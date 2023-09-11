import { Options, compact } from 'jsonld'
import credential from './device-info-credential.json'
import dataDisplay from './device-info-data-display.json'
import schema from './device-info-schema.json'
import { issueAndVerify } from '../../../test/issue-and-verify'
import { digitalBazaarDocumentLoader, transmuteDocumentLoader } from '../neo-document-loader'
import { verifyDataDisplayStructure } from '../../../test/verify-data-display-structure'
import { verifyCredentialSubjectSchema } from '../../../test/verify-credential-subject-schema'

describe("Device Info", () => {
  test("Credential should match JSON Schema", async () => {
    verifyCredentialSubjectSchema(schema, credential)
  })

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
        "https://vc-context.elia.be/2022/v1/DeviceInfoCredential",
      ],
      "https://www.w3.org/2018/credentials#credentialSubject": {
        "@id": "deviceIdScheme:123",
        "@type": "https://vc-context.elia.be/2022/v1/Device",
        "https://saref.etsi.org/saref4ener/brandName": "Device Manufacturer Inc",
        "https://saref.etsi.org/saref4ener/deviceCode": "device 123",
        "https://saref.etsi.org/saref4ener/deviceName": "Washing Machine 3000",
        "https://saref.etsi.org/saref4ener/hardwareRevision": "revision1",
        "https://saref.etsi.org/saref4ener/manufacturerDescription": "A next-gen washing machine",
        "https://saref.etsi.org/saref4ener/manufacturerLabel": "WM-3000",
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

  test("Data display conforms to JSON schema", async () => {
    verifyDataDisplayStructure(dataDisplay)
  })
})