import styled from 'styled-components';

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const KubeConfigWrapper = styled.div`
  overflow-y: auto;
  flex: 1;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_8};
`;

export const TipsWrapper = styled.div`
  padding: 12px;
`;
