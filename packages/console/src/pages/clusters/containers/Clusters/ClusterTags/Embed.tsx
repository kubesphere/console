/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import WujieReact from 'wujie-react';
import React from 'react';

export default function Embed() {
  const url = `//${window.location.host}/consolev3/clusters/tags`;
  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}
