import styled from 'styled-components';
import { Field, Row, Select } from '@kubed/components';

import { PlacementItemWrapper } from '../styles';

const FormWrapper = styled(PlacementItemWrapper)`
  width: 100%;
`;

const BorderRow = styled(Row)`
  border-radius: 4px 4px 0 0;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.palette.accents_5};
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);
`;

const PlacementConfirm = styled.div`
  & > div {
    position: static;
    margin: 0;
    border-radius: 0 0 4px 4px;
  }
`;

const Option = Select.Option;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const StyledField = styled(Field)`
  height: 100%;

  .field-value {
    color: #ffffff;
  }
`;

export { Option, BorderRow, FormWrapper, StyledField, OptionWrapper, PlacementConfirm };
