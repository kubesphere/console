/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const MergeJsonPlugin = require('webpack-merge-json-plugin');

const { config, locales } = require('./config');
const baseWebpackConfig = require('./webpack.base.conf');
const { resolve } = config;

const localePatterns = locales.map(locale => {
  return {
    pattern: `./node_modules/@ks-console/locales/dist/${locale}/*.json`,
    to: `./locales/${locale}.[chunkhash:8].json`,
  };
});

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    main: config.webIndex,
  },
  output: {
    path: resolve(config.assetsRoot),
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      // { parser: { system: false } },
      /* {
        resource: config.webIndex,
        use: [
          {
            loader: absResolve('webpack/systemjs-imports-loader.js'),
            options: { importsMap: systemImports },
          },
        ],
      }, */
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/[name].[ext]',
            publicPath: '/',
            esModule: false,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10,
            name: 'assets/fonts/[name].[hash:8].[ext]',
            esModule: false,
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          mangle: true,
          safari10: true,
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          minChunks: 1,
          priority: 1,
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
        },
        styles: {
          name: 'main',
          test: /\/src\/(.*)\.scss$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    chunkIds: 'named',
    concatenateModules: true,
    mergeDuplicateChunks: true,
    removeEmptyChunks: true,
    removeAvailableModules: true,
    providedExports: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      root: resolve('dist'),
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll/**'],
    }),
    new MergeJsonPlugin({
      groups: localePatterns,
    }),
    new WebpackAssetsManifest({
      customize(entry) {
        if (entry.key.indexOf('locales') > -1) {
          const ret = entry.key.match(/locales\/(\S*?)\./);
          if (ret) {
            return { key: `locales-${ret[1]}`, value: entry.value };
          }
        }
      },
      entrypoints: false,
      writeToDisk: true,
      output: resolve('dist/manifest.json'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
    }),
  ],
});

if (process.env.dll === 'true') {
  const commonDllPlugin = new webpack.DllReferencePlugin({
    manifest: resolve('dist/dll/common-manifest.json'),
  });
  webpackConfig.plugins.push(commonDllPlugin);
}

if (process.env.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
