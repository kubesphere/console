/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Card, Field } from '@kubed/components';

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 360px;
  background-color: #fff;
`;

export const StyledCard = styled(Card)`
  .kube-table-wrapper {
    td.table-cell {
      .field-label {
        -webkit-line-clamp: 1;
        line-clamp: 1;
      }
    }
  }
`;

export const ExtensionField = styled(Field)`
  max-width: 800px;

  .field-content {
    flex: 1;
  }
`;

export const Icon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: scale-down;
  object-position: center;
`;
