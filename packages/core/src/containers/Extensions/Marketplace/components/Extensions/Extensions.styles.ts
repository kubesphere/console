/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { STYLES } from './constants';

export { LoadingWrapper } from '../../shared.styles';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${STYLES.extensionGap}px;
`;
