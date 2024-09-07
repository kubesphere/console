/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { TypeSelect } from '@kubed/components';

export const StyledTypeSelect = styled(TypeSelect)`
  margin-bottom: 20px;

  & > div:first-of-type,
  &.is-expand > div:last-of-type > div {
    padding-right: 12px;

    & > div {
      flex-direction: row-reverse;
    }
  }

  .field-avatar {
    margin-right: 24px;
    margin-left: 12px;
  }

  .field-content {
    flex: 1;
  }

  .field-value {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
