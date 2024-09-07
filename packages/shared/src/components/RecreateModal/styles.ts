/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

const RecreateWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  padding: 20px;

  svg {
    margin-right: 12px;
    fill: #329dce;
    color: #fff;
  }

  p {
    margin: 0px;
  }
`;

const RecreateText = styled.div`
  div {
    font-family: ${props => props.theme.font.sans};
    font-size: ${props => props.theme.font.fontSizeBase};
    color: ${props => props.theme.palette.accents_8};
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    font-weight: bold;
    line-height: 1.67;
  }

  p {
    font-family: ${props => `Roboto,${props.theme.font.sans}`};
    font-size: ${props => props.theme.font.fontSizeBase};
    color: ${props => props.theme.palette.accents_5};
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.67;
    letter-spacing: normal;
  }
`;

export { RecreateWrapper, RecreateText };
