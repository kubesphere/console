/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

const Content = styled.div`
  padding: 8px;
  border-radius: 4px;
  background-color: ${props => props.theme.palette.accents_0};
`;

const StyledTable = styled.table`
  width: 100%;

  tr {
    border-bottom: 4px solid ${props => props.theme.palette.accents_0};
  }

  th,
  td {
    text-align: start;
    width: 25%;
    line-height: 20px;
  }

  th {
    padding: 4px 0 8px 20px;
    color: ${props => props.theme.palette.accents_5};
  }

  td {
    padding: 8px 0 8px 20px;
    background-color: #ffffff;
  }
`;

export { Content, StyledTable };
