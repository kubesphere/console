/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Empty } from '@kubed/components';

export { EmptyWrapper } from './shared.styles';

export const StyledEmpty = styled(Empty)`
  .empty-title {
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.accents_8};
  }
`;

export const Image = styled.img.attrs({
  src: '/assets/empty-card.svg',
  alt: 'No data',
})``;
