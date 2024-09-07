/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import WujieReact from 'wujie-react';
import { useLocation, useParams } from 'react-router-dom';

export default function Embed() {
  const params: Record<string, any> = useParams();
  const { cluster, name } = params;

  const location = useLocation();

  const url = `//${window.location.host}/consolev3/clusters/${cluster}/pv/${name}${location.search}`;
  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}
