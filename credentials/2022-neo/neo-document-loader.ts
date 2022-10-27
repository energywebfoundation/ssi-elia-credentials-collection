import didDoc from '../../test/fixtures/didDocument.json'
import neoContext from './elia-neo-context.json'
import consumptionAssessmentContext from './consumption-assessment/consumption-assessment-context.json'
import { JsonLd, RemoteDocument } from 'jsonld/jsonld-spec'
import { baseContextMap } from '../../test/document-loader'

const contextMap = Object.assign({
    'https://vc-context.elia.be/2022/v1': neoContext,
    'https://vc-context.elia.be/2022/v1/consumption-assessment': consumptionAssessmentContext
} , baseContextMap)

const didDocMap: { [url: string]: JsonLd } = {
    'did:example:signer': didDoc,
}

/**
 * A document loader usable by the Transmute libraries 
 */
export const transmuteDocumentLoader = (url: string): Promise<RemoteDocument> => {
    const withoutFragment = url.split('#')[0]
    const document: JsonLd = (withoutFragment.startsWith('did:') ? didDocMap : contextMap)[withoutFragment] || null

    if (document === null) console.log({ url, withoutFragment })

    return Promise.resolve({
        document,
        documentUrl: url,
    })
}

/**
 * A document loader usable by the Digital Bazaar libraries 
 */
export const digitalBazaarDocumentLoader = (url: string, callback: (err: Error, remoteDoc: RemoteDocument) => void): Promise<RemoteDocument> => {
    return transmuteDocumentLoader(url)
}