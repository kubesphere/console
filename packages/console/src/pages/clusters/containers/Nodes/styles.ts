import styled from 'styled-components';
import { Row, Entity, Field, Col } from '@kubed/components';

export const FullRow = styled(Row)`
  width: 100%;
`;
export const FullCol = styled(Col)`
  margin: 0;
`;
export const StyledEntity = styled(Entity)`
  padding: 0;
`;
export const StyledField = styled(Field)`
  align-items: flex-start;
  .field-label {
    white-space: break-spaces;
  }
`;
export const FieldLabel = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  font-weight: 400;
  color: #79879c;
  max-width: 300px;
`;

export const Resource = styled.div`
  & > span {
    display: inline-block;
    vertical-align: middle;
  }
  .kubed-icon-dark {
    color: #fff;
    fill: #ea4641;
  }
`;
export const Taints = styled.span`
  display: inline-block;
  min-width: 20px;
  height: 20px;
  margin-left: 8px;
  padding: 0 6px;
  line-height: 20px;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);
  background-color: #181d28;
  text-align: center;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  &:hover {
    box-shadow: none;
  }
`;
