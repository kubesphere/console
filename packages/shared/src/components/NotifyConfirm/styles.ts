/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled, { css } from 'styled-components';

export const Animations = css`
  @-webkit-keyframes browseIn {
    0% {
      -webkit-transform: scale(0.8) translateZ(0);
      transform: scale(0.8) translateZ(0);
      z-index: -1;
    }

    10% {
      opacity: 0.7;
      -webkit-transform: scale(0.8) translateZ(0);
      transform: scale(0.8) translateZ(0);
      z-index: -1;
    }

    80% {
      opacity: 1;
      -webkit-transform: scale(1.05) translateZ(0);
      transform: scale(1.05) translateZ(0);
      z-index: 999;
    }

    to {
      -webkit-transform: scale(1) translateZ(0);
      transform: scale(1) translateZ(0);
      z-index: 999;
    }
  }

  @keyframes browseIn {
    0% {
      -webkit-transform: scale(0.8) translateZ(0);
      transform: scale(0.8) translateZ(0);
      z-index: -1;
    }

    10% {
      opacity: 0.7;
      -webkit-transform: scale(0.8) translateZ(0);
      transform: scale(0.8) translateZ(0);
      z-index: -1;
    }

    80% {
      opacity: 1;
      -webkit-transform: scale(1.05) translateZ(0);
      transform: scale(1.05) translateZ(0);
      z-index: 999;
    }

    to {
      -webkit-transform: scale(1) translateZ(0);
      transform: scale(1) translateZ(0);
      z-index: 999;
    }
  }

  @-webkit-keyframes browseOut {
    0% {
      opacity: 1;
      -webkit-transform: scale(1) translateZ(0);
      transform: scale(1) translateZ(0);
      z-index: 999;
    }

    to {
      opacity: 0;
      -webkit-transform: scale(0.4) translateZ(0);
      transform: scale(0.4) translateZ(0);
      z-index: -1;
    }
  }

  @keyframes browseOut {
    0% {
      opacity: 1;
      -webkit-transform: scale(1) translateZ(0);
      transform: scale(1) translateZ(0);
      z-index: 999;
    }

    to {
      opacity: 0;
      -webkit-transform: scale(0.4) translateZ(0);
      transform: scale(0.4) translateZ(0);
      z-index: -1;
    }
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 200;
`;

export const Card = styled.div`
  ${Animations}
  min-width: 320px;
  color: ${({ theme }) => theme.palette.accents_8};
  border-radius: 4px;
  box-shadow: 0 6px 16px 0 rgba(33, 43, 54, 0.2);
  background-color: #fff;
  transition: all 0.3s;
  transform-origin: top center;
  animation-duration: 0.3s;

  &.in {
    opacity: 1;
    animation-name: browseIn;
    animation-timing-function: cubic-bezier(0.34, 1.61, 0.7, 1);
  }

  &.out {
    opacity: 0;
    animation-name: browseOut;
  }
`;

export const CardMain = styled.div`
  padding: 20px;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 20px;
  border-radius: 0 0 4px 4px;
  background-color: ${({ theme }) => theme.palette.accents_1};
  button:last-child {
    margin-left: 12px;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  line-height: 20px;
  margin-bottom: 8px;

  strong {
    font-size: 14px;
  }

  .kubed-icon {
    margin-right: 6px;
    svg {
      --primary-color: #{#fff};
      --secondary-color: #{${({ theme }) => theme.palette.colors.green[2]}};
    }
  }
`;

export const Content = styled.div`
  line-height: 1.67;
`;
