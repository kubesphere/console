import styled from 'styled-components';
import { Form, Textarea } from '@kubed/components';

export const StyledForm = styled(Form)`
  padding: 20px;
`;

export const StyledTextarea = styled(Textarea)`
  &&& {
    max-width: none;
  }

  textarea {
    height: 382px;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 12px;
    line-height: 1.4;
  }
`;
