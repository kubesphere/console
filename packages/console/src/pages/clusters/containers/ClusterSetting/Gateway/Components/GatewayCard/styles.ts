/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Dropdown, Menu } from '@kubed/components';
import styled, { css } from 'styled-components';

const TypographyParagraph = css`
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
`;

export const Container = styled.div`
  display: flex;
  & + div {
    > div {
      background: ${({ theme }) => theme.palette.colors.white[0]};
    }
  }
`;

export const Item = styled.div`
  flex: 1;
  margin-right: 12px;
  padding: 12px;
  align-items: center;

  & > div {
    ${TypographyParagraph};
    color: ${({ theme }) => theme.palette.accents_8};
    font-weight: bold;
  }
  & > p {
    ${TypographyParagraph};
    color: ${({ theme }) => theme.palette.accents_5};
    margin: 0;
  }

  &:last-child {
    flex: 2;
    margin-right: 0;
    padding-right: 0;
  }
`;

export const Header = styled.div`
  display: flex;
  margin-right: 12px;
  padding: 12px;
  flex: 1;
  border-radius: 4px;
  align-items: center;
  .kubed-icon {
    margin-right: 12px;
  }
  > div {
    padding: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const CustomIcon = styled.span`
  width: 40px;
  height: 40px;
  padding-top: 5px;
  img {
    width: 40px;
    height: 30px;
  }
`;

export const Annotations = styled.div`
  margin-top: 12px;
  border-radius: 4px;
  padding: 12px;
  background: ${({ theme }) => theme.palette.accents_0};

  & > p {
    font-size: 12px;
    font-weight: 600;
    line-height: 1.43;
    margin: 0;
  }

  & > ul {
    margin-top: 8px;

    & > li {
      height: 44px;
      padding: 12px 32px;
      border-radius: 60px;
      background-color: ${({ theme }) => theme.palette.accents_1};
      border: solid 1px ${({ theme }) => theme.palette.border};
      font-family: ${({ theme }) => theme.font.sans};
      display: flex;

      & + li {
        margin-top: 8px;
      }

      & > span {
        display: inline-block;
        flex: 1;
        ${TypographyParagraph};
        color: ${({ theme }) => theme.palette.accents_5};

        & + span {
          margin-left: 20px;
          ${TypographyParagraph};
          color: ${({ theme }) => theme.palette.accents_8};
        }
      }
    }
  }
`;

export const DarkDropDown = styled(Dropdown)`
  &.tippy-box {
    background-color: ${({ theme }) => theme.palette.colors.dark[3]};
    box-shadow: inset 0 4px 8px 0 rgb(36 46 66 / 12%);
  }
`;

export const DarkMenu = styled(Menu)`
  color: #ffffff;
  background-color: ${({ theme }) => theme.palette.colors.dark[3]};

  .item-label {
    color: #ffffff;
  }

  button {
    &:hover {
      background-color: ${({ theme }) => theme.palette.colors.dark[2]};
    }
  }
`;
