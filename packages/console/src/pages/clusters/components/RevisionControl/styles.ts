/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

const YamlHeader = styled.div`
  display: flex;
  padding: 0 8px;

  & > div {
    margin-right: 20px;
    min-width: 120px;
  }
`;

const DiffWrapper = styled.div`
  padding: 12px;
  margin-top: 12px;
  background-color: ${props => props.theme.palette.accents_0};
`;

export { YamlHeader, DiffWrapper };
