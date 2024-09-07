/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import path from 'path';
import fs from 'fs-extra';
import commonjs from '@rollup/plugin-commonjs';
import nodeExternals from 'rollup-plugin-node-externals';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';

export default async function createRollupConfig(config) {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(config.basePath, './package.json')).toString('utf-8'),
  );

  const plugins = [
    commonjs(),
    json(),
    nodeExternals({
      include: [/^ace-builds/, /^react-ace/, /^styled-components/, /^yet-another-react-lightbox/],
    }),
    nodeResolve({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
    esbuild({
      minify: true,
      sourceMap: false,
      tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
    }),
  ];

  let externals;

  if (config.format === 'umd') {
    externals = [
      ...(config?.externals || []),
      ...Object.keys({
        ...packageJson.peerDependencies,
      }),
    ];
  } else {
    externals = [
      ...(config?.externals || []),
      ...Object.keys({
        ...packageJson.peerDependencies,
        ...packageJson.dependencies,
      }),
    ];
  }

  const output = {
    name: packageJson.name,
    format: config.format,
    externalLiveBindings: false,
    sourcemap: config.sourcemap,
  };

  if (config.format === 'es') {
    output.dir = path.resolve(config.basePath, 'esm');
    output.preserveModules = true;
  }

  if (config.format === 'cjs') {
    output.dir = path.resolve(config.basePath, 'cjs');
    output.preserveModules = true;
    output.exports = 'named';
  }

  return {
    input: config?.entry || path.resolve(config.basePath, 'src/index.ts'),
    output,
    external: externals,
    plugins,
  };
}
