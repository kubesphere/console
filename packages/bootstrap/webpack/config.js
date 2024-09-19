/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const path = require('path');

const KUBESPHERE_EDITION = 'ks';

const resolve = absolutePath => path.resolve(process.cwd(), absolutePath);

const rootDir = path.resolve(__dirname, '../');
const absResolve = absolutePath => path.resolve(rootDir, absolutePath);

const config = {
  siteTitle: 'KubeSphere Console',
  assetsPublicPath: '/',
  assetsRoot: resolve('dist'),
  distPath: resolve('dist'),
  distAssetsPath: resolve('dist/assets/'),
  assetsPath: absResolve('assets'),
  webIndex: absResolve('entries/index.ts'),
  terminalIndex: absResolve('entries/terminal.ts'),
  resolve,
  absResolve,
  scope: '@ks-console',
};

const systemImports = {
  '@ks-console/shared': 'core:@kubed/@ks-console/shared',
  '@kubed/charts': 'core:@kubed/charts',
  '@kubed/code-editor': 'core:@kubed/code-editor',
  '@kubed/components': 'core:@kubed/components',
  // '@kubed/diff-viewer': 'core:@kubed/diff-viewer',
  '@kubed/hooks': 'core:@kubed/hooks',
  '@kubed/icons': 'core:@kubed/icons',
  // '@kubed/log-viewer': 'core:@kubed/log-viewer',
  // dayjs: 'core:dayjs',
  // lodash: 'core:lodash',
  react: 'core:react',
  'react-dom': 'core:react-dom',
  // 'react-markdown': 'core:react-markdown',
  'react-query': 'core:react-query',
  'react-router-dom': 'core:react-router-dom',
  'styled-components': 'core:styled-components',
  'wujie-react': 'core:wujie-react',
};

const locales = ['ar', 'en', 'es', 'fr', 'hi', 'ko', 'lt', 'pl', 'tc', 'tr', 'zh'];

module.exports = { config, systemImports, locales, KUBESPHERE_EDITION };
