import React from 'react';
import WujieReact from 'wujie-react';
import { useParams } from 'react-router-dom';

const GatewayDetailEmbed = () => {
  const { cluster, component = 'cluster', gatewayName } = useParams();

  // eslint-disable-next-line max-len
  const url = `//${window.location.host}/consolev3/clusters/${cluster}/gateways/${component}/${gatewayName}/gateway-configs`;

  return <WujieReact width="100%" height="100%" name="consolev3" url={url} sync={false} />;
};

export default GatewayDetailEmbed;
