import eliaContext from '../credentials/2021-07-exchange-of-enegy-blocks/elia-context.json'
import didDoc from './fixtures/didDocument.json'
import credentialsContextDoc from './fixtures/contexts/credentials-v1.json'
import didContextDoc from './fixtures/contexts/did-v0.11.json'
import secp256k12019ContextDoc from './fixtures/contexts/secp256k1-2019-v1.json'
import schemaContextDoc from './fixtures/contexts/schema.json'
import { JsonLd, RemoteDocument } from 'jsonld/jsonld-spec'

export const baseContextMap: { [url: string]: JsonLd } = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    'https://www.w3.org/2018/credentials/v1': credentialsContextDoc,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    'https://w3id.org/did/v0.11': didContextDoc,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    'https://ns.did.ai/suites/secp256k1-2019/v1': secp256k12019ContextDoc,
    'http://schema.org': schemaContextDoc,
    'https://vc-context.elia.be/2021/v1': eliaContext,
}

const didDocMap: { [url: string]: JsonLd } = {
    'did:example:signer': didDoc,
}

/**
 * A document loader usable by the Transmute libraries 
 */
 export const documentLoader = (url: string): Promise<RemoteDocument> => {
    const withoutFragment = url.split('#')[0]
    const document: JsonLd = (withoutFragment.startsWith('did:') ? didDocMap : baseContextMap)[withoutFragment] || null

    if (document === null) console.log({ url, withoutFragment })

    return Promise.resolve({
        document,
        documentUrl: url,
    })
}
