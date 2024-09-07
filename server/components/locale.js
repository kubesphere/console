/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const locales = require('koa-locales');

const { root, getServerConfig } = require('../libs/utils');

const clientConfig = getServerConfig().client;

module.exports = function (app) {
  locales(app, {
    functionName: 't',
    defaultLocale: clientConfig.defaultLang || 'en',
    queryField: 'lang',
    cookieField: 'lang',
    localeAlias: {
      'zh-cn': 'zh',
      'zh-tw': 'tc',
      'en-uk': 'en',
      'en-us': 'en',
    },
    dirs: [root('locales')],
  });
};
