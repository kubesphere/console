/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Field } from '@kubed/components';
import ImgIconUpload from '../../../ImgIconUpload';

export const StyledField = styled(Field)`
  .field-value {
    font-weight: normal;
    color: ${({ theme }) => theme.palette.accents_5};
  }

  .field-avatar {
    margin-right: 20px;
  }
`;

export const AppIconUpload = styled(ImgIconUpload)`
  border: none;
  padding: 12px 0 0 0;
`;
