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

const BannerWrapper = styled.div`
  margin-bottom: 12px;
`;

const TextWrapper = styled.div`
  flex: 1;

  div {
    &:first-child {
    }
    &:last-child {
    }
  }
`;

export { ProjectWrapper, BannerWrapper, TextWrapper };
