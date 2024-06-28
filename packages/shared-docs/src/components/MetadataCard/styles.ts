import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 40px 0;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  //background-color: ${({ theme }) => theme.palette.accents_1};

  h1 {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.accents_7};
  }
`;

export const Desc = styled.div`
  color: ${({ theme }) => theme.palette.accents_6};
`;

export const List = styled.div`
  margin-top: 20px;

  dl {
    display: flex;
    align-items: center;
    margin: 2px 0;
  }

  dt {
    width: 60px;
    height: 30px;
    line-height: 30px;
    color: ${({ theme }) => theme.palette.accents_6};
  }

  dd {
    height: 30px;
    line-height: 30px;
    color: ${({ theme }) => theme.palette.accents_8};

    .token-line {
      padding-left: 0;
      line-height: 30px;
    }
  }

  .import-code {
    cursor: pointer;
  }
`;
