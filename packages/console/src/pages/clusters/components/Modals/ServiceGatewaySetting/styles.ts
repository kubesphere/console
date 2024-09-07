/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled, { css } from 'styled-components';

export const BodyWrapper = styled.div`
  padding: 20px;
`;

export const TitleWrapper = styled.div`
  width: 691px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 32px;

  h4 {
    font-size: 20px;
    margin-bottom: 12px;
    line-height: 1.4;
    text-shadow: 0 4px 8px rgba(36, 46, 66, 0.1);
  }

  p {
    color: #5f708a;
  }
`;

export const Container = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const ContentWrapper = styled.div`
  height: 376px;
  overflow: auto;
  padding: 20px;
  border-radius: 4px;
  background-color: #ffffff;
  border: solid 1px ${({ theme }) => theme.palette.accents_2};
`;

export const OptionWrapper = styled.div`
  overflow: hidden;

  & > div {
    font-size: ${({ theme }) => theme.font.fontSizeBase};
    line-height: 1.67;
    font-family: Roboto, ${({ theme }) => theme.font.mono};
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    font-weight: bold;
    color: #fff;
  }

  & > p {
    font-family: Roboto, ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.font.fontSizeBase};
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.67;
    letter-spacing: normal;
    color: ${({ theme }) => theme.palette.accents_5};
    margin: 0px;
  }
`;

export const ProviderOption = styled.div<{ disabled?: boolean }>`
  display: flex;

  .text {
    display: inline-block;
    flex: 1;
  }
  svg {
    margin-right: 8px;
  }
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`;

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 20px;
  background-color: #eff4f9;

  & > button:last-of-type {
    margin-left: 12px;
  }
`;
