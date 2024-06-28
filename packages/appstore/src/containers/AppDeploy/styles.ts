import styled from 'styled-components';
import { Col, Row } from '@kubed/components';

export const FormWrapper = styled(Row)`
  display: flex;
  justify-content: space-between;
  width: 1280px;
  padding: 32px 24px;
  margin: 0 auto;
  margin-bottom: 0 !important;
  height: calc(100vh - 273px);
  overflow: auto;

  button {
    width: 100%;
  }
`;

export const StyledCol = styled(Col)`
  margin: 0;
`;

export const StepsWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.accents_1};
`;
