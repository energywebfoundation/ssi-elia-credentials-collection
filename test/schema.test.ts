import Ajv, { Schema } from "ajv"
import addFormats from "ajv-formats"
import assetIDSchema from '../src/json-schemas/AssetIDSchema.json'
import assetIDCredential from '../src/credentials/AssetIDCredential.json'
import assetSpecSchema from '../src/json-schemas/AssetSpecSchema.json'
import assetSpecCredential from '../src/credentials/AssetSpecCredential.json'
import humanIdentitySchema from '../src/json-schemas/HumanIdentitySchema.json'
import humanIdentityCredential from '../src/credentials/HumanIdentityCredential.json'
import companyIdentitySchema from '../src/json-schemas/CompanyIdentitySchema.json'
import companyIdentityCredential from '../src/credentials/CompanyIdentityCredential.json'
import timeSeriesSchema from '../src/json-schemas/TimeSeriesSchema.json'
import timeSeriesCredential from '../src/credentials/TimeSeriesCredential.json'

const ajv = new Ajv()
addFormats(ajv)

const verifyCredentialSubjectSchema = (schema: Schema, credential: { credentialSubject: Record<string, unknown> }) => {
  const validate = ajv.compile(schema)
  const valid = validate(credential.credentialSubject)
  expect(valid).toBeTruthy()
}

describe("Issuance and verification tests", () => {

  test("AssetID Schema", async () => {
    verifyCredentialSubjectSchema(assetIDSchema, assetIDCredential)
  })

  test("AssetSpec", async () => {
    verifyCredentialSubjectSchema(assetSpecSchema, assetSpecCredential)
  })

  test("CompanyIdentity", async () => {
    verifyCredentialSubjectSchema(companyIdentitySchema, companyIdentityCredential)
  })

  test("HumanIdentity", async () => {
    verifyCredentialSubjectSchema(humanIdentitySchema, humanIdentityCredential)
  })

  test("TimeSeries", async () => {
    verifyCredentialSubjectSchema(timeSeriesSchema, timeSeriesCredential)
  })
})