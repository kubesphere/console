import styled from 'styled-components';

export const Content = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.background};
`;

export const Item = styled.div`
  display: flex;
  padding: 12px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.palette.background};
  border: solid 1px ${({ theme }) => theme.palette.border};
  border-radius: 4px;

  &:last-child {
    margin-bottom: 0;
  }

  & > div {
    margin-right: 12px;
    min-width: 20%;

    &:first-child {
      min-width: 35%;
    }
  }
`;

export const EmptyTips = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.palette.accents_4};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border-radius: 4px;
`;
