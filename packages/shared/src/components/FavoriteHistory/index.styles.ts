/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div<{ hasPadding?: boolean }>`
  display: flex;
  align-items: center;
  ${props =>
    props.hasPadding &&
    `
      padding: 0 20px;
    `}
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  display: inline-block;
  width: 16px;
  height: 16px;
`;
