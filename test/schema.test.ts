import Ajv, { Schema } from "ajv"
import addFormats from "ajv-formats"
import assetIDSchema from '../src/schema-def/AssetIDSchema.json';
import assetIDCredential from '../src/vc-schemas/AssetIDCredential.json';
import assetSpecSchema from '../src/schema-def/AssetSpecSchema.json';
import assetSpecCredential from '../src/vc-schemas/AssetSpecCredential.json';
import humanIdentitySchema from '../src/schema-def/HumanIdentitySchema.json';
import humanIdentityCredential from '../src/vc-schemas/HumanIdentityCredential.json';
import companyIdentitySchema from '../src/schema-def/CompanyIdentitySchema.json';
import companyIdentityCredential from '../src/vc-schemas/CompanyIdentityCredential.json';
import timeSeriesSchema from '../src/schema-def/TimeSeriesSchema.json';

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
  });

  test("AssetSpec", async () => {
    verifyCredentialSubjectSchema(assetSpecSchema, assetSpecCredential)
  });

  test("CompanyIdentity", async () => {
    verifyCredentialSubjectSchema(companyIdentitySchema, companyIdentityCredential)
  });

  test("HumanIdentity", async () => {
    verifyCredentialSubjectSchema(humanIdentitySchema, humanIdentityCredential)
  });

  const timeSeriesData = {
    "id": "did:ela:hijashfbcnjzs",
    "reading": {
      "timeStart": "2021-05-14T12:40:00Z",
      "timeEnd": "2021-05-14T12:55:00Z",
      "energy": 3500
    }
  }


  test("TineSeries", async () => {
    var validate = ajv.compile(timeSeriesSchema)
    var valid = validate(timeSeriesData)
    if (!valid) console.log(validate.errors)
  });
});