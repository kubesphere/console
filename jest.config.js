/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

const fs = require('fs')
const yaml = require('js-yaml')

const config = yaml.safeLoad(fs.readFileSync('./server/config.yaml', 'utf8'))

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
}
