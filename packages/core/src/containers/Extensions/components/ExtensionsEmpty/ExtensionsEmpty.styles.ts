import styled from 'styled-components';
import { themeUtils, Empty } from '@kubed/components';

const { getColor } = themeUtils;

export const StyledEmpty = styled(Empty)`
  height: 240px;

  .custom-empty-image > .kubed-icon {
    margin-bottom: 0;
  }
`;

export const LinkButton = styled.a`
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => getColor('blue', theme)};
`;
