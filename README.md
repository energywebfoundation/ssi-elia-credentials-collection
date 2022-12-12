# Elia EoEB VCs

Run tests against Elia EoEB example credentials and schemas to confirm their correctness.

# Usage

### install

```
npm i
```

### run tests

```
npm test
```

# Types of files

## Linked Data Context

[Linked Data context](https://www.w3.org/TR/json-ld/#the-context) maps terms to IRIs.
This allows JSON-LD documents to be written in more concise, readable manner, without sacrificing accuracy.

The specification for JSON-LD is [here]()

The VC Implementation Guide also has [instructions on how to create new contexts](https://www.w3.org/TR/vc-imp-guide/#creating-new-credential-types) for verifiable credentials

JSON-LD playground can be helpful to test JSON-LD contexts.

## JSON Schema

JSON Schema can be used to describe the precise shape required by the a credential.

The schema of a credential can optionally be linked using the [credentialSchema property](https://www.w3.org/TR/vc-data-model/#data-schemas).
The JsonSchemaValidator2018 `credentialSchema` `type` is defined in the [Verifiable Credentials Vocabulary](w3.org/2018/credentials/#JsonSchemaValidator2018)

## Data Display

The [Wallet Rendering](https://identity.foundation/wallet-rendering/) specification describes how a credential can be displayed.

# Notes

## Linked Data Vocabulary/Ontologies

While the linked data context provides precision for terms (by ensuring that they are IRIs),
Linked Data can also be used to provide further information about the semantics of a term.

For example, the [RDF Schema comment](https://www.w3.org/TR/rdf-schema/#ch_comment) property can be used to provide further description of a resource.

## VC and Signature Library

Transmute VC.js is used (rather than Bloom VC or Digital Bazaar vc.js for example) as it supports typescript and both LD and JWT VCs.
Secp256k1 key is used as this key type could be used to transact on Ethereum based chains such as Energy Web Chain. Therefore, Bloom Secp256k1 signature suite is used.
Further more, use of Transmute and Bloom libraries together demonstrates interoperability.

## Document Loader

Using the Bloom document loader as it is simple and easy to understand.
However, the [DIF document loader](https://github.com/decentralized-identity/jsonld-document-loader) may be better if a more type-safe and encapsulated loader is preferred.

## Patch-package

Patch package used to work through a couple issues in the packages:

1. "alphabet" somehow not being found in base58-universal
2. remove uintInt8Array validation in secp256k1 as not behaving correctly
