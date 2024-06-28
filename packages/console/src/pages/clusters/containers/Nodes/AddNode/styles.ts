import styled from 'styled-components';
import { Form, Col } from '@kubed/components';

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
export const StyleCol = styled(Col)`
  margin: 0;
  &:last-of-type {
    margin-left: calc(16px / 2);
  }
`;
export const FormItemWapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0;
  .kubed-select {
    width: 100%;
    max-width: 455px;
  }
`;
export const LabelWapper = styled.div`
  position: relative;
  height: 32px;
  display: inline-flex;
  align-items: center;
  color: #242e42;
`;
export const HelpWapper = styled.div`
  margin-top: 4px;
  line-height: 1.67;
  color: #79879c;
`;
