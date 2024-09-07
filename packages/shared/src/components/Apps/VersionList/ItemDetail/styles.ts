/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Tabs } from '@kubed/components';

export const ItemDetailWrapper = styled.div`
  position: relative;
`;

export const StyledTabs = styled(Tabs)`
  & > div:nth-child(2) {
    margin: 12px 0;
    padding-top: 0;
  }

  .simpleTable {
    padding: 12px;
    background-color: aliceblue;

    div {
      & > div:first-child {
        padding: 0;

        tr {
          td {
            padding: 8px 12px;
            height: 32px;
          }

          & > td:last-child {
            text-align: right;
            color: ${({ theme }) => theme.palette.accents_5};
          }
        }
      }
    }
  }
`;

export const ActionsWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ConfigFileWrapper = styled.div`
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const ConfigBox = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border-radius: 4px;
  line-height: 20px;

  pre {
    margin: 8px 0 0;
    padding: 0;
    border: none;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow: auto;
    font-family:
      PT Mono,
      Monaco,
      Menlo,
      Consolas,
      Courier New,
      monospace;
  }
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.palette.accents_7};
  font-weight: bold;
`;
