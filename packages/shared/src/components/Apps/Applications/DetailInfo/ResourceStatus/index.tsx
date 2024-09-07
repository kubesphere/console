/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { useCacheStore as useStore } from '../../../../../index';

import PodWorkloads from '../../AppTypeTable/OPAppTable/PodWorkloads';
import EdgeWorkloads from '../../AppTypeTable/OPAppTable/EdgeWorkloads';
import Services from '../../AppTypeTable/OPAppTable/Services';
import Workloads from '../../AppTypeTable/OPAppTable/Workloads';

const ResourceStatusWrapper = styled.div`
  & > div {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  .card-loading {
    div:nth-child(2) {
      text-align: center;
    }
  }
`;

function ResourceStatus(): JSX.Element {
  const [appDetail = {}] = useStore<any>('appDetail');
  const [urlPrefix] = useStore<string>('wujieUrlPrefix');
  const detail = get(appDetail, '_status.realTimeResources', []);
  const params = {
    cluster: appDetail.metadata?.labels?.['kubesphere.io/cluster'],
    namespace: appDetail.metadata?.labels?.['kubesphere.io/namespace'],
    workspace: appDetail.metadata?.labels?.['kubesphere.io/workspace'],
  };

  return (
    <ResourceStatusWrapper>
      {appDetail.spec.appType === 'edge' ? (
        <EdgeWorkloads appDetail={appDetail} detail={detail} prefix={urlPrefix} />
      ) : (
        <>
          <PodWorkloads detail={detail} params={params} prefix={urlPrefix} />
          <Services detail={detail} params={params} prefix={urlPrefix} />
          <Workloads detail={detail} params={params} prefix={urlPrefix} />
        </>
      )}
    </ResourceStatusWrapper>
  );
}

export default ResourceStatus;
