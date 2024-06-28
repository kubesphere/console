import styled from 'styled-components';
import { BaseTable } from '@ks-console/shared';

const TableContent = styled(BaseTable)``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
`;

export { TableContent, Header };
