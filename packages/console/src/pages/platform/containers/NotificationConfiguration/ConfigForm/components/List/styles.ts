import styled from 'styled-components';

export const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border: solid 1px ${({ theme }) => theme.palette.accents_3};
  transition: all 0.3s ease-in-out;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    border-color: ${({ theme }) => theme.palette.accents_5};
    box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);

    .btns {
      display: block;
    }
  }
`;

export const ItemContent = styled.div`
  display: flex;
  overflow: hidden;
  flex: 1;
`;

export const ItemText = styled.div`
  min-width: 160px;
  padding-right: 20px;

  &:first-of-type {
    min-width: 200px;
  }
`;

export const OperationsWrapper = styled.div`
  display: none;
`;

export const ListWrapper = styled.div`
  .ellipisis {
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
  }
`;
