import React from 'react';
import { Field } from '@kubed/components';

type Props = {
  detail: any;
};

function ServiceAccess({ detail }: Props): JSX.Element {
  if (detail.specType === 'ClusterIP') {
    return <Field label={t('VIRTUAL_IP_ADDRESS')} value={detail.clusterIP} />;
  }

  if (detail.specType === 'NodePort') {
    return (
      <Field
        label={t('PORT_PL')}
        value={detail.ports
          .filter((port: any) => port.nodePort)
          .map((port: any) => `${port.port}:${port.nodePort}/${port.protocol}`)
          .join('; ')}
      />
    );
  }

  if (detail.specType === 'LoadBalancer') {
    return (
      <Field
        label={
          detail.loadBalancerIngress.length > 1 ? t('LOAD_BALANCERS_SCAP') : t('LOAD_BALANCER_SCAP')
        }
        value={detail.loadBalancerIngress.join('; ')}
      />
    );
  }

  return <Field label={detail.specType} value={detail.externalName} />;
}

export default ServiceAccess;
