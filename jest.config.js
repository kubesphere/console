const fs = require('fs');
const yaml = require('js-yaml');

const config = yaml.safeLoad(fs.readFileSync('./server/config.yaml', 'utf8'));

module.exports = {
  bail: true,
  transformIgnorePatterns: [
    // Change MODULE_NAME_HERE to your module that isn't being compiled
    '/node_modules/.+\\.js$',
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '\\.svg': '<rootDir>/jest/svgMock.js',
    '^common(.*)$': '<rootDir>/common$1',
    '^src(.*)$': '<rootDir>/src$1',
    '^scss(.*)$': '<rootDir>/src/scss$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^layouts(.*)$': '<rootDir>/src/layouts$1',
    '^stores(.*)$': '<rootDir>/src/stores$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^configs(.*)$': '<rootDir>/src/configs$1',
  },
  globals: {
    globals: {
      config: config.client,
    },
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'cypress'],
  setupFiles: ['<rootDir>/jest/setupTests.js'],
  setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],
};
