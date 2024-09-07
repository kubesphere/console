/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const TitleWithIconStyle = styled.div`
  display: flex;
  align-items: center;
  .kubed-icon {
    margin-left: 6px;
  }
`;

export const ProjectWrapper = styled.div`
  width: 250px;
  margin-right: 12px;

  & > .kubed-select {
    width: 100%;
  }
`;
