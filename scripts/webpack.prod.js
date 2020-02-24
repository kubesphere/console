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

const { resolve } = require('path')
const merge = require('lodash/merge')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const ChunkRenamePlugin = require('webpack-chunk-rename-plugin')

const root = path => resolve(__dirname, `../${path}`)

const baseConfig = require('./webpack.base')

const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap({
  mode: 'production',
  entry: baseConfig.entry,
  output: {
    filename: '[name].js',
    path: root('dist/'),
    publicPath: '/dist/',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      ...baseConfig.moduleRules,
      {
        test: /\.scss$/,
        exclude: /lego.theme.scss/,
        include: root('src'),
        loader: [
          MiniCssExtractPlugin.loader,
          { loader: 'cache-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[folder]__[local]--[hash:base64:5]',
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: baseConfig.postCssOptions,
          },
          { loader: 'fast-sass-loader' },
        ],
      },
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          { loader: 'cache-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
        include: root('src/assets'),
        use: {
          loader: 'file-loader',
          options: {
            outputPath: '/assets/',
          },
        },
      },
    ],
  },
  optimization: {
    flagIncludedChunks: true,
    occurrenceOrder: true,
    usedExports: true,
    sideEffects: true,
    concatenateModules: true,
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](?!(ace-builds|react-ace|xterm)).*.jsx?$/,
          name: 'vendor',
          priority: 10,
        },
        lego: {
          test: /[\\/]node_modules[\\/]@pitrix[\\/].*.jsx?$/,
          name: 'lego',
          priority: 20,
        },
        common: {
          name: 'common',
          minChunks: 2,
          minSize: 30000,
        },
      },
    },
  },
  resolve: merge({}, baseConfig.resolve, {
    alias: { 'lodash': root('node_modules/lodash') }
  }),
  plugins: [
    ...baseConfig.plugins,
    new ChunkRenamePlugin({
      vendor: '[name].js',
      lego: '[name].js',
    }),
    new CopyPlugin([{ from: root('src/assets'), to: root('dist/assets') }]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[chunkhash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
})
