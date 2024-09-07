/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const TypographyParagraph = css`
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
`;

const Area = css`
  position: relative;
  padding: 12px 20px;
  border-radius: 4px;
  background-color: #f9fbfd;
  .icon {
    position: absolute;
    top: 12px;
    left: 20px;
    width: 40px;
    height: 40px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &.large {
    padding: 20px;

    .icon {
      top: 20px;
    }
  }
`;

export const Wrapper = styled.div`
  ${Area}
`;

export const Text = styled.div`
  padding-left: 60px;
  min-height: 40px;
  & > div {
    ${TypographyParagraph};
    color: ${({ theme }) => theme.palette.accents_8};
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
  }
  & > p {
    ${TypographyParagraph};
    color: ${({ theme }) => theme.palette.accents_5};
    margin: 0;
    max-height: 40px;
    word-break: break-all;
    overflow: hidden;
  }
`;

export const LinkNode = styled(Link)`
  ${Area}
  display: block;
  width: 100%;
  cursor: pointer;
  transition: all $trans-speed cubic-bezier(0.175, 0.35, 0.32, 1);

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(36, 46, 66, 0.08);
  }
`;
