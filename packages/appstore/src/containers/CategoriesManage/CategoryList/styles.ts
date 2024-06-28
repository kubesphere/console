import styled from 'styled-components';

export const CategoriesWrapper = styled.div`
  flex: 1;
  padding: 12px 20px 12px 12px;

  .active {
    background-color: ${({ theme }) => theme.palette.accents_1};
  }

  .noneAction {
  }
`;

export const Category = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 8px;
  line-height: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.accents_1};

    .total_count {
      display: none;
    }

    .actions {
      display: flex;
    }
  }
`;

export const Others = styled.div`
  flex: 1;
  text-align: right;
  z-index: 1;
`;

export const Actions = styled.div`
  display: none;
  flex-direction: row-reverse;
  align-items: center;
  gap: 8px;
  line-height: 16px;
`;
