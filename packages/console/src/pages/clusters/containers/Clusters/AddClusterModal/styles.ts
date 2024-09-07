/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Steps } from '@kubed/components';

export const Wrapper = styled.div`
  position: relative;
`;

export const HeaderLine = styled.div`
  position: absolute;
  top: 68px;
  left: 0;
  width: 100%;
  height: 1.5px;
  border-style: solid;
  border-width: 1px 0 0;
  border-image-source: radial-gradient(
    circle at 50% 3%,
    rgba(193, 201, 209, 0.53),
    hsla(0, 0%, 100%, 0.2)
  );
  border-image-slice: 1;
`;

export const StyledSteps = styled(Steps)`
  width: 900px;
  margin: 0 auto;
  overflow: hidden;
  .steps-wrapper {
    width: fit-content;
    height: 30px;
    margin: 19px 0;
    background-color: #242e42;
    border-radius: 3px;
    padding: 0 8px;
  }

  .step-label {
    font-size: 12px;
    color: #fff;
  }

  .step-separator {
    min-width: 56px;
    height: 1px;
    background-color: transparent;
    border-bottom: 1px dashed #c1c9d1;
  }

  .stepicon-wrapper {
    margin-bottom: 0;
  }

  .step-icon {
    width: 13px;
    height: 13px;
    font-size: 0;
    border-radius: 13px;
    min-height: initial;
  }

  .step-completed-icon {
    top: -2px;
    left: -2px;
    width: 14px;
    height: 14px;
  }

  .step-body {
    margin-left: 10px;
  }

  .steps-content {
    position: absolute;
    right: 0;
    width: 100vw;
    height: calc(100vh - 150px);
    overflow-y: auto;
  }
`;

export const StepItem = styled.div`
  width: 900px;
  margin: 0 auto;
`;

export const HeaderLeft = styled.div`
  position: absolute;
  left: 24px;
  top: 25px;
  display: flex;

  .close-icon {
    cursor: pointer;
  }

  .title-wrapper {
    display: flex;
    font-weight: 600;
  }
  .title-icon {
    margin-right: 8px;
  }
`;

export const HeaderRight = styled.div`
  position: absolute;
  right: 20px;
  top: 18px;
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -1px 0 0 #d8dee5;
  background-color: #fff;
  z-index: 10;
  display: flex;
  height: 56px;

  .footer-inner {
    width: 860px;
    margin: 0 auto;
    display: flex;
    justify-content: right;
    align-items: center;
  }
`;

export const YamlWrapper = styled.div`
  width: 900px;
  margin: 0 auto;
`;
