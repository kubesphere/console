/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Entity } from '@kubed/components';

import { ClusterTitle } from '@ks-console/shared';

import { LoadingWrapper as BaseLoadingWrapper } from '../shared.styles';
export { StepContentTitle, StepContentInnerWrapper } from '../shared.styles';

export const LoadingWrapper = styled(BaseLoadingWrapper)`
  height: 300px;
`;

export const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding-bottom: 20px;
`;

export const ClustersWrapper = styled.div`
  margin-top: 12px;
`;

export const StyledEntity = styled(Entity)`
  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`;

export const StyledClusterTitle = styled(ClusterTitle)`
  margin-left: -8px;
`;
