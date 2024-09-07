/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import WujieReact from 'wujie-react';

function DeploymentDetail(): JSX.Element {
  const url = `//${window.location.host}/consolev3/settings/notification-subscription/subscription-mail/create`;

  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}

export default DeploymentDetail;
