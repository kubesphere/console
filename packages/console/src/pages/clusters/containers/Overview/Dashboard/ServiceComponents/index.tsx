import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { hasClusterModule, Icon, Constants } from '@ks-console/shared';
import { Card } from '@kubed/components';
import { Tooltip } from './styles';

interface Props {
  cluster: string;
}

const IconsWrapper = styled.div`
  .kubed-icon {
    background-color: ${({ theme }) => theme.palette.colors.white[0]};
  }

  span {
    margin-right: 8px;
  }
`;

export const ClickableIcon = styled(Icon)`
  cursor: pointer;
`;

function ServiceComponents({ cluster }: Props) {
  const configs = [
    {
      type: 'kubesphere',
      title: 'KubeSphere',
    },
    {
      type: 'kubernetes',
      title: 'Kubernetes',
    },
    {
      type: 'istio',
      title: 'Istio',
      disabled: !hasClusterModule(cluster, 'servicemesh'),
    },
    {
      type: 'monitoring',
      title: t('MONITORING'),
      disabled: !hasClusterModule(cluster, 'whizard-monitoring'),
    },
    {
      type: 'logging',
      title: t('LOGGING'),
      disabled: !hasClusterModule(cluster, 'logging'),
    },
    {
      type: 'devops',
      title: 'DevOps',
      disabled: !hasClusterModule(cluster, 'devops'),
    },
  ];

  return (
    <Card sectionTitle={t('SYSTEM_COMPONENT_PL')} className="mb12">
      <IconsWrapper>
        {configs
          .filter(item => !item.disabled)
          .map(item => (
            <Tooltip key={item.type} data-tooltip={item.title}>
              <Link to={`/clusters/${cluster}/components?type=${item.type}`}>
                <ClickableIcon name={Constants.COMPONENT_ICON_MAP[item.type]} size={44} />
              </Link>
            </Tooltip>
          ))}
      </IconsWrapper>
    </Card>
  );
}

export default ServiceComponents;
