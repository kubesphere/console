/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { notify, Notify } from '@kubed/components';
import type { GlobalMessage } from '@ks-console/shared';
import { checker, useEventEmitter as eventEmitter, requestHelper } from '@ks-console/shared';

const { enableErrorNotify } = globals.config;
const { isAppsPage, isMemberClusterPage } = checker;
const { WithTitle } = Notify;

const init = () => {
  const { $on } = eventEmitter();

  // global message handler
  $on('globalMsg', (msg: GlobalMessage) => {
    const { status, response } = msg;
    const isApiForbiddenError = requestHelper.getIsApiForbiddenError({
      method: response?.config.method ?? '',
      code: response?.data?.code,
      reason: response?.data?.reason,
    });

    if (isApiForbiddenError) {
      return;
    } else if (status === 401 || msg.reason === 'Unauthorized') {
      // session timeout handler, except app store page.
      if (!isAppsPage() && !isMemberClusterPage(location.pathname, msg.message || '')) {
        location.href = `/login?referer=${location.pathname}`;
        window.alert(
          t('Session timeout or this account is logged in elsewhere, please login again'),
        );
      } else {
        notify.error(<WithTitle title={msg.reason} message={msg.message} />, { duration: 6000 });
      }
    } else if (enableErrorNotify && (msg.reason || msg.message)) {
      notify.error(<WithTitle title={msg.reason} message={msg.message} />, { duration: 6000 });
    }
  });
};

export default { init };
