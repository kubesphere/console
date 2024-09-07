/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { rollup } from 'rollup';
import path from 'path';
import chalk from 'chalk';
import fs from 'fs-extra';
import { execa } from 'execa';
import shelljs from 'shelljs';
import fg from 'fast-glob';
import { Logger } from './libs/logger';
import createRollupConfig from './libs/create-rollup-config';

import { PATHS, PACKAGES_TO_BUILD } from './constants';

const logger = new Logger('build-package');

async function locatePackage(packageName) {
  const folder = packageName.split('/')[1];
  const packagePath = path.join(__dirname, '../packages', folder);
  const exists = await fs.pathExists(packagePath);
  return exists ? packagePath : null;
}

async function compile(config) {
  const build = await rollup(config);
  const outputs = Array.isArray(config.output) ? config.output : [config.output];

  return Promise.all(outputs.map(output => build.write(output)));
}

async function tsc(packagePath) {
  await execa('yarn', ['tsc', '--build'], {
    cwd: packagePath,
  });
}

async function minify(packagePath) {
  const terserConfigFilePath = path.resolve(PATHS.root, 'scripts', 'terser.config.json');

  const files = await fg(['lib/**/*.js'], { cwd: packagePath });

  const total = files.length;
  let index = 0;

  shelljs.cd(packagePath);

  files.forEach(file => {
    const command = `terser ${file} --config-file ${terserConfigFilePath} --output ${file}`;
    shelljs.exec(command);
    logger.info(`minify ${++index} / ${total}`);
  });
}

async function buildPackage(packageName, options) {
  const packagePath = await locatePackage(packageName || '');
  if (!packagePath) {
    logger.error(`Package ${chalk.cyan(packageName)} does not exist`);
    process.exit(1);
  }

  logger.info(`Building package ${chalk.cyan(packageName)}`);

  try {
    const startTime = Date.now();

    ['cjs', 'esm', 'lib', 'dist'].forEach(item => {
      fs.removeSync(path.join(packagePath, item));
    });

    if (packageName === '@ks-console/shared') {
      fs.removeSync(path.join(packagePath, 'lib'));
      fs.removeSync(path.join(packagePath, 'tsconfig.tsbuildinfo'));
      await tsc(packagePath);
      await minify(packagePath);
    } else {
      for (const format of options?.formats) {
        const config = await createRollupConfig({
          ...options,
          basePath: packagePath,
          format,
        });

        logger.info(`Building to ${chalk.cyan(format)} format...`);
        await compile(config);
      }
    }

    logger.info(
      `Package ${chalk.cyan(packageName)} was build in ${chalk.green(
        `${((Date.now() - startTime) / 1000).toFixed(2)}s`,
      )}`,
    );
  } catch (err) {
    logger.error(`Failed to compile package: ${chalk.cyan(packageName)}`);
    process.stdout.write(`${err.toString('minimal')}\n`);
    process.exit(1);
  }
}

function build() {
  PACKAGES_TO_BUILD.forEach(async ({ packageName }) => {
    await buildPackage(packageName, {
      formats: ['es', 'cjs'],
      minify: true,
    });
  });
}

build();
