/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

const ContentBody = styled.div`
  padding: 12px;

  .h5 {
    display: flex;
    align-items: center;
    font-size: ${props => props.theme.font.fontSizeBase};
    font-weight: bold;
    line-height: 20px;
    color: ${props => props.theme.palette.accents_7};

    svg {
      margin-right: 8px;
      border-radius: 50%;
      box-shadow: 0 4px 8px 0 rgba(202, 38, 33, 0.2);
      background-color: ${props => props.theme.palette.error};
    }
  }
`;

const Content = styled.div`
  position: relative;
  margin-top: 12px;
  padding: 12px;
  border-radius: 4px;
  background-color: ${props => props.theme.palette.accents_0};

  p {
    font-size: 12px;
    line-height: 1.67;
    color: ${props => props.theme.palette.accents_6};
    word-break: normal;
  }
`;

const Footer = styled.div`
  padding: 10px 20px;
  border-radius: 0 0 4px 4px;
  background-color: ${props => props.theme.palette.accents_1};
  text-align: right;

  button {
    margin-left: 10px;
    &:first-of-type {
      margin-left: 0;
    }
  }
`;

export { Content, ContentBody, Footer };
