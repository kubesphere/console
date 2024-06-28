import styled from 'styled-components';

export const ItemsWrapper = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const ItemWrapper = styled.div`
  display: flex;
  padding: 12px;
  margin-bottom: 8px;
  background-color: #ffffff;
  border: solid 1px ${({ theme }) => theme.palette.border};
  border-radius: 4px;
`;
