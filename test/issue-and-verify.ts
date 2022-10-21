import * as vcjs from '@transmute/vc.js'
import { EcdsaSecp256k1VerificationKey2019 } from '@bloomprotocol/ecdsa-secp256k1-verification-key-2019'
import { EcdsaSecp256k1Signature2019 } from '@bloomprotocol/ecdsa-secp256k1-signature-2019'
import keyPair from './fixtures/keyPair.json'

export async function issueAndVerify(credential: Record<string, unknown>, documentLoader: any): Promise<void> {
  const vc = await vcjs.ld.createVerifiableCredential({
    credential,
    documentLoader,
    suite: new EcdsaSecp256k1Signature2019({
      key: EcdsaSecp256k1VerificationKey2019.from(keyPair.private),
    }),
  })
  expect(vc.proof).toBeDefined()
  const result = await vcjs.ld.verifyVerifiableCredential({
    credential: {
      ...vc,
      issuer: { id: keyPair.private.controller }, // make sure issuer is set correctly
    },
    documentLoader,
    suite: new EcdsaSecp256k1Signature2019()
  })
  expect(result.verified).toBeTruthy()
}
