import React from 'react';
import { get } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { ClusterDetail, hasClusterModule } from '@ks-console/shared';
import { Card } from '@kubed/components';
import { Area, AreaWrapper, Level, StyledField, Text } from '../styles';

interface Props {
  cluster: ClusterDetail;
  version?: string;
}

function ClusterInfo({ cluster, version }: Props) {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/clusters/${cluster.name}/visibility`);

  if (!hasClusterModule(cluster.name, 'whizard-monitoring')) {
    return (
      <div className="mb12">
        <Text className="mb12" fontSize={12}>
          {t('BASIC_INFORMATION')}
        </Text>
        <AreaWrapper gap={8} columns={2}>
          <Area>
            <StyledField label={t('PROVIDER')} value={cluster.provider}></StyledField>
          </Area>
          <Area>
            <StyledField
              label={t('KUBERNETES_VERSION')}
              value={cluster.kubernetesVersion || version}
            ></StyledField>
          </Area>
          <Area>
            <StyledField
              label={t('KUBESPHERE_VERSION')}
              value={get(cluster, 'configz.ksVersion', '-')}
            ></StyledField>
          </Area>
          <Area>
            <StyledField
              label={t('CLUSTER_VISIBILITY_SCAP')}
              value={
                cluster.visibility === 'public' ? t('VISIBILITY_PUBLIC') : t('VISIBILITY_PARTIAL')
              }
              onClick={handleClick}
            ></StyledField>
          </Area>
        </AreaWrapper>
      </div>
    );
  }

  return (
    <Card sectionTitle={t('BASIC_INFORMATION')} className="mb12">
      <Level>
        <StyledField label={t('PROVIDER')} value={cluster.provider}></StyledField>
        <StyledField
          label={t('KUBERNETES_VERSION')}
          value={cluster.kubernetesVersion || version}
        ></StyledField>
        <StyledField
          label={t('KUBESPHERE_VERSION')}
          value={get(cluster, 'configz.ksVersion', '-')}
        ></StyledField>
        <StyledField
          label={t('CLUSTER_VISIBILITY_SCAP')}
          value={cluster.visibility === 'public' ? t('VISIBILITY_PUBLIC') : t('VISIBILITY_PARTIAL')}
          onClick={handleClick}
        ></StyledField>
      </Level>
    </Card>
  );
}

export default ClusterInfo;
