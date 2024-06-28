import consoleApp from '@ks-console/console';
import appStore from '@ks-console/appstore';

import { resolveExtensionConfigs } from './extensions.config';

const internalExtensionConfigs = [consoleApp, appStore];

export async function registerInternalExtensions() {
  const extensionConfigs = await resolveExtensionConfigs(internalExtensionConfigs);
  globals.context.registerExtensions(extensionConfigs);
}
