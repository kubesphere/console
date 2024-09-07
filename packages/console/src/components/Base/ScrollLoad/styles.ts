/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Empty } from '@kubed/components';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const Main = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const LoadMore = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 32px;
  margin-top: 12px;
`;

export const StyledEmpty = styled(Empty)`
  & > div:first-of-type {
    height: auto;
  }
`;
