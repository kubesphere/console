/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const TitleStyle = styled.span`
  display: flex;
  font-size: 12px;
  line-height: 20px;
  color: $dark-color07;
  align-items: center;
  .toolTip {
    margin-left: 6px;
  }
`;

export const DescStyle = styled.span`
  display: block;
  font-size: 12px;
  line-height: 20px;
  color: #79879c;

  .toolTip {
    margin-left: 6px;
  }
`;

export const ItemBoxStyle = styled.div`
  display: flex;

  .leftBox {
    width: 20%;
    display: flex;

    .rightBox {
      margin-left: 12px;
    }
  }

  .titleBox {
    width: 20%;
    margin-left: 12px;
  }
`;

export const IconLineStyle = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;

  .cardBox {
    width: 32.5%;
    height: 64px;
    padding: 17px;
    background: #f9fbfd;
    border-radius: 4px;
    display: flex;
    align-items: center;

    .text {
      margin-left: 12px;
    }
  }
`;
