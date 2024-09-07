/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Empty } from '@kubed/components';

export const Wrapper = styled.div`
  padding: 20px;
`;

export const StyledEmpty = styled(Empty)`
  padding: 32px 0 136px;
  background-color: #fff;
`;

export const EmptyButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding-top: 20px;
`;
