import { Options, compact } from "jsonld"
import credential from "./device-info-credential.json"
// import dataDisplay from "./device-info-data-display.json"
import schema from "./schemas/device-schema.json"
import { issueAndVerify } from "../../../test/issue-and-verify"
import {
  digitalBazaarDocumentLoader,
  transmuteDocumentLoader,
} from "../../2022-neo/neo-document-loader"
// import { verifyDataDisplayStructure } from "../../../test/verify-data-display-structure"
import { verifyCredentialSubjectSchema2020 } from "../../../test/verify-credential-subject-schema-2020"

describe("Device-Info", () => {
  test("Credential should match JSON Schema", async () => {
    verifyCredentialSubjectSchema2020(schema, credential)
  })

  test("Credential can be issued and verified", async () => {
    await issueAndVerify(credential, transmuteDocumentLoader)
  })

  test("Compacted credential is as expected", async () => {
    const options: Options.Compact = {
      documentLoader: digitalBazaarDocumentLoader,
    }
    const compacted = await compact(credential, {}, options)
    const expected = {
      "@id": "<some URI, e.g. https://example.com/credential/1>",
      "@type": [
        "https://www.w3.org/2018/credentials#VerifiableCredential",
        "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/credentials/2023-nest-project/DeviceInfoCredential",
      ],
      "https://www.w3.org/2018/credentials#credentialSubject": {
        "@id": "deviceIdScheme:123",
        "@type":
          "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/Device",
        "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/infoEndpoint":
          "https://api.manufacturer.com/v1/device-info-endpoint/deviceIdScheme:123",
        "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/infoEndpointStandard":
          "http://endpoint-standard.com/treeshapediscoveryLD",
        "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/userConsentCapability":
          "https://capability.api.manufacturer.com/v1/did/deviceIdScheme:123",
        "https://saref.etsi.org/saref4ener/brandName": "Car Manufacturer Inc",
        "https://saref.etsi.org/saref4ener/deviceCode": "Car 123",
        "https://saref.etsi.org/saref4ener/deviceName": "Car 3000",
        "https://saref.etsi.org/saref4ener/hardwareRevision": "revision1",
        "https://saref.etsi.org/saref4ener/manufacturerDescription":
          "A next-gen car",
        "https://saref.etsi.org/saref4ener/manufacturerLabel": "WM-3000",
      },
      "https://www.w3.org/2018/credentials#issuanceDate": {
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        "@value": "2023-05-14T12:55:30Z",
      },
      "https://www.w3.org/2018/credentials#issuer": {
        "@id": "did:example:dso",
      },
    }
    expect(compacted).toEqual(expected)
  })

  // test("Data display conforms to JSON schema", async () => {
  //   verifyDataDisplayStructure(dataDisplay)
  // })
})
