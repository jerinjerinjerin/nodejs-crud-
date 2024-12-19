// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'], // Specify which files to collect coverage from
  coverageReporters: ['text', 'lcov', 'json'], // Specify coverage formats
  coverageThreshold: {
    // (optional) Set minimum coverage thresholds
    global: {
      statements: 80, // Requires at least 80% statement coverage
      branches: 80, // Requires at least 80% branch coverage
      functions: 80, // Requires at least 80% function coverage
      lines: 80, // Requires at least 80% line coverage
    },
  },
};
