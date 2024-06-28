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
