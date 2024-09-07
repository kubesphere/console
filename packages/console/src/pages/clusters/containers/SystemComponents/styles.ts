/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Card, Col, Entity, Field, Row } from '@kubed/components';
import styled from 'styled-components';

export const WithLabelWrapper = styled.div`
  .nav-item {
    padding-right: 25px;
    box-sizing: content-box;

    .badge {
      position: absolute;
      right: 4px;
      top: 4px;
    }
  }
`;

export const CardsWrapper = styled.div`
  margin-bottom: 20px;
`;

export const CardIcon = styled.img`
  height: 20px;
  margin-bottom: 12px;
`;

export const StyledField = styled(Field)`
  align-items: flex-start;
  .field-label {
    white-space: break-spaces;
  }
`;

export const FullRow = styled(Row)`
  width: 100%;
`;

export const FullCol = styled(Col)`
  display: flex;
`;

export const CardWrapper = styled(Card)`
  :not(:first-child) {
    margin-top: 8px;
  }
`;

export const StyledEntity = styled(Entity)`
  padding: 0;
`;
