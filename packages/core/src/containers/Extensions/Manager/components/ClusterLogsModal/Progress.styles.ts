import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  height: 6px;
`;

export const Item = styled.div`
  flex: 1;
  height: 100%;
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.accents_1};
`;
