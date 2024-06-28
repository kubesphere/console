import styled from 'styled-components';
import { Tag } from '@kubed/components';

export const Root = styled(Tag).attrs({ color: 'success', radius: 2 })`
  .tag-content {
    font-size: 12px;
  }
`;
