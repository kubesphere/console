import styled from 'styled-components';
import { Card, Field } from '@kubed/components';

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 360px;
  background-color: #fff;
`;

export const TableWrapper = styled(Card)`
  position: relative;

  & > div {
    padding: 0;
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
