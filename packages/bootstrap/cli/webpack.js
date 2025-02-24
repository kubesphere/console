/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const Webpack = require('webpack');
const wds = require('webpack-dev-server');
const webpackDevConfig = require('../webpack/webpack.dev.conf');
const webpackProdConfig = require('../webpack/webpack.prod.conf');
const webpackDllConfig = require('../webpack/webpack.dll.conf');
const webpackExtensionConfig = require('../webpack/webpack.extension.conf');
const path = require('path');
const fs = require('fs-extra');
const npmCheck = require('npm-checky');
const chalk = require('chalk');
const interactiveUpdate = require('npm-checky/lib/out/interactive-update');

const resolve = dir => path.resolve(process.cwd(), dir);
const alias = {
  '@ks-console/shared': resolve('packages/shared/src'),
  '@ks-console/core': resolve('packages/core/src'),
  '@ks-console/console': resolve('packages/console/src'),
  '@ks-console/appstore': resolve('packages/appstore/src'),
};

async function devServer(setAlias, checkUpgrade) {
  if (checkUpgrade === 'true') {
    // check whether packages need update or not
    const needCheckPackages = [
      '@ks-console/bootstrap',
      '@ks-console/server',
      '@ks-console/shared',
      '@kubed/components',
      '@kubed/hooks',
      '@kubed/icons',
    ];
    const currentState = await npmCheck({
      update: true,
      ignoreDev: true,
      installer: 'yarn',
      useYarnWorkSpace: true,
      installTip: 'Space to select. Enter to start upgrading.',
    });
    const needUpgradePackages = currentState
      .get('packages')
      .filter(pkg => pkg.bump)
      .filter(pkg => needCheckPackages.includes(pkg.moduleName));
    if (needUpgradePackages.length > 0) {
      console.log('It is highly recommended to upgrade the following dependencies:\n');
      await interactiveUpdate(currentState);
    }
  }

  if (setAlias === 'true') {
    webpackDevConfig.resolve.alias = {
      ...webpackDevConfig.resolve.alias,
      ...alias,
    };
  }

  // copy consolev3 files
  const v3distDir = path.resolve(process.cwd(), 'dist/v3dist');
  if (!fs.pathExistsSync(v3distDir)) {
    try {
      fs.ensureDirSync(v3distDir);
      const srcDir = path.resolve(__dirname, '../assets/v3dist');
      fs.copySync(srcDir, v3distDir);
    } catch (e) {
      console.warn(e);
    }
  }

  process.env.NODE_ENV = 'development';
  const compiler = Webpack(webpackDevConfig);
  const devServerOptions = { ...webpackDevConfig.devServer };
  const server = new wds(devServerOptions, compiler);

  server.startCallback(() => {
    console.log(
      chalk.green.bold('Successfully started server on ') +
        chalk.blue.bold.underline('http://localhost:8000'),
    );
  });
}

function runWebpack(config, env = 'production') {
  process.env.NODE_ENV = env || 'production';
  const compiler = Webpack(config);

  compiler.run((err, stats) => {
    if (err) {
      throw err;
    }

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n',
    );

    console.log('  Webpack Finished\n');
  });
}

function buildProd(setAlias) {
  if (setAlias === 'true') {
    webpackProdConfig.resolve.alias = {
      ...webpackProdConfig.resolve.alias,
      ...alias,
    };
  }
  runWebpack(webpackProdConfig);
}

function buildDll(setAlias) {
  const dllAlias = {
    '@ks-console/shared': resolve('packages/shared/src'),
  };
  if (setAlias === 'true') {
    webpackDllConfig.resolve.alias = {
      ...webpackDevConfig.resolve.alias,
      ...dllAlias,
    };
  }
  runWebpack(webpackDllConfig);
}

function buildExtension(extension) {
  const extensionSrcDir = path.resolve(process.cwd(), `extensions/${extension}/src`);
  const entries = fs.readdirSync(extensionSrcDir).filter(function (file) {
    return file.match(/index\.[t,j]sx?$/);
  });
  if (entries.length < 1) {
    console.warn('error: extension entry is empty');
    return;
  }

  webpackExtensionConfig.entry.index = path.resolve(extensionSrcDir, entries[0]);
  webpackExtensionConfig.output.path = path.resolve(process.cwd(), `extensions/${extension}/dist`);
  runWebpack(webpackExtensionConfig);
}

module.exports = {
  devServer,
  buildProd,
  buildDll,
  buildExtension,
};
