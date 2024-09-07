#!/usr/bin/env node

/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const nodemon = require('nodemon');
const path = require('path');

const rootDir = path.resolve(__dirname, '../');

nodemon({
  restartable: 'rs',
  script: path.resolve(rootDir, 'server.js'),
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
  watch: ['../'],
  ext: 'js,yaml',
});
