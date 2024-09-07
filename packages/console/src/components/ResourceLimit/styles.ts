/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InputLimit = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 12px 20px 12px 12px;
  border-radius: 4px;
  gap: 8px;
  background-color: #f9fbfd;
`;

export const InputItem = styled.div<{ $error?: boolean }>`
  ${props =>
    props.$error &&
    `& .input-wrapper {
     border-color: #ca2621!important;
     box-shadow: none!important;
     }   
    `};
  display: grid;
  grid-template-areas:
    'icon labal input'
    'icon label input';
  grid-template-columns: 68px auto 1fr;
  align-items: center;
  gap: 8px;
  & > :first-child {
    grid-area: icon;
    padding-left: 8px;
    height: 100%;
  }
`;

export const AlertWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
  align-items: center;
  padding: 12px;
  border-radius: 4px;
  background-color: #c7deef;
`;

export const AlertContent = styled.div`
  & > div {
    color: #3385b0;
    font-family:
      PingFang SC,
      Lantinghei SC,
      Helvetica Neue,
      Helvetica,
      Arial,
      Microsoft YaHei,
      微软雅黑,
      STHeitiSC-Light,
      simsun,
      宋体,
      WenQuanYi Zen Hei,
      WenQuanYi Micro Hei,
      sans-serif;
    font-size: 12px;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.67;
    letter-spacing: normal;
    &:first-child {
      font-weight: 600;
    }
    & > span + span {
      margin-left: 8px;
    }
  }
`;
