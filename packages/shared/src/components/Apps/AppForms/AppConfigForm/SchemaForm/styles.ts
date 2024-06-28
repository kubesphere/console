import styled from 'styled-components';
import { Col, Form } from '@kubed/components';

export const StyledForm = styled(Form)`
  min-height: 500px;

  .input-wrapper {
    width: 100px;
    margin-right: 8px;
  }
`;

export const Title = styled.div`
  margin-bottom: 12px;
  line-height: 1.67;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.accents_7};
`;

export const Desc = styled.div`
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const GroupWrapper = styled.div`
  padding: 12px;
  margin: 12px 0;
  border: 1px solid ${({ theme }) => theme.palette.border};
  border-radius: 4px;

  .input-number.has-addons input {
    width: 275px !important;
  }
`;

export const FirstCol = styled(Col)`
  padding-right: 20px;
`;

export const SecondCol = styled(Col)`
  .kubed-in {
    margin-right: 8px;

    .kubed-in-handler-wrap {
      display: none;
    }
  }
`;

// .boolean {
//   display: flex;
//   align-items: flex-start;

//   :global .toggle {
//     margin-right: 8px;
//     margin-top: 2px;
//   }
// }

// .parentGroup {
//   margin: 20px 0;
// }
