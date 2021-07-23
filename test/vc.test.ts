import * as vcjs from '@transmute/vc.js';
import { EcdsaSecp256k1VerificationKey2019 } from '@bloomprotocol/ecdsa-secp256k1-verification-key-2019';
import { EcdsaSecp256k1Signature2019 } from '@bloomprotocol/ecdsa-secp256k1-signature-2019';
//import { documentLoader } from './document-loader';
import { documentLoader } from '../test/bloomDocumentLoader';
import humanIdentityCred from '../src/vc-schemas/HumanIdentityCredential.json';
import linkCompanyToHumanCredential from '../src/vc-schemas/LinkCompanyToHuman.json';
import companyIdentityCredential from '../src/vc-schemas/CompanyIdentityCredential.json';
import timeSeriesCredential from '../src/vc-schemas/TimeSeriesCredential.json';
import assetIDCredential from '../src/vc-schemas/AssetIDCredential.json';
import assetSpecCredential from '../src/vc-schemas/AssetSpecCredential.json';
import termsAndConditionsCredential from '../src/vc-schemas/TermsAndConditionsCredential.json';
import basicCred from '../src/vc-schemas/BasicCred.json';
import keyPair from './fixtures/keyPair.json';


xdescribe("Issuance and verification tests", () => {
  async function issueAndVerify(credential: object) {
    const vc = await vcjs.ld.createVerifiableCredential({
      credential,
      documentLoader,
      suite: new EcdsaSecp256k1Signature2019({
        key: EcdsaSecp256k1VerificationKey2019.from(keyPair.private),
      }),
    });
    // console.log(vc)
    expect(vc.proof).toBeDefined();
    // TODO: expect that proof signer matches issuer of vc
    // TODO: test disabling @vocab to catch missing properties from context (schema.org has vocab)
    const result = await vcjs.ld.verifyVerifiableCredential({
      credential: vc,
      documentLoader,
      suite: new EcdsaSecp256k1Signature2019()
    })
    // console.log(JSON.stringify(result))
    expect(result.verified).toBeTruthy();
  }

  test("BasicCred", async () => {
    await issueAndVerify(basicCred);
  });

  test("HumanIdentityCredential", async () => {
    await issueAndVerify(humanIdentityCred);
  });

  test("LinkCompanyToHumanCredential", async () => {
    await issueAndVerify(linkCompanyToHumanCredential);
  });

  test("CompanyIdentityCredential", async () => {
    await issueAndVerify(companyIdentityCredential);
  });

  test("TimeSeriesCredential", async () => {
    await issueAndVerify(timeSeriesCredential);
  });

  test("AssetIDCredential", async () => {
    await issueAndVerify(assetIDCredential);
  });

  test("AssetSpecCredential", async () => {
    await issueAndVerify(assetSpecCredential);
  });

  test("TermsAndConditionsCredential", async () => {
    await issueAndVerify(termsAndConditionsCredential);
  });
});
