/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Tab = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  .recharts-tooltip-wrapper {
    z-index: 100;
  }
`;

export const Info = styled.div<{ active: boolean }>`
  width: calc(100% - 60px);
  margin-left: 20px;
  color: ${({ active }) => (active ? '#fff' : '#242e42')};

  p {
    height: 32px;
    line-height: 32px;
    font-size: 24px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
    margin: 0;

    span {
      font-size: 12px;
    }
  }
`;

export const InfoTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: 1.67;
`;
