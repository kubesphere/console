/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const HeaderStyle = styled.div`
  margin-top: 12px;
  margin-bottom: 20px;

  & > div + div {
    margin-left: 40px;
  }
`;

export const DescriptionStyled = styled.div`
  display: inline-block;
  margin-left: 26px;
  vertical-align: top;
  padding: 14px;
  h3 {
    font-weight: bold;
    font-size: 24px;
    line-height: 1.33;
    color: #36435c;

    small {
      margin-left: 0.5em;
      line-height: 1.67;
      font-size: 12px;
      font-weight: bold;
    }
  }
  p {
    color: #79879c;
    margin: 0;
  }
`;

export const CardStyled = styled.div`
  display: inline-block;
  width: 123px;
  height: 80px;
`;

export const ChartContainerStyle = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_8};
`;
