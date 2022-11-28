import * as jsonld from 'jsonld'
import { digitalBazaarDocumentLoader } from './neo-document-loader'
import deviceInfoCredential from './device-info/device-info-credential.json'
import consumptionCredential from './consumption/consumption-credential.json'

describe("Compose Device", () => {

  test("Combine device-info and power  credentials", async () => {
    const options: jsonld.Options.Compact = {
      documentLoader: digitalBazaarDocumentLoader
    }
    const expandedDeviceInfo = await jsonld.compact(deviceInfoCredential, {}, options)
    const expandedConsumption = await jsonld.compact(consumptionCredential, {}, options)
    const doc = {
      "@context": {
      },
      "@graph": [
        expandedDeviceInfo,
        expandedConsumption
      ]
    }
    const frameObject = {
      "@id": "deviceIdScheme:123",
    }
    const framed = await jsonld.frame(doc, frameObject)
    const expected = {
      "@id": "deviceIdScheme:123",
      "@type": [
        "https://saref.etsi.org/saref4ener/Device",
        "https://vc-context.elia.be/2022/v1/PowerConsumingDevice",
      ],
      "https://saref.etsi.org/saref4ener/brandName": "Device Manufacturer Inc",
      "https://saref.etsi.org/saref4ener/deviceCode": "device 123",
      "https://saref.etsi.org/saref4ener/deviceName": "Washing Machine 3000",
      "https://saref.etsi.org/saref4ener/hardwareRevision": "revision1",
      "https://saref.etsi.org/saref4ener/manufacturerDescription": "A next-gen washing machine",
      "https://saref.etsi.org/saref4ener/manufacturerLabel": "WM-3000",
      "https://saref.etsi.org/saref4ener/powerSource": "mains3Phase",
      "https://vc-context.elia.be/2022/v1/cosPhi": 0.9,
      "https://vc-context.elia.be/2022/v1/cutoffFrequencyConsumption": 15,
      "https://vc-context.elia.be/2022/v1/marginalConsumptionCosts": 5,
      "https://vc-context.elia.be/2022/v1/maximumCurrentConsumption": 20,
      "https://vc-context.elia.be/2022/v1/maximumPowerConsumption": 40,
      "https://vc-context.elia.be/2022/v1/maximumVoltageConsumption": 20,
      "https://vc-context.elia.be/2022/v1/nominalCurrentConsumption": 10,
      "https://vc-context.elia.be/2022/v1/nominalPowerConsumption": 40,
      "https://vc-context.elia.be/2022/v1/nominalVoltageConsumption": 10,
    }
    expect(expected).toMatchObject(framed)
  })
})
