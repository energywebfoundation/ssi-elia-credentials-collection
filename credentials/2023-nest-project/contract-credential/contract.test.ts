import { Options, compact } from "jsonld"
import credential from "./contract-credential.json"
// import dataDisplay from "./device-info-data-display.json"
import schema from "./schemas/contract-schema.json"
import { issueAndVerify } from "../../../test/issue-and-verify"
import {
  digitalBazaarDocumentLoader,
  transmuteDocumentLoader,
} from "../../2022-neo/neo-document-loader"
// import { verifyDataDisplayStructure } from "../../../test/verify-data-display-structure"
import { verifyCredentialSubjectSchema } from "../../../test/verify-credential-subject-schema"

describe("Contract", () => {
  test("Credential should match JSON Schema", async () => {
    verifyCredentialSubjectSchema(schema, credential)
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
        "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/credentials/2023-nest-project/Contract-Credential",
      ],
      "https://www.w3.org/2018/credentials#credentialSubject": {
        "@id": "contractIdScheme:456",
        "@type": "Contract",
        "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/applicationLaw":
          "Belgium laws",
        "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/compensationOfTheOffer":
          "0",
        "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/contractedItem":
          {
            "@id": "deviceIdScheme:123",
            "@type":
              "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/credentials/2023-nest-project/Device",
          },
        "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/expressionOfTheOffer":
          "Lorem ipsum, ...",
        "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/jurisdiction":
          "Courts of Bruxelles",
        "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/party1":
          {
            "@type": "https://schema.org/Organization",
            "https://schema.org/address":
              "Boulevard de l'Empereur, 1000 Bruxelles",
            "https://schema.org/brand": "Car Manufacturer Inc",
            "https://schema.org/iso6523Code": "123456789",
          },
        "https://github.com/energywebfoundation/elia-energyblocks-vcs/tree/master/ontology/v1/party2":
          {
            "@type": "https://schema.org/Person",
            "https://schema.org/address":
              "Boulevard de l'Empereur, 1000 Bruxelles",
            "https://schema.org/familyName": "Doe",
            "https://schema.org/givenName": "John",
          },
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
