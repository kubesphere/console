/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { FormattedGateway, gatewayStore } from '@ks-console/shared';
import { Loading } from '@kubed/components';
import { pick } from 'lodash';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import GatewayCard from '../../../ClusterSetting/Gateway/Components/GatewayCard';
import { Title } from './styles';

const { useGetMutation } = gatewayStore;
const ProjectGateway = () => {
  const params = useParams();
  const { data: detail, isLoading } = useGetMutation(pick(params, 'cluster'));
  if (isLoading) {
    return <Loading className="page-loading" />;
  }
  return (
    <>
      <Title>{t('GATEWAY')}</Title>
      <GatewayCard type="cluster" gateway={detail as FormattedGateway} />
    </>
  );
};

export default ProjectGateway;
