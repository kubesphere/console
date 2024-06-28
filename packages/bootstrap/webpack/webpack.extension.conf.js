const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SystemJSPublicPathWebpackPlugin = require('systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin');
const { merge } = require('webpack-merge');
const { config } = require('./config');
const fs = require('fs-extra');
const resolve = config.resolve;

const configFile = fs.pathExistsSync(resolve('configs/webpack.config.js'));
const configs = configFile ? require(resolve('configs/webpack.config.js')) : {};

module.exports = merge(
  {
    entry: {
      index: './src/index.js',
    },
    mode: 'production',
    output: {
      filename: '[name].js',
      library: {
        type: 'system',
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.ts', '.tsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            rootMode: 'upward',
            // plugins: ['@babel/plugin-transform-modules-systemjs']
          },
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          include: [resolve('extensions'), resolve('packages')],
          options: {
            transpileOnly: true,
            // plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
          },
        },
        /* {
                test: /\.(js|jsx|ts|tsx)$/,
                include: [resolve('extensions')],
                use: [{ loader: config.absResolve('webpack/inject-extra-args-loader.js') }],
              }, */
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
          ],
        },
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
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[chunkhash:8].css',
      }),
      new SystemJSPublicPathWebpackPlugin({
        // optional: defaults to 1
        // If you need the webpack public path to "chop off" some of the directories in the current module's url, you can specify a "root directory level". Note that the root directory level is read from right-to-left, with `1` indicating "current directory" and `2` indicating "up one directory":
        rootDirectoryLevel: 1,
      }),
    ],
    ignoreWarnings: [
      {
        message: /export .* was not found in/,
      },
    ],
    externals: [
      'react',
      'react-is',
      'react-dom',
      'react-router-dom',
      'react-query',
      'lodash',
      '@kubed/components',
      '@kubed/hooks',
      '@kubed/icons',
      '@kubed/code-editor',
      '@kubed/charts',
      '@ks-console/shared',
      'styled-components',
      'react-markdown',
      'wujie-react',
    ],
  },
  configs,
);
