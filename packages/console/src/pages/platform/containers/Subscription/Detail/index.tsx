/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import WujieReact from 'wujie-react';
import { useParams } from 'react-router-dom';

function DeploymentDetail(): JSX.Element {
  const { name } = useParams<any>();

  const url = `//${window.location.host}/consolev3/settings/notification-subscription/subscription-mail/detail/${name}`;

  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}

export default DeploymentDetail;
