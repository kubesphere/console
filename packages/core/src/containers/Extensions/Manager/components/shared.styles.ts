import styled from 'styled-components';

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StepContentTitle = styled.h6`
  margin: 0;
  padding-bottom: 8px;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const StepContentInnerWrapper = styled.div`
  padding: 12px;
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.accents_0};
`;
