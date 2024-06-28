import styled from 'styled-components';
import { FormItem, Form } from '@kubed/components';

const Loading = styled.div`
  div {
    bottom: 24px;
    height: 570px;
  }
`;

const StyledFormItem = styled(FormItem)`
  label {
    height: 24px;
  }
`;

const StyledForm = styled(Form)`
  padding: 20px;
`;

export { Loading, StyledFormItem, StyledForm };
