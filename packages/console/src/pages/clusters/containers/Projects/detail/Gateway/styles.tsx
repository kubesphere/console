/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Title = styled.div`
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #36435c;
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
`;

export interface IColProps {
  flex?: number;
  bg?: boolean;
  align?: 'left' | 'right' | 'center' | string;
}

export const Col = styled.div<IColProps>`
  padding: 12px;
  flex: ${props => props.flex ?? 1};
  background-color: ${props => (props.bg ? '#f9fbfd' : 'unset')};
  justify-content: ${props =>
    props.align === 'left' ? 'flex-start' : props.align === 'right' ? 'flex-end' : 'center'};
  align-items: stretch;
  display: flex;
  align-content: center;
  word-break: break-all;
`;
