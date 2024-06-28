import styled from 'styled-components';
import { Button } from '@kubed/components';

export const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border-width: 0;
  background-color: transparent;

  &:disabled {
    opacity: 0.6;
  }
`;
