import eliaContext from '../credentials/2021-07-exchange-of-enegy-blocks/elia-context.json'
import didDoc from './fixtures/didDocument.json'
import credentialsContextDoc from './fixtures/contexts/credentials-v1.json'
import didContextDoc from './fixtures/contexts/did-v0.11.json'
import secp256k12019ContextDoc from './fixtures/contexts/secp256k1-2019-v1.json'
import schemaContextDoc from './fixtures/contexts/schema.json'

const contextMap: { [url: string]: Record<string, unknown> } = {
    'https://www.w3.org/2018/credentials/v1': credentialsContextDoc,
    'https://w3id.org/did/v0.11': didContextDoc,
    'https://ns.did.ai/suites/secp256k1-2019/v1': secp256k12019ContextDoc,
    'http://schema.org': schemaContextDoc,
    'https://vc-context.elia.be/2021/v1': eliaContext
}

const didDocMap: { [url: string]: Record<string, unknown> } = {
    'did:example:signer': didDoc,
}

export const documentLoader = (url: string): { document: Record<string, unknown>, documentUrl: string } => {
    const withoutFragment = url.split('#')[0]
    const document = (withoutFragment.startsWith('did:') ? didDocMap : contextMap)[withoutFragment] || null

    if (document === null) console.log({ url, withoutFragment })

    return {
        document,
        documentUrl: url,
    }
}