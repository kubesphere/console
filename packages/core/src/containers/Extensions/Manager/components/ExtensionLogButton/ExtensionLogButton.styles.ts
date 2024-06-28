import styled from 'styled-components';

import { Button } from '@kubed/components';
import { Information } from '@kubed/icons';

const SIZE = 16;

export const StyledButton = styled(Button).attrs({ variant: 'text' })`
  width: ${SIZE}px;
  height: ${SIZE}px;
  padding: 0;
  border: 0;

  &:hover {
    background-color: inherit;
  }
`;

export const Icon = styled(Information).attrs({ size: SIZE })``;
