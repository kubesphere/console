/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled, { css } from 'styled-components';

interface IProps {
  clickable?: boolean;
  ellipsis?: boolean;
}

const Wrapper = styled.div<IProps>`
  position: relative;
  display: flex;

  ${props => props.clickable && `cursor: pointer;`}
  ${props => props.ellipsis && `flex: 1; overflow: hidden;`}
`;

const Ellipsis = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
`;

const StyledText = styled.div<IProps>`
  flex: 1;
  ${props => props.ellipsis && `flex: 1; overflow: hidden;`}
  ${props =>
    props.clickable &&
    `&:hover {
      & > div {
        color: ${props.theme.palette.colors.green[2]} !important;
      }
    }`}

  & > div:first-child {
    font-size: ${props => props.theme.font.fontSizeBase};
    line-height: 1.67;
    color: ${props => props.theme.palette.accents_8};
    font-family: Roboto, ${props => props.theme.font.sans};
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    font-weight: bold;

    ${props => props.ellipsis && `${Ellipsis}`}
  }

  & > div:last-child {
    font-family: Roboto, ${props => props.theme.font.sans};
    font-size: ${props => props.theme.font.fontSizeBase};
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.67;
    letter-spacing: normal;
    color: ${props => props.theme.palette.accents_5};

    ${props => props.ellipsis && `${Ellipsis}`}
  }
`;

export { Wrapper, StyledText };
