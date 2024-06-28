import styled from 'styled-components';

import { Wrapper } from '../styles';

export const EmailWrapper = styled(Wrapper)`
  .receiver {
    .form-item-wrapper {
      margin-bottom: 0;
    }
  }

  .base-mail {
    & > .form-item-wrapper {
      &:nth-child(2) {
        margin-bottom: 0;
      }
    }
  }
`;
