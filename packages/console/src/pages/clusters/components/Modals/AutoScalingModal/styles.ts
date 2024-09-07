/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

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
