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
  const { cluster, component = 'cluster' } = useParams();
  const navigate = useNavigate();

  const onNavChange = function (value: string) {
    navigate(`/clusters/${cluster}/gateways/${value}`);
  };

  const navData = [
    {
      value: 'cluster',
      label: t('CLUSTER_GATEWAY'),
    },
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
    <>
      <Banner
        icon={<Loadbalancer />}
        title={t('GATEWAY_SETTINGS')}
        description={t('CLUSTER_GATEWAY_DESC')}
        className="mb12"
      >
        <Navs data={navData} defaultValue={component} onChange={onNavChange} />
        <Embed component={component} />
      </Banner>
    </>
  );
}

export default Gateway;
