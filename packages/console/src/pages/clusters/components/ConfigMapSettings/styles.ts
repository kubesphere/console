/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

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
    .type-select {
      &.kubed-select-disabled {
        cursor: not-allowed;
        opacity: 0.5;
        cursor: not-allowed;
        .kubed-select-selector {
          background-color: #eff4f9;
        }
      }
    }
  }
`;

export const DefaultWrapper = styled.div`
  + .wrapper {
    margin-top: 12px;
  }

  :global {
    .input,
    .textarea {
      width: 100%;
      max-width: 455px;
    }
  }

  display: block;
  margin-bottom: 4px;
  line-height: 20px;
  color: $text-color;

  .label {
    display: block;
    margin-bottom: 4px;
    line-height: 20px;
    color: #242e42;
  }

  .control {
    position: relative;
  }

  .desc {
    margin-top: 4px;
    color: $second-text-color;
  }

  .requiredIcon {
    color: #ca2621;
    margin: 0 6px;
  }
`;

export const PasswordItem = styled.div`
  display: flex;

  :global {
    .input-password {
      flex: 1;
    }
  }

  input {
    border-radius: 4px 0 0 4px;
  }

  button {
    height: 34px;
    width: 72px;
    margin-left: -1px;
    border-radius: 0 4px 4px 0;
    border-color: #abb4be;
  }
`;

export const Tip = styled.div`
  position: relative;

  button {
    @include vertical-center;
    right: 12px;
  }
`;

export const ImagerWrapper = styled.div`
  .hidden-input {
    display: none;
  }
  .columns {
    margin-left: -0.75rem;
    margin-right: -0.75rem;
    margin-top: -0.75rem;
    &:not(:last-child) {
      margin-bottom: 0.75rem;
    }
  }
  .column {
    display: block;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    padding: 0.75rem;
  }
`;
