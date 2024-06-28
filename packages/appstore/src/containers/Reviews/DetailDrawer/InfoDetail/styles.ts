import styled from 'styled-components';
import { Field } from '@kubed/components';

export const StyledField = styled(Field)`
  display: flex;
  align-items: unset;
  gap: 8px;

  .mb8 {
    margin-bottom: 8px;
  }

  .field-content {
    flex-grow: 1;
  }

  .field-value {
    display: flex;
  }

  .field-label {
    font-weight: normal;
  }
`;

export const PreField = styled(Field)`
  .field-value {
    pre {
      font-weight: normal;
      margin: 0;
    }
  }
`;
