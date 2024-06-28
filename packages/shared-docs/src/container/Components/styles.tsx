import styled from 'styled-components';

export const MainContent = styled.div`
  display: flex;
  position: relative;
`;

export const Content = styled.div`
  width: calc(100% - 100px);
  padding-right: 10px;

  p,
  ul {
    font-size: 14px;
    line-height: 26px;
    color: ${({ theme }) => theme.palette.accents_7};
    -webkit-font-smoothing: antialiased;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    a {
      color: ${({ theme }) => theme.palette.accents_8};
    }
  }
  h2 {
    margin-top: 40px;
    &:first-of-type {
      margin-top: 10px;
    }
  }
  h3 {
    margin-top: 20px;
  }
`;
