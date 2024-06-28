import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  height: auto;
  border-collapse: separate;
  border-spacing: 0;

  th {
    padding: 0 8px;
    vertical-align: middle;
    height: 40px;
    color: ${({ theme }) => theme.palette.accents_7};
    background-color: ${({ theme }) => theme.palette.accents_1};
    border-radius: 0;
    border-top: 1px solid ${({ theme }) => theme.palette.border};
    border-bottom: 1px solid ${({ theme }) => theme.palette.border};

    &:nth-child(1) {
      border: 1px solid ${({ theme }) => theme.palette.border};
      border-right-width: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      border: 1px solid ${({ theme }) => theme.palette.border};
      border-left-width: 0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  thead {
    tr {
      text-align: left;
    }
  }

  tbody {
    tr {
      transition: background-color 0.25s ease;
      &:hover {
        background-color: ${({ theme }) => theme.palette.accents_1};
      }
    }
    td {
      padding: 0 8px;
      border-bottom: 1px solid ${({ theme }) => theme.palette.border};
      height: 45px;
      .flex {
        display: flex;
      }
    }
  }
`;
