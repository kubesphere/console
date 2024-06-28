import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Title = styled.div<{ isOpen?: boolean }>`
  display: flex;
  padding: 12px;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.palette.colors.white[3]};
  background-color: #fff;
  cursor: pointer;
  ${({ isOpen, theme }) =>
    isOpen &&
    `
  margin: 0 -6px;
  padding: 12px 16px;
  background-color: ${theme.palette.colors.dark[3]};
  border-color: ${theme.palette.colors.dark[3]};
  z-index: 1;

  & > div > div {
    & > div,
    & > p {
      color: #fff !important;
    }
  }

  .kubed-icon {
    color: hsla(0, 0%, 100%, 0.9);
    fill: hsla(0, 0%, 100%, 0.4);
  }
  `}
`;

export const Content = styled.div<{ visible?: boolean }>`
  position: absolute;
  width: 100%;
  padding: 12px;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 8px 0 rgba(121, 135, 156, 0.2);
  border: solid 1px ${({ theme }) => theme.palette.accents_5};
  border-top-color: ${({ theme }) => theme.palette.colors.white[3]};
  background-color: #fff;
  opacity: 0;
  z-index: -1;

  ${({ visible }) =>
    visible &&
    `
    position: relative;
    opacity: 1;
    z-index: 0;`}
`;

export const LogsContainer = styled.div`
  height: 400px;
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.colors.dark[3]};
  font-family: 'Monaco', sans-serif;
  line-height: 2;
  color: ${({ theme }) => theme.palette.colors.white[1]};
  overflow: auto;
`;
