import styled from 'styled-components';

export const Horizon = styled.div`
  display: flex;
  justify-items: center;
`;

export const Content = styled(Horizon)`
  padding: 20px;
  margin: 12px -12px 0;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;
