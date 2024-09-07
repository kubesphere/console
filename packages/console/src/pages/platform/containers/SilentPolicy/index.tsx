/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
// import { isEmpty } from 'lodash';
import WujieReact from 'wujie-react';

export default function SilentPolicy() {
  const url = `//${window.location.host}/consolev3/settings/silent-policy`;
  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
}
