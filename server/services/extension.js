/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const get = require('lodash/get');
const pick = require('lodash/pick');
const merge = require('lodash/merge');
const { sendGatewayRequest } = require('../libs/request');

// packages/core/src/globals.d.ts
const ENTRY_KEYS = [
  'parent',
  'name',
  'link',
  'title',
  'icon',
  'order',
  'desc',
  'skipAuth',
  'authKey',
  'authAction',
  'children',
  // not in globals.d.ts
  'assets',
];

const getExtensionEntries = async ctx => {
  const url = '/apis/extensions.kubesphere.io/v1alpha1/extensionentries';
  try {
    const token = ctx.cookies.get('token');

    const data = await sendGatewayRequest({ method: 'GET', url, token });
    const items = get(data, 'items', []);
    const extensionEntries = [];

    items.forEach(item => {
      const extensionName = get(item, ['metadata', 'labels', 'kubesphere.io/extension-ref']);
      const entries = get(item, ['spec', 'entries'], []).map(record => pick(record, ENTRY_KEYS));
      extensionEntries.push({ extensionName, entries });
    });

    return extensionEntries;
  } catch (error) {
    ctx.app.emit('error', { url, error });
    return [];
  }
};

const getInstalledExtensions = async ctx => {
  const url = '/apis/extensions.kubesphere.io/v1alpha1/jsbundles';

  try {
    const token = ctx.cookies.get('token');

    const [extensions, extensionEntries] = await Promise.all([
      sendGatewayRequest({ method: 'GET', url, token }),
      getExtensionEntries(ctx),
    ]);

    const installedExtensions = [];
    if (Array.isArray(extensions?.items)) {
      extensions.items.forEach(item => {
        const name = get(item, 'metadata.name');
        const extensionName = get(item, 'metadata.labels["kubesphere.io/extension-ref"]');
        const resourceVersion = get(item, 'metadata.resourceVersion');
        const { link, state } = item.status;
        const styleLink = item.spec.assets?.style?.link;

        if (state === 'Available') {
          const entries = extensionEntries.find(record => record.extensionName === extensionName);

          const data = merge(
            null,
            {
              name,
              extensionName,
              link,
              styleLink,
              resourceVersion,
            },
            entries,
          );

          installedExtensions.push(data);
        }
      });
    }
    return installedExtensions;
  } catch (error) {
    ctx.app.emit('error', { url, error });
    return [];
  }
};

const getEnabledExtensionModules = async ({ token }, ctx) => {
  const url = '/apis/kubesphere.io/v1alpha1/extensions';
  try {
    const extensions = await sendGatewayRequest({
      method: 'GET',
      url,
      token,
    });

    const enabledExtensionModules = {};
    const enabledExtensionModulesStatus = {};
    if (Array.isArray(extensions?.items)) {
      extensions.items.forEach(item => {
        const name = get(item, 'metadata.name');
        const enabled = get(item, 'status.enabled');
        if (enabled) {
          enabledExtensionModules[name] = true;
          if (name === 'whizard-monitoring') {
            const annotations = get(item, 'metadata.annotations', {});

            enabledExtensionModules.whizard =
              annotations['monitoring.kubesphere.io/enable-whizard'] === 'true' ? true : false;
          }

          const annotations = get(item, 'metadata.annotations');
          enabledExtensionModulesStatus[name] = {
            status: true,
            clusterSchedulingStatuses: Object.entries(
              get(item, 'status.clusterSchedulingStatuses', {}),
            ).reduce((acc, [clusterName, clusterStatus]) => {
              acc[clusterName] = clusterStatus.state === 'Installed';
              return acc;
            }, {}),
            annotations: annotations ? encodeURIComponent(JSON.stringify(annotations)) : undefined,
            // annotations,
          };
        }
      });
    }
    return { enabledExtensionModules, enabledExtensionModulesStatus };
  } catch (error) {
    ctx.app.emit('error', { url, error });
    return { enabledExtensionModules: {}, enabledExtensionModulesStatus: {} };
  }
};

module.exports = {
  getInstalledExtensions,
  getEnabledExtensionModules,
};
