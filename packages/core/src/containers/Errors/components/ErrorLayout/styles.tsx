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
  padding: 140px 20px 20px 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
`;

export const Illustration = styled.div<{ $backgroundImagePath: string }>`
  width: 320px;
  height: 180px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url('${({ $backgroundImagePath }) => $backgroundImagePath}');
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
