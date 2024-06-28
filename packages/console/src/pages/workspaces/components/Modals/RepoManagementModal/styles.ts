import styled from 'styled-components';
import { Form } from '@kubed/components';

export const StyledForm = styled(Form)`
  padding: 20px;

  .form-item {
    .input-wrapper,
    .kubed-select,
    .time-input {
      width: 100%;
      max-width: 455px;
    }

    .time-input {
      .input-wrapper {
        width: 336px;
      }
    }

    .kubed-select {
      width: 110px;

      .kubed-select-selector {
        height: 34px;

        .kubed-select-selection-search {
          input {
            height: 34px;
          }
        }
      }
    }
  }
`;
