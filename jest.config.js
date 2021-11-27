/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverage: true,
  coverageReporters: ['json-summary', 'lcov', 'text-summary'],
  // globals: {
  //   'ts-jest': {
  //     diagnostics: true,
  //   },
  // },
};
