import Ajv from "ajv"
import humanIdentitySchema from '../src/schema-def/HumanIdentitySchema.json';
import companyIdentitySchema from '../src/schema-def/CompanyIdentitySchema.json';
import timeSeriesSchema from '../src/schema-def/TimeSeriesSchema.json';
import assetIDSchema from '../src/schema-def/AssetIDSchema.json';
import assetSpecSchema from '../src/schema-def/AssetSpecSchema.json';
import basicSchema from '../src/schema-def/BasicSchema.json';

const ajv = new Ajv()


beforeAll(async () => {
});

describe("Issuance and verification tests", () => {
  const assetIdData = {
    "id": "did:example:asset",
    "assetID": "541453800000001269",
    "address": "1234 Apple Street",
    "meteringLink": {
      "id": "abc/xyz/couldbeanything"
    },
    "specVC": {
      "id": "https://elia.be/credential/2"
    }
  }

  
  test("AsseID", async () => {
    var validate = ajv.compile(assetIDSchema)
    var valid = validate(assetIdData)
    if (!valid) console.log(validate.errors)
  });

  const assetSpecData = {
    "id": "did:example:asset",
    "assetID": "541453800000001269",
    "creationDate": 5000,
    "meteringLink": {
      "id": "<meteringLink URI>"
    },
    "generalVC": {
      "id": "https://elia.be/credential/2"
    },
    "meteringTimeFrame": 2000,
    "meteringUnit": "watts",
    "meteringPrecision": 0.001
  }

  
  test("AssetSpec", async () => {
    var validate = ajv.compile(assetSpecSchema)
    var valid = validate(assetSpecData)
    if (!valid) console.log(validate.errors)
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