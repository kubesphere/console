import type { FlattenSimpleInterpolation } from 'styled-components';
import styled from 'styled-components';

export const Root = styled.div<{
  $styles: FlattenSimpleInterpolation | undefined;
}>`
  ${({ $styles }) => $styles}
`;
