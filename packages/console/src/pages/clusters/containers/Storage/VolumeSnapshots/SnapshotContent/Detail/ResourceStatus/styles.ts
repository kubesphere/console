/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ItemStyle = styled.div`
  .title {
    display: flex;
    font-size: 12px;
    line-height: 20px;
    color: $dark-color07;
    align-items: center;

    .toolTip {
      margin-left: 6px;
    }
  }

  .des {
    display: block;
    font-size: 12px;
    line-height: 20px;
    color: $dark-color01;

    .mode_title {
      display: flex;
    }

    .toolTip {
      margin-left: 6px;
    }
  }
`;

export const ItemBoxStyle = styled.div`
  display: flex;

  .leftBox {
    min-width: 20%;
    display: flex;

    .rightBox {
      margin-left: 12px;
    }
  }

  .titleBox {
    width: 20%;
    margin-left: 107px;
  }
`;
