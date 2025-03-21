/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Root = styled.div`
  height: 100%;
  padding: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 140px;
  background-color: #fff;
`;

export const Illustration = styled.div`
  width: 320px;
  height: 180px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url('/assets/403.svg');
`;

export const Title = styled.h1`
  padding-top: 32px;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const Description = styled.p`
  padding-top: 8px;
  margin: 0;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_5};
`;
