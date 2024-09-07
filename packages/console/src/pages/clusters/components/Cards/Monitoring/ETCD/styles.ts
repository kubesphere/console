/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Info } from '../styles';

export const InfoNode = styled(Info)`
  color: ${({ active }) => (active ? '#fff' : '#404e68')};
  p {
    font-size: 20px;
  }
`;
