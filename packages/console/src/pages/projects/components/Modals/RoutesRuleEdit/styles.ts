import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 20px;
  background-color: #eff4f9;

  & > button:last-of-type {
    margin-left: 12px;
  }
`;
