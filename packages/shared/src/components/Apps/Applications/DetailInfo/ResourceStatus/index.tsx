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
import Ingresses from '../../AppTypeTable/OPAppTable/Ingresses';
import Volumes from '../../AppTypeTable/OPAppTable/Volumes';

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
          <PodWorkloads detail={detail} params={params} />
          <Services detail={detail} params={params} />
          <Workloads detail={detail} params={params} />
          <Ingresses detail={detail} params={params} />
          <Volumes detail={detail} prefix={urlPrefix} />
        </>
      )}
    </ResourceStatusWrapper>
  );
}

export default ResourceStatus;
