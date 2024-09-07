/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Loading } from '@kubed/components';
export const WrapperStyle = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

export const TitleStyle = styled.div`
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #36435c;
`;
export const PanelStyle = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
`;

export const EmptyStyle = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: #f9fbfd;
  font-size: 16px;
  font-weight: 600;
  color: #c1c9d1;
`;

export const LoadingStyle = styled(Loading)`
  margin-left: 50%;
  transform: translateX(-50%);
`;
