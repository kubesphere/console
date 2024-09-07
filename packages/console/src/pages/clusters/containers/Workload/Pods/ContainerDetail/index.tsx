/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import WujieReact from 'wujie-react';
import { useParams } from 'react-router-dom';

function ContainerDetail(): JSX.Element {
  const params: Record<string, any> = useParams();
  const { cluster, namespace, podName, containerName } = params;

  const url = `//${window.location.host}/consolev3/clusters/${cluster}/projects/${namespace}/pods/${podName}/containers/${containerName}`;

  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}

export default ContainerDetail;
