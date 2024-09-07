/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export { LoadingWrapper } from './shared.styles';

export const Page = styled.div`
  min-height: 100vh;
  padding-top: 68px;
  margin-top: -68px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  background-repeat: no-repeat;
  background-position: top;
  background-size: auto 100%;
  background-image: url('/assets/extensions-bg.png');
`;

export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
`;

export const Container = styled.div`
  display: flex;
  padding-bottom: 40px;
`;

export const Content = styled.div`
  flex: 1;
  overflow-x: hidden;
`;

export const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding-bottom: 20px;
`;
