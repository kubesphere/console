const fs = require('fs-extra');
const { config, systemImports } = require('./config');
const WebpackBar = require('webpackbar');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';
const styledComponentsTransformer = createStyledComponentsTransformer();
const getCustomTransformers = isDev ? () => ({ before: [styledComponentsTransformer] }) : {};

const { resolve, absResolve } = config;

const configFile = fs.pathExistsSync(resolve('configs/webpack.config.js'));
const configs = configFile ? require(resolve('configs/webpack.config.js')) : {};

const webpackBaseConfig = merge(configs, {
  entry: {
    main: config.webIndex,
    terminal: config.terminalIndex,
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.ts', '.tsx', '.json'],
    modules: [resolve('extensions'), resolve('packages'), 'node_modules'],
    alias: {
      'styled-components': resolve('node_modules/styled-components'),
    },
  },
  module: {
    rules: [
      {
        resource: config.webIndex,
        use: [
          {
            loader: absResolve('webpack/systemjs-imports-loader.js'),
            options: { importsMap: systemImports },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [resolve('extensions'), resolve('packages')],
        options: {
          cacheDirectory: true,
          plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [resolve('extensions'), resolve('packages'), resolve('node_modules')],
        options: {
          transpileOnly: true,
          getCustomTransformers,
          // plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
        },
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${config.assetsPath}`,
          to: `${config.distAssetsPath}`,
          globOptions: { ignore: ['**/v3dist/**'] },
        },
        {
          from: `${config.assetsPath}/v3dist`,
          to: `${config.distPath}/v3dist`,
        },
      ],
    }),
    new WebpackBar({
      name: NODE_ENV || 'webpack-bar',
      color: 'green',
      profile: !isDev,
    }),
  ],
});

module.exports = webpackBaseConfig;
