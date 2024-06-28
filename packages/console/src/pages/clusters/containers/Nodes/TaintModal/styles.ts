import styled from 'styled-components';
import { Form } from '@kubed/components';

export const Wrapper = styled.div`
  padding: 0 95px;
`;
export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 12px;
`;
export const StyledForm = styled(Form)`
  padding: 20px;
  .form-item {
    .input-wrapper,
    .kubed-select {
      width: 100%;
      max-width: 455px;
    }
  }
`;
export const Content = styled.div`
  margin-top: 12px;
  max-height: calc(100vh - 320px);
  min-height: 400px;
  padding: 20px;
  border-radius: 4px;
  background-color: #f9fbfd;
  overflow-x: hidden;
  overflow-y: auto;
`;
export const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  margin-bottom: 12px;
`;
