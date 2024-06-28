import { useCacheStore as useStore } from '@ks-console/shared';
import React from 'react';
import styled from 'styled-components';
import Logs from './LogViews';
import Progress from './Progress';

const Wrapper = styled.div`
  padding: 12px;
`;

function KubekeyCluster() {
  const [kubekeyCluster] = useStore('kubekeyCluster');

  return (
    <Wrapper>
      <Progress detail={kubekeyCluster} />
      <Logs detail={kubekeyCluster} />
    </Wrapper>
  );
}

export default KubekeyCluster;
