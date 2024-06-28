import styled from 'styled-components';
import { Form } from '@kubed/components';

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
