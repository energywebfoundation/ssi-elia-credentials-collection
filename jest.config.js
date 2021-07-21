module.exports = {
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/.+\\.!mjs$"],
  testEnvironment: "jsdom",
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsonld"],
};
