/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEmpty } from 'lodash';

import { ENV } from '@ks-console/shared';
import type { ExtensionConfig } from '../types/extension-config';
import { resolveExtensionConfig } from './extensions.config';
import i18n from './i18n';

interface Extension {
  name: string;
  extensionName: string;
  link: string;
  resourceVersion: string;
  entries?: ExtensionConfig['menus'];
}

interface ExtensionConfigWithName extends ExtensionConfig {
  extensionName: string;
}

function importRemoteExtensions(extensions: Extension[]) {
  const promises: Promise<ExtensionConfigWithName | null>[] = [];

  if (Array.isArray(extensions)) {
    extensions.forEach(extension => {
      const { extensionName, link, resourceVersion, entries } = extension;
      const moduleId = `/pstatic${link}?resourceVersion=${resourceVersion}`;
      const module = System.import(moduleId);

      const promise = module
        .then(({ default: input }) => (input ? resolveExtensionConfig(input) : null))
        .then(async extensionConfig => {
          globals.context.registerLocales(extensionConfig?.locales);
          await i18n.init();
          return extensionConfig;
        })
        .then(extensionConfig => {
          const newExtensionConfig = { ...extensionConfig };
          if (Array.isArray(entries) && entries.length > 0) {
            newExtensionConfig.menus = entries;
          }
          if (!isEmpty(newExtensionConfig)) {
            globals.context.registerExtension(newExtensionConfig, { extensionName });
          }
          return { ...extensionConfig, extensionName };
        })
        .catch(reason => {
          console.error(`[${extensionName}]`, reason);
          throw reason;
        });

      promises.push(promise);
    });
  }

  return Promise.allSettled(promises);
}

export function registerRemoteExtensions() {
  const remoteExtensions = globals?.installedExtensions ?? [];

  if (ENV.isProduction) {
    return importRemoteExtensions(remoteExtensions);
  } else if (ENV.isDevelopment) {
    const installedExtensionNames = remoteExtensions.map(({ extensionName }) => extensionName);

    let includes = globals.config.importRemoteExtensions?.includes ?? [];
    let excludes = globals.config.importRemoteExtensions?.excludes ?? [];

    if (!Array.isArray(includes)) {
      includes = [];
    }
    if (!Array.isArray(excludes)) {
      excludes = [];
    }

    if (includes.includes('*')) {
      includes = [...installedExtensionNames];
    }
    if (excludes.includes('*')) {
      excludes = [...installedExtensionNames];
    }

    const extensions = remoteExtensions.filter(({ extensionName }) => {
      return includes.includes(extensionName) && !excludes.includes(extensionName);
    });
    return importRemoteExtensions(extensions);
  }
}
