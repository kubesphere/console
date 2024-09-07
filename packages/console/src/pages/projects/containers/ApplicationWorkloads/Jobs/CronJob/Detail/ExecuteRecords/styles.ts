/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

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

const PaginationWrapper = styled.div`
  padding: 0 12px;
`;

export { TableContent, Header, PaginationWrapper };
