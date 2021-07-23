import { frame } from 'jsonld'


describe("Dereferencing demonstration", () => {

  /**
   * Shows how if how information about an "@id" spread across docs can be consolidated using framing
   */
  test("Frame multiple docs into one", async () => {
    const doc = {
      "@context": {
        "@vocab": "http://example.com/"
      },
      "@graph": [
        {
          "@id": "example:1",
          "prop1": "value1"
        },
        {
          "@id": "example:1",
          "prop2": 2
        }
      ]
    }
    const frameObject = {
      "@id": "example:1"
    }
    const framed = await frame(doc, frameObject)
    const expected = {
      "@id": "example:1",
      "http://example.com/prop1": "value1",
      "http://example.com/prop2": 2
    }
    expect(expected).toMatchObject(framed)
  })

  /**
   * Shows how if had some reference that you could dereference to a doc then can collapse value using "@nest" feature
   */
  test("Collapse using @nest", async () => {
    const doc = {
      "@context": {
        "@vocab": "http://example.com/",
        "reference": "@nest"
      },
      "@graph": [
        {
          "@id": "example:1",
          "reference": "http://someinfo"
        }
      ]
    }

    // Dereference the reference
    const graph = doc['@graph'] as { reference: unknown }[]
    for (const node of graph) {
      if (node.reference) {
        node.reference = {
          "anotherProp": 2
        }
      }
    }

    const frameObject = {
      "@id": "example:1"
    }
    const framed = await frame(doc, frameObject)
    const expected = {
      "@id": "example:1",
      "http://example.com/prop1": "value1",
      "http://example.com/anotherProp": 2
    }
    expect(expected).toMatchObject(framed)
  })

  /**
   * Shows how if some referenced "@id" can be included in a framed document
   */
  test("Collapse using @nest", async () => {
    const doc = {
      "@context": {
        "@vocab": "http://example.com/"
      },
      "@graph": [
        {
          "@id": "example:car",
          "VIN": "5YJ3E1EAXHF000316",
          "model": { "@id": "example:model3" }
        },
        {
          "@id": "example:model3",
          "capacity": "82"
        }
      ]
    }

    const frameObject = {
      "@id": "example:car"
    }
    const framed = await frame(doc, frameObject)
    const expected = {
      "@id": "example:car",
      "http://example.com/VIN": "5YJ3E1EAXHF000316",
      "http://example.com/model": {
        "@id": "example:model3",
        "http://example.com/capacity": "82"
      }
    }
    expect(expected).toMatchObject(framed)
  })
})
