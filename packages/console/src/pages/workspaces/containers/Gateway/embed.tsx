/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import WujieReact from 'wujie-react';
import { useParams } from 'react-router-dom';

const SettingEmbed = ({ component }: { component: string }) => {
  const { workspace } = useParams();

  const url = `//${window.location.host}/workspaces/${workspace}/gateways/${component}`;

  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
};

export default SettingEmbed;
