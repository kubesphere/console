import styled from 'styled-components';

export const MainSection = styled.div`
  min-height: calc(100vh - 90px);
  width: ${props => props.theme.layout.pageWidthWithMargin};
  padding: 0 ${props => props.theme.layout.pageMargin} 0;
  margin: 0 auto;
  height: 100%;
  display: flex;
`;

export const SideBar = styled.div`
  position: fixed;
  top: 68px;
  bottom: 0;
  width: 200px;
  padding-right: 20px;
  padding-left: 20px;
  margin-left: -20px;
  border-right: 1px solid ${({ theme }) => theme.palette.accents_2};
  z-index: 100;
  font-family: ProximaNova, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  &::-webkit-scrollbar {
    width: 0;
  }
  overflow-y: scroll;
`;

export const SideBarInner = styled('div')<React.ComponentPropsWithoutRef<any>>`
  margin-top: ${({ isScroll }) => (isScroll ? '0px' : '35px')};
  transition: margin-top 0.3s 0.1s;
`;

export const SideShadow = styled.div`
  width: 200px;
  flex-shrink: 0;
`;

export const MainContent = styled.div`
  width: 100%;
  padding-left: 30px;
  padding-bottom: 50px;
`;
