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

# Notes

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
