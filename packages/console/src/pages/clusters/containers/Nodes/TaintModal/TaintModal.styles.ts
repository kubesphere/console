import styled from 'styled-components';
import { Input, Select, Button } from '@kubed/components';

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 17px;
  border-radius: 60px;
  border: 1px solid rgb(204, 211, 219);
  & + & {
    margin-top: 8px;
  }
`;
export const Action = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
`;

export const StyledInput = styled(Input)`
  width: 240px;
  margin-right: 8px;
`;

export const SelectWrapper = styled.div`
  position: relative;
`;
export const Tips = styled.div`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 32px;
`;
export const StyledSelect = styled(Select)`
  width: 240px;
`;

export const DeleteButton = styled(Button)`
  flex-shrink: 0;
  width: 50px;
  padding: 0 !important;
`;
