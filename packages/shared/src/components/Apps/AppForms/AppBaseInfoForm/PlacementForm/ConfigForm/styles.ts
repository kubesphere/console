import styled from 'styled-components';
import { Form } from '@kubed/components';

const StyledForm = styled(Form)`
  padding-top: 0;

  .form-item-wrapper {
    margin-bottom: 0;
  }
`;

const PlacementItemWrapper = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export { StyledForm, PlacementItemWrapper };
