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

## TreeLDR

From [TreeLDR documentation](https://www.sprucekit.dev/treeldr/treeldr):
> TreeLDR is a schema definition language that aims at describing both the structure and semantics of the defined schema in a comprehensible way.
> It lies at the intersection between RDF (and its various schema definition ontologies such as OWL) and structure-oriented schema definition frameworks such as JSON Schema or IPLD.

To use TreeLDR:

1. Install as described [here](https://www.sprucekit.dev/treeldr/treeldr-quickstart#installation)

2. Navigate to the `treeldr-demo` directory
```
cd treeldr-demo
```

3. Run the TreeLDR CLI to compile the TreeLDR schema to JSON Schema
```
tldrc -i device-info.tldr json-schema https://vc-context.elia.be/2022/v1/Device
```

4. Run the TreeLDR CLI to compile the TreeLDR schema to JSON-LD
```
tldrc -i device-info.tldr json-ld-context https://vc-context.elia.be/2022/v1/Device
```

### How TreeLDR could be use to define credentials

1. Create a new file for the credential
2. If necessary, define new properties by selecting IRI from an RDF ontology and adding structure schema type (e.g. `string`, `number`, `boolean`, `array`, `object`)
3. Compose the properties into a TreeLDR Type to be used as the `credentialSubject`
4. Compose a new credential type from the `credentialSubject` type and a credentialType (TBD if this is possible, see https://www.sprucekit.dev/treeldr/treeldr-basics/syntax#composite-types) 

Possible CLI steps for credential creation to automate the above steps:
1. Define a TreeLDR type for the credential subject
2. Compile the TreeLDR to to JSON-LD context -> this goes in the `@context` array of the credential 
3. Ask for the IRI of the credential type -> this goes in the credential type array


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
