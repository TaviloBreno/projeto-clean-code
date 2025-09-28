module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/server.ts',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**',
    '!**/test/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  clearMocks: true,
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}