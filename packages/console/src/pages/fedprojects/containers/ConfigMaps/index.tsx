/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import WujieReact from 'wujie-react';
import { useParams } from 'react-router-dom';

function FedProjects(): JSX.Element {
  const { workspace, namespace } = useParams<'workspace' | 'namespace'>();
  const url = `//${window.location.host}/consolev3/${workspace}/federatedprojects/${namespace}/configmaps`;

  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}

export default FedProjects;
