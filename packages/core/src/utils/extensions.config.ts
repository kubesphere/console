import type { ExtensionConfig } from '../types/extension-config';

type Input =
  | ExtensionConfig
  | Promise<ExtensionConfig>
  | (() => ExtensionConfig | Promise<ExtensionConfig>);

export async function resolveExtensionConfig(input: Input): Promise<ExtensionConfig> {
  if (typeof input === 'function') {
    return input();
  }

  return Promise.resolve().then(() => input);
}

export async function resolveExtensionConfigs(inputs: Input[]): Promise<ExtensionConfig[]> {
  const promises = inputs.map(resolveExtensionConfig);
  return Promise.all(promises);
}
