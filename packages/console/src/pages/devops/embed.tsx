/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import * as React from 'react';
import WujieReact from 'wujie-react';
import { useLocation } from 'react-router-dom';

const Devops = () => {
  const location = useLocation();
  const url = `//${window.location.host}/consolev3${location.pathname}${location.search}`;

  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
};

export default Devops;
