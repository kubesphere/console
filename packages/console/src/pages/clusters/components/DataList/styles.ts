/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Form, Row, Col, Modal } from '@kubed/components';

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

export const Wrapper = styled.div`
  border-radius: 4px;
  padding: 12px;
  background-color: ${props => props.theme.palette.accents_0};
`;

export const List = styled.div``;
