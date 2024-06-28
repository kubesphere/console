import styled from 'styled-components';

import { Entity, Field } from '@kubed/components';

export const StyledEntity = styled(Entity)`
  cursor: pointer;

  .entity-main {
    padding: 0 12px;
  }
  & .favorite-action {
    visibility: hidden;
  }
  &:hover .favorite-action {
    visibility: visible;
  }
`;

export const StyledField = styled(Field)`
  flex: unset;
  min-width: 160px;

  &.field-main-title {
    flex: 1;
    min-width: 200px;
    width: auto;
  }
`;
