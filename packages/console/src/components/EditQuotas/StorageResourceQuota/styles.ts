/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Tabs, Slider as _Slider } from '@kubed/components';
import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #f9fbfd;
  border-radius: 4px;
  padding: 12px;
`;

export const Card = styled.div<{ clickable?: boolean }>`
  padding: 12px;
  border: 1px solid #ccd3db;
  border-radius: 4px;
  background-color: #fff;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  ${Wrapper} {
    margin-top: 12px;
  }
`;

export const Description = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #79879c;
`;

export const Columns = styled.div<{ $gap?: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
  align-items: center;
  gap: ${({ $gap = 24 }) => $gap}px;
`;

export const Slider = styled(_Slider)`
  padding: 12px;
  margin-bottom: 12px;
`;

export const AlertWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
  align-items: center;
  padding: 12px;
  border-radius: 4px;
  background-color: #c7deef;
  margin-bottom: 12px;
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

export const AlertContainer = styled.div`
  margin-bottom: 12px;
  margin-top: 12px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const ActionButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  border-radius: 24px;
  padding: 0 12px;
  &:hover {
    background-color: #eff4f9;
  }
  &:active {
    background-color: #e3e9ef;
  }
`;

export const ColumnsWithBg = styled(Columns)`
  padding: 8px 12px;
  background: #f9fbfd;
  border-radius: 4px;
`;

export const TabsWrapper = styled(Tabs)`
  & > div {
    &:span {
      display: none;
    }
    .tab-group {
      .tab-item {
        min-width: auto;
        & > label {
          min-width: 117px;
          padding: 0 10px;
        }
      }
    }
  }
`;
