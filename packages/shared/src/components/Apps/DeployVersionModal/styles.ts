/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Button, Drawer, Field, Steps } from '@kubed/components';

export const CloseModal = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  padding: 4px;
  border-radius: 4px;
`;

export const StyledDrawer = styled(Drawer)`
  .steps-root {
    height: calc(100vh - 216px);
  }

  .steps-wrapper {
    padding: 20px;
    border-top: 1px solid ${({ theme }) => theme.palette.border};
    border-bottom: 1px solid ${({ theme }) => theme.palette.border};
  }

  .steps-content {
    padding: 20px 20px 40px;
    height: calc(100% - 79px);
    overflow: auto;
  }
`;

export const HeadField = styled(Field)`
  height: 144px;
  padding: 10px 40px 10px 20px;
  background-color: ${({ theme }) => theme.palette.accents_1};

  .field-label {
    white-space: normal;
  }
`;

export const StepsHead = styled(Steps)`
  .steps-wrapper {
    padding: 16px 24px;
  }
`;

export const FooterBtns = styled.div`
  padding: 20px;
  text-align: right;
  background-color: ${({ theme }) => theme.palette.accents_1};
`;
