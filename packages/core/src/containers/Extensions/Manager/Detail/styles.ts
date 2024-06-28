import styled from 'styled-components';
import { themeUtils } from '@kubed/components';

const { getColor } = themeUtils;

export const InstalledVersionWrapper = styled.div`
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  .kubed-icon {
    fill: ${({ theme }) => getColor('green', theme)};
    color: #fff;
  }
`;
