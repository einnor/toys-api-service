module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    "ts-jest.tsConfig": "tsconfig.json"
  },
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  testMatch: [
    "**/tests/**/*.(spec|test).(ts|js)"
  ],
  testEnvironment: "node",
  transformIgnorePatterns: [
    "/node_modules/"
  ],
};
