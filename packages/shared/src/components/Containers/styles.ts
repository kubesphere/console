/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled, { css } from 'styled-components';
import { Tag } from '@kubed/components';
import StatusIndicator from '../StatusIndicator';

const textCss = css`
  font-family: ${({ theme }) => theme.font.sans};
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
`;

const h6Css = css`
  font-weight: bold;
  line-height: 1.67;
`;

const ellipsisCss = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  padding: 12px;
  margin-bottom: 8px;
  line-height: 20px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.border};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Indicator = styled(StatusIndicator)`
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;

export const IconWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  margin-right: 12px;
`;

export const Text = styled.div`
  min-width: 120px;

  & > p {
    margin: 0;
    ${ellipsisCss}
    ${textCss}
    ${h6Css}
    color: ${({ theme }) => theme.palette.accents_5};
  }

  & > div {
    ${ellipsisCss}
    ${textCss}
    font-weight: 600;
    line-height: 1.67;
    color: ${({ theme }) => theme.palette.colors.dark[3]};
    display: flex;
    align-items: center;
  }

  .kubed-icon {
    margin-left: 8px;
    cursor: pointer;
  }
`;

export const TextName = styled(Text)`
  padding-right: 20px;
  width: 40%;
`;

export const ProbeItem = styled.div`
  &:not(:first-child) {
    margin-top: 8px;
  }
  & > p {
    margin: 4px 0 0 0;
    line-height: 20px;
    font-family: ${({ theme }) => theme.font.sans};
    font-weight: 600;
  }
`;

export const ProbeType = styled.span`
  margin-left: 4px;
  font-weight: 600;
  line-height: 20px;
`;

export const ProbeTime = styled.span`
  margin-left: 4px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const NoLink = styled.span`
  opacity: 0.7;
  cursor: not-allowed;
`;

export const NameTag = styled(Tag)`
  margin-left: 8px;
`;

export const TooltipWrapper = styled.div`
  font-weight: 600;
`;
