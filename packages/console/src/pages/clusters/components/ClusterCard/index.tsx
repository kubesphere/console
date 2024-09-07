/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Card, Field, Entity } from '@kubed/components';
import { formatTime, ClusterTitle } from '@ks-console/shared';
import styled from 'styled-components';

const CardWrapper = styled(Card)`
  & .favorite-action {
    visibility: hidden;
  }
  &:hover .favorite-action {
    visibility: visible;
  }
`;
const ClusterCard = ({ data, className, actions, favorite }: any) => {
  return (
    <CardWrapper contentStyle={{ padding: '8px' }} hoverable className={className}>
      <Entity bordered={false}>
        <ClusterTitle cluster={data} to={`/clusters/${data.name}/overview`} width="25%" />
        <Field label={t('NODE_COUNT')} value={data.nodeCount || '-'} width="16.6%" />
        <Field
          label={t('KUBERNETES_VERSION')}
          value={data.kubernetesVersion || '-'}
          width="16.6%"
        />
        <Field label={t('PROVIDER')} value={data.provider || '-'} width="16.6%" />
        <Field label={t('CREATION_TIME')} value={formatTime(data.createTime)} width="16.6%" />
        {favorite}
        {actions && <Field label={actions} width="8.3%" />}
      </Entity>
    </CardWrapper>
  );
};

export default ClusterCard;
