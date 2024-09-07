/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ModeTitleStyle = styled.div`
  display: flex;
  align-items: center;
  .kubed-icon {
    margin-left: 6px;
  }
`;

export const PVContentStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    .kubed-icon {
      opacity: 1;
    }
  }

  .kubed-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    opacity: 0;
    justify-content: center;
    align-items: center;

    &:hover {
      background: #e3e9ef;
      border-radius: 4px;
      cursor: pointer;
    }
  }
`;

export const ProjectSelectStyle = styled.div`
  width: 250px;
  margin-right: 12px;
  .kubed-select {
    width: 100%;
  }
`;
