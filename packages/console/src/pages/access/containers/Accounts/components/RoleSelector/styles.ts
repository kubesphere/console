/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Text } from '@kubed/components';

export const Option = styled.div`
  overflow: hidden;
`;

export const OptionName = styled(Text)`
  font-size: 12px;
  line-height: 1.67;
  font-weight: bold;
  color: #fff;
`;

export const OptionDescription = styled(Text)`
  font-size: 12px;
  line-height: 1.67;
  color: ${props => props.theme.palette.accents_5};
`;
