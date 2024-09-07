/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled, { keyframes } from 'styled-components';

const waveSvgAnim = keyframes`
0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-100px);
  }
`;

export const ContainerStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #36435c;

  svg {
    fill: #55bc8a;
    fill-opacity: 0.6;
  }
`;

export const WaveStyle = styled.path`
  animation: ${waveSvgAnim} 4s linear infinite;
`;

export const Wave2Style = styled.path`
  animation: ${waveSvgAnim} 6s linear infinite;
`;

export const ForegroundStyle = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: url('/assets/volume-container.svg') no-repeat;
  background-size: 100% 100%;

  h3 {
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.67;
    letter-spacing: normal;
    color: #fff;
    position: absolute;
    right: 16%;
    top: 10%;
    width: 28%;
    text-align: center;
  }
`;
