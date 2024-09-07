/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { FormattedExtension } from '../../../stores/extension';

interface GetActionButtonPropsOptions {
  extensionMarketplace: FormattedExtension['marketplace'] | undefined;
  marketplaceRepoName: string | undefined;
}

interface GetActionButtonPropsReturns {
  actionType: 'subscribe' | 'manage';
}

function getActionButtonProps({
  extensionMarketplace,
  marketplaceRepoName,
}: GetActionButtonPropsOptions): GetActionButtonPropsReturns {
  const manageRet = {
    actionType: 'manage',
  } as const;

  if (Boolean(marketplaceRepoName) && extensionMarketplace?.repoName === marketplaceRepoName) {
    if (extensionMarketplace?.isSubscribed) {
      return manageRet;
    }

    return {
      actionType: 'subscribe',
    };
  }

  return manageRet;
}

export { getActionButtonProps };
