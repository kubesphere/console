/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

const IconsWrapper = styled.div`
  position: relative;
`;

const TooltipTitle = styled.div`
  margin-top: 10px;
  font-weight: 600;
`;

const FedManagedIcon = styled.img`
  position: absolute;
  bottom: 6px;
  right: 0;
  cursor: pointer;
`;

export { IconsWrapper, TooltipTitle, FedManagedIcon };
