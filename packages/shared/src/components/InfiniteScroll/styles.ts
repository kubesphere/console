import styled from 'styled-components';

import { EmptyWrapper } from './shared.styles';

export const Container = styled.div`
  overflow-y: auto;
  height: 100%;
`;

export const Content = styled.div``;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 12px;
`;

export const RefreshingWrapper = EmptyWrapper;
