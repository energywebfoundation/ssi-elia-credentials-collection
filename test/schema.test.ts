import Ajv, { Schema } from "ajv"
import addFormats from "ajv-formats"
import assetIDSchema from '../src/schema-def/AssetIDSchema.json';
import assetIDCredential from '../src/vc-schemas/AssetIDCredential.json';
import assetSpecSchema from '../src/schema-def/AssetSpecSchema.json';
import assetSpecCredential from '../src/vc-schemas/AssetSpecCredential.json';
import humanIdentitySchema from '../src/schema-def/HumanIdentitySchema.json';
import companyIdentitySchema from '../src/schema-def/CompanyIdentitySchema.json';
import timeSeriesSchema from '../src/schema-def/TimeSeriesSchema.json';
import basicSchema from '../src/schema-def/BasicSchema.json';

const ajv = new Ajv()
addFormats(ajv)

const verifyCredentialSubjectSchema = (schema: Schema, credential: { credentialSubject: object }) => {
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

  const basicData = {
    "id": "abc:xyz:fdsjhkjkjhkjh"
  }

  
  test("BasicSchema", async () => {
    var validate = ajv.compile(basicSchema)
    var valid = validate(basicData)
    if (!valid) console.log(validate.errors)
  });

  const companyIdentityData = {
    "id": "did:example:corporation",
    "type": "Corporation",
    "legalName": "Elia Transmission Belgium",
    "companyID": "0731.852.231",
    "address": "1234 Apple Street",
    "foundingDate": "1980-04-12",
    "siegeSocialAddress": "1234 Apple Street"
  }

  
  test("CompanyIdenty", async () => {
    var validate = ajv.compile(companyIdentitySchema)
    var valid = validate(companyIdentityData)
    if (!valid) console.log("validate.errors")
  });

  const humanIdentityData = {
    "id": "did:example:person",
    "type": "Person",
    "givenName": "Thierry",
    "familyName": "Dupont",
    "address": "1234 Apple Street",
    "birthDate": "1980-04-12",
    "nationalNumber": "12120112485"
  }

  
  test("HumanIdentity", async () => {
    var validate = ajv.compile(humanIdentitySchema)
    var valid = validate(humanIdentityData)
    if (!valid) console.log(validate.errors)
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