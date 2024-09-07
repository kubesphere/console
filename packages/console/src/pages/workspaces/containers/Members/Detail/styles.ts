/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Title = styled.div`
  position: relative;
  height: 20px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
`;

export const TableWrapper = styled.div`
  position: relative;
  margin: 0 -20px;
`;

export const Filter = styled.div`
  position: relative;
  padding: 10px 20px;
  background-color: #f9fbfd;
  box-shadow: 0 1px 0 0 #eff4f9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Pagination = styled.div`
  background-color: #f9fbfd;
  line-height: 56px;
  box-shadow: 0 -1px 0 0 #d8dee5;
`;

export const EmptyText = styled.div`
  text-align: center;
  padding: 16px;

  & > div {
    font-size: 14px;
    line-height: 1.43;
    color: #36435c;
    font-family: ${({ theme }) => theme.font.sans}
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    font-weight: 600;
  }

  & > p {
    font-family: ${({ theme }) => theme.font.sans}
    font-size: 12px;
    margin: 0;
    margin-top: 4px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.67;
    letter-spacing: normal;
    color: #79879c;
  }
`;

export const EmptyTipIcon = styled.span`
  width: 60px;
  height: 60px;
  border-radius: 50% 0 50% 50%;
  background: #eff4f9;
  display: inline-block;
  line-height: 50px;
  margin-bottom: 20px;
`;

export const Action = styled.span`
  color: #329dce;
  padding: 0 4px;
  cursor: pointer;
  font-weight: 600;
`;
