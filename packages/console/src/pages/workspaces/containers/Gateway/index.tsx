/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Banner, Navs } from '@kubed/components';
import { Loadbalancer } from '@kubed/icons';
import { FormattedGateway } from '@ks-console/shared';
import { useNavigate, useParams } from 'react-router-dom';
import Embed from './embed';

export interface GatewayConfig {
  setVisible: boolean;
  deleteVisible: boolean;
  updateVisible: boolean;
  gateway: null | FormattedGateway;
  payloads: Record<string, any>;
}

function Gateway() {
  const { workspace, component = 'workspace' } = useParams();
  const navigate = useNavigate();

  const onNavChange = function (value: string) {
    navigate(`/workspaces/${workspace}/gateways/${value}`);
  };

  const navData = [
    {
      value: 'workspace',
      label: t('WORKSPACE_GATEWAY_PL'),
    },
    {
      value: 'project',
      label: t('PROJECT_GATEWAY_PL'),
    },
  ];
  return (
    <div>
      <Banner
        icon={<Loadbalancer />}
        title={t('GATEWAY_SETTINGS')}
        description={t('CLUSTER_GATEWAY_DESC')}
        className="mb12"
      >
        <Navs data={navData} defaultValue={component} onChange={onNavChange} />
      </Banner>
      <Embed component={component} />
    </div>
  );
}

export default Gateway;
