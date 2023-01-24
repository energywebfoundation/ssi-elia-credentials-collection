import didDoc from '../../test/fixtures/didDocument.json'
import consumptionContext from './consumption/consumption-context.json'
import deviceInfoContext from './device-info/device-info-context.json'
import deviceLocationContext from './device-location/device-location-context.json'
import energyLocationContext from './energy-location/energy-location-context.json'
import energyStorageContext from './energy-storage/energy-storage-context.json'
import energyStorageContextVocab from './energy-storage/energy-storage-context-vocab.json'
import meteringDeviceContext from './metering-device/metering-device-context.json'
import productionContext from './production/production-context.json'
import steeringListContext from './steering-list/steering-list-context.json'
import { JsonLd, RemoteDocument } from 'jsonld/jsonld-spec'
import { baseContextMap } from '../../test/document-loader'

const contextMap = Object.assign({
    'https://vc-context.elia.be/2022/v1/consumption': consumptionContext,
    'https://vc-context.elia.be/2022/v1/device-info': deviceInfoContext,
    'https://vc-context.elia.be/2022/v1/device-location': deviceLocationContext,
    'https://vc-context.elia.be/2022/v1/energy-location': energyLocationContext,
    'https://vc-context.elia.be/2022/v1/energy-storage': energyStorageContext,
    'https://vc-context.elia.be/2022/v1/energy-storage-vocab': energyStorageContextVocab,
    'https://vc-context.elia.be/2022/v1/metering-device': meteringDeviceContext,
    'https://vc-context.elia.be/2022/v1/production': productionContext,
    'https://vc-context.elia.be/2022/v1/steering-list': steeringListContext,
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