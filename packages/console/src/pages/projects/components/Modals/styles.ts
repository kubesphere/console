/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Col, Form } from '@kubed/components';
import { CodeEditor } from '@kubed/code-editor';

export const Label = styled.div`
  margin-bottom: 4px;
  color: ${({ theme }) => theme.palette.accents_7};
`;

export const ReadOnlyCodeEditor = styled(CodeEditor)`
  opacity: 0.8;
`;

export const StyledCol = styled(Col)`
  .input-item {
    width: 100%;
    max-width: 455px;
  }
`;

export const EditForm = styled(Form)`
  padding: 20px;

  .form-item {
    .input-wrapper {
      width: 100%;
      max-width: 455px;
    }
  }
`;

export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
