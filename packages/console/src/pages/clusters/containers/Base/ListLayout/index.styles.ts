/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  & > span {
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
