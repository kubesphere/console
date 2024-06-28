import styled from 'styled-components';
import { Button } from '@kubed/components';

export const StyledButton = styled(Button).attrs({
  color: 'secondary',
  shadow: true,
})`
  min-width: 96px;
`;
