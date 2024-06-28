import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  max-width: 1440px;
  padding: 20px;
  min-height: calc(100vh - 108px);
  margin: 0 auto;
`;

export const QuickAccess = styled.div`
  padding: 12px;
  border-radius: 3px;
  border: 1px dashed ${({ theme }) => theme.palette.border};
  background-color: #fff;
  & > div {
    display: flex;
    justify-content: center;
  }
`;
