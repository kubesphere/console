import styled from 'styled-components';
import { themeUtils } from '@kubed/components';

export const LinkButton = styled.span`
  color: ${({ theme }) => themeUtils.getColor('blue', theme)};
  padding: 0 4px;
  cursor: pointer;
  font-weight: 600;
`;
