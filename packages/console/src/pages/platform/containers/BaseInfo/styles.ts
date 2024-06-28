import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: ${({ theme }) => theme.palette.colors.blue[3]};
    font-weight: 600;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  margin: 12px -12px 0 -12px;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 88px;
  margin-right: 20px;
  border-radius: 2px;
  border: dashed 1px #d8dee5;
  background-color: ${({ theme }) => theme.palette.background};

  img {
    width: 282px;
    height: 60px;
  }
`;

export const Details = styled.div`
  flex: 1;
  & > div + div {
    margin-top: 8px;
  }
`;
