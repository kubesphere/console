/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ValuesStyle = styled.ul`
  & > li {
    padding: 12px 32px;
    border-radius: 60px;
    background-color: #eff4f9;
    border: solid 1px #ccd3db;

    & + li {
      margin-top: 8px;
    }
  }

  span {
    display: inline-block;
    vertical-align: middle;
    word-break: break-word;

    & + span {
      margin-left: 75px;
    }
  }
`;

export const TitleStyle = styled.span`
  width: 317px;
  color: #79879c;
`;
