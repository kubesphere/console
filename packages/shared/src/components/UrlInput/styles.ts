import styled from 'styled-components';

export const UrlItem = styled.div`
  margin-bottom: 12px;
`;

export const Label = styled.label`
  display: inline-block;
  height: 32px;
  line-height: 32px;
`;

export const Help = styled.div`
  margin-top: 4px;
  font-weight: 300;
  line-height: 20px;
  color: #657d95;
`;

export const Horizon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InputWrapper = styled(Horizon)`
  flex: 1;
  max-width: 455px;

  .input-wrapper {
    flex: 1;
  }
`;

export const AccessItem = styled(Horizon)`
  margin-bottom: 12px;

  button {
    margin-top: 32px;
  }
`;

export const ErrorLi = styled.div`
  color: #ca2621;
  margin-top: 5px;
`;
