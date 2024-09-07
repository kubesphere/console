/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Hammer } from '@kubed/icons';

import { Text } from './Tools.shared.styles';

export const Header = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const Content = styled.div`
  display: flex;
  position: relative;
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_8};
`;

export const Icon = styled(Hammer).attrs({ size: 40 })`
  margin-right: 12px;
`;

export const TextContainer = styled.div`
  flex: 1;
`;

export const Description = styled(Text)`
  color: #fff;
`;

export const Title = styled(Text)`
  font-weight: bold;
  color: #fff;
`;
