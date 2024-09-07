/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const BarWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 60px;
  height: 10px;
  border-radius: 5px;
  background-color: #eff4f9;
  overflow: hidden;
`;

export const BarItem = styled.div<{
  type: 'warning' | 'danger' | 'default';
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  transition: all 0.6s ease;
  z-index: 1;
  background-color: ${props =>
    props.type === 'warning' ? '#f5a623' : props.type === 'danger' ? '#f44336' : '#329dce'}
}

;

`;

export const Text = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 2;
`;

export const RightText = styled.div`
  position: absolute;
  right: 20px;
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #79879c;
  z-index: 2;
`;
