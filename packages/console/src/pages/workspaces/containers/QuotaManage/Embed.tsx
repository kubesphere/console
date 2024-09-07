/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import WujieReact from 'wujie-react';

function Embed() {
  const params = useParams<'workspace'>();
  const { workspace } = params;
  const url = `//${window.location.host}/consolev3/workspaces/${workspace}/quota`;

  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}

export { Embed };
