import styled from 'styled-components';
import { Field } from '@kubed/components';

export const Item = styled.div`
  display: flex;
  padding: 12px;
  &:not(:first-child) {
    margin-top: 8px;
  }
`;

export const StyledField = styled(Field)`
  margin-right: 12px;
  width: 30%;
  max-width: 120px;
`;

export const PieWrapper = styled.div`
  width: 48px;
  height: 48px;
  margin: -4px;
  margin-right: 12px;
`;
