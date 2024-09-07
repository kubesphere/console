/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Information } from '@kubed/icons';

import { LoadingWrapper as BaseLoadingWrapper, StepContentInnerWrapper } from '../shared.styles';

export { StepContentInnerWrapper } from '../shared.styles';

export const LoadingWrapper = styled(BaseLoadingWrapper)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const DependenciesEmptyWrapper = styled(StepContentInnerWrapper)`
  padding: 32px;
`;

export const DependencyHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding-bottom: 8px;
`;

export const DependencyTitle = styled.h6`
  margin: 0;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.colors.black};
`;

export const TipIcon = styled(Information)`
  cursor: pointer;
`;

export const Dependencies = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  max-height: 376px;
`;
