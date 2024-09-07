/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Tabs } from '@kubed/components';

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
`;

export const StyledTabs = styled(Tabs)`
  .line-bg {
    height: 3px;
  }

  .tab-group {
    //margin-bottom: 12px;
  }

  .tab-item {
    padding: 16px 0;
    margin: 0 20px;

    &:first-of-type {
      margin-left: 0;
    }

    label {
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      color: ${({ theme }) => theme.palette.accents_8};
    }
  }

  .markdown-wrapper-root {
    padding-top: 40px;
  }

  .markdown-code {
    pre {
      padding: 0;
      border: 0;
      margin: 0;
      border-width: 0;
      background-color: transparent;
    }
  }
`;
