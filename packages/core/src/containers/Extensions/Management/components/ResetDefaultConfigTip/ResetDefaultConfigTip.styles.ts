/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Alert, Button } from '@kubed/components';
import { Information } from '@kubed/icons';

export const StyledAlert = styled(Alert)<{ $marginBottom: number }>`
  margin-bottom: ${({ $marginBottom }) => $marginBottom}px;

  & > span:first-child {
    align-self: unset;
    margin-right: 4px;
  }

  & > div:last-child {
    flex: 1;
  }

  svg.kubed-icon {
    color: ${({ theme }) => theme.palette.colors.blue[0]};
    fill: ${({ theme }) => theme.palette.colors.blue[4]};
  }
`;

export const Container = styled.div`
  display: flex;
  column-gap: 20px;
`;

export const Description = styled.p`
  flex: 1;
  margin: 0;
  font-size: 12px;
`;

export const StyledButton = styled(Button).attrs({ variant: 'link' })`
  height: auto;
  border-radius: 0;

  &:hover {
    text-decoration: none;
  }

  &:active {
    opacity: 0.7;
  }

  span {
    font-weight: 600;
    color: ${({ theme }) => theme.palette.colors.blue[4]};
  }
`;
