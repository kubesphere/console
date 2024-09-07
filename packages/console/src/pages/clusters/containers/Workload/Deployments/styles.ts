/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

const ProjectWrapper = styled.div`
  width: 250px;
  margin-right: 12px;

  & > .kubed-select {
    width: 100%;
  }
`;

const RecreateWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  padding: 20px;

  svg {
    margin-right: 12px;
  }

  p {
    margin: 0px;
  }
`;

const RecreateText = styled.div``;
export { ProjectWrapper, RecreateWrapper, RecreateText };
