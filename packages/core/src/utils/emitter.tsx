/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { notify, Notify } from '@kubed/components';
import { GlobalMessage, checker, useEventEmitter } from '@ks-console/shared';

const { enableErrorNotify } = globals.config;
const { isAppsPage, isMemberClusterPage } = checker;
const { WithTitle } = Notify;

const init = () => {
  const { $on } = useEventEmitter();

  // global message handler
  $on('globalMsg', (msg: GlobalMessage) => {
    const { status } = msg;

    if (status === 401 || msg.reason === 'Unauthorized') {
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
