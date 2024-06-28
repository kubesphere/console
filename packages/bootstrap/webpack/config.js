const path = require('path');

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
  react: 'core:react',
  'react-dom': 'core:react-dom',
  'react-router-dom': 'core:react-router-dom',
  'styled-components': 'core:styled-components',
  lodash: 'core:lodash',
  'react-query': 'core:react-query',
  'react-markdown': 'core:react-markdown',
  '@kubed/components': 'core:@kubed/components',
  '@kubed/hooks': 'core:@kubed/hooks',
  '@kubed/icons': 'core:@kubed/icons',
  '@kubed/code-editor': 'core:@kubed/code-editor',
  '@kubed/charts': 'core:@kubed/charts',
  '@ks-console/shared': 'core:@kubed/@ks-console/shared',
  'wujie-react': 'core:wujie-react',
  dayjs: 'core:dayjs',
};

const locales = ['ar', 'en', 'es', 'fr', 'hi', 'ko', 'lt', 'pl', 'tc', 'tr', 'zh'];

module.exports = { config, systemImports, locales };
