/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Entity } from '@kubed/components';
import { Information } from '@kubed/icons';

export const StyledEntity = styled(Entity)`
  .entity-footer {
    padding: 12px;
    background-color: ${({ theme }) => theme.palette.colors.red[0]};
    color: ${({ theme }) => theme.palette.colors.red[4]};
  }
`;

export const DependencyIcon = styled.img`
  max-width: 40px;
  height: 40px;
`;

export const ExtensionNotExistsNameWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

export const InfoIcon = styled(Information)`
  cursor: pointer;
`;

export const Tip = styled.p`
  margin: 0;
`;
