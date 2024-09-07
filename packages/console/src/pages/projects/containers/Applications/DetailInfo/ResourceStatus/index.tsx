/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import styled from 'styled-components';
import { useCacheStore as useStore } from '@ks-console/shared';
import { useParams } from 'react-router-dom';

import { Ingresses, Services, Workloads } from '../../../../components';

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
  const { cluster, namespace } = useParams();
  const [appDetail] = useStore<any>('appDetail');
  const [urlPrefix] = useStore<string>('wujieUrlPrefix');

  return (
    <ResourceStatusWrapper>
      <Ingresses
        cluster={cluster}
        namespace={namespace}
        prefix={urlPrefix}
        selector={appDetail.selector}
      />
      <Services
        cluster={cluster}
        namespace={namespace}
        prefix={urlPrefix}
        selector={appDetail.selector}
      />
      <Workloads
        cluster={cluster}
        namespace={namespace}
        prefix={urlPrefix}
        selector={appDetail.selector}
      />
    </ResourceStatusWrapper>
  );
}

export default ResourceStatus;
