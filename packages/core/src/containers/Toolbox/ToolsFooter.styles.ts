import styled from 'styled-components';

import { Text } from './Tools.shared.styles';

export const Footer = styled.div`
  padding: 10px 12px;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const Tips = styled(Text)`
  color: ${({ theme }) => theme.palette.accents_5};
`;
