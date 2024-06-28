import styled from 'styled-components';

import { STYLES } from './constants';

export { LoadingWrapper } from '../../shared.styles';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${STYLES.extensionGap}px;
`;
