import styled from 'styled-components';

export const Main = styled.div<{ $headerHight: number }>`
  padding-top: ${({ $headerHight }) => $headerHight}px;
  min-width: 1164px;
  height: 100%;
`;
