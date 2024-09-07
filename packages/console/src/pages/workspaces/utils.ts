/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { getActions, openpitrixStore } from '@ks-console/shared';

const { defaultUrl } = openpitrixStore;

export function getAvatar(icon: string): string {
  return String(icon).startsWith('att-') ? `/${defaultUrl}/attachments/${icon}?filename=raw` : icon;
}

export function getEnabledActions(workspace: string | undefined) {
  return getActions({
    module: 'workspace-settings',
    workspace,
  });
}
