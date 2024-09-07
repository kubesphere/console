/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Root = styled.div`
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 12px;
  height: 32px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.accents_1};
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

export const Title = styled.h6`
  margin-bottom: 0;
  color: ${({ theme }) => theme.palette.accents_8};
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
`;

export const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  height: 20px;
  padding: 4px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.palette.accents_4};
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`;
