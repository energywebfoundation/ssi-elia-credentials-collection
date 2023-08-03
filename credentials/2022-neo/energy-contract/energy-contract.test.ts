import { Options, compact } from 'jsonld'
import credential from './energy-contract-credential.json'
import { issueAndVerify } from '../../../test/issue-and-verify'
import { digitalBazaarDocumentLoader, transmuteDocumentLoader } from '../neo-document-loader'

describe("Energy Contract", () => {

  test("Credential can be issued and verified", async () => {
    await issueAndVerify(credential, transmuteDocumentLoader)
  })

  test("Compacted credential is as expected", async () => {
    const options: Options.Compact = {
      documentLoader: digitalBazaarDocumentLoader
    }
    const compacted = await compact(credential, {}, options)
    console.log(compacted);
    const expected = {
      "@id": "<some URI, e.g. https://elia.be/credential/1>",
      "@type": [
        "https://www.w3.org/2018/credentials#VerifiableCredential",
        "https://vc-context.elia.be/2022/v1/EnergyContractCredential",
      ],
      "https://www.w3.org/2018/credentials#credentialSubject": {
        "@id": "energyContract:123",
        "@type": "https://vc-context.elia.be/2022/v1/EnergyContract",
        "https://vc-context.elia.be/2022/v1/clientAddress": "Private straat, 1 1000 Brussel",
        "https://vc-context.elia.be/2022/v1/clientName": "Mevrouw Lise Vananonymous",
        "https://vc-context.elia.be/2022/v1/dso": "(Fluvius Limburg)",
        "https://vc-context.elia.be/2022/v1/ean": "Elektriciteit (EAN 541400000000000000) Gas (EAN 541400000000000000)",
        "https://vc-context.elia.be/2022/v1/supplier": "luminus",
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