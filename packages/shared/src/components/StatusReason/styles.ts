/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Button, Text } from '@kubed/components';

export const Conditions = styled.div`
  margin-top: 8px;
`;

export const ConditionItem = styled.div`
  margin-bottom: 8px;
`;

export const Wrapper = styled.span`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleText = styled.span`
  margin-left: 4px;
  color: #fff;
  font-weight: 600;
`;

export const Line = styled.p`
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
`;

export const LineBreak = styled.p`
  word-wrap: break-word;
  margin: 0;
  white-space: pre-line;
`;

export const ReasonWrapper = styled.span`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const ReasonDesc = styled(Text)`
  margin-left: 4px;
`;

export const Events = styled(Button)`
  margin-top: 8px;
  width: 100%;
`;
