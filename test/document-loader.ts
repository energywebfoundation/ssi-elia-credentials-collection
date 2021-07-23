import {
  documentLoaderFactory,
  contexts,
} from '@transmute/jsonld-document-loader'
import eliaContext from '../src/elia-context.json'
import didDoc from './fixtures/didDocument.json'
import secp256k12019ContextDoc from './fixtures/contexts/secp256k1-2019-v1.json'
import schemaContextDoc from './fixtures/contexts/schema.json'
import { IContextMap } from '@transmute/jsonld-document-loader/dist/types'

const additionalContexts: IContextMap = {
  "https://vc-context.elia.be/2021/v1/": eliaContext,
  'https://ns.did.ai/suites/secp256k1-2019/v1': secp256k12019ContextDoc,
  'http://schema.org': schemaContextDoc
}

export const documentLoader = documentLoaderFactory.pluginFactory
  .build({
    contexts: {
      ...contexts.W3C_Verifiable_Credentials,
      ...contexts.W3ID_Security_Vocabulary,
      ...contexts.W3C_Decentralized_Identifiers,
      ...additionalContexts
    },
  })
  .addResolver({
    ['did:example:signer']: {
      resolve: () => {
        return Promise.resolve(didDoc)
      },
    },
  })