/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

const Avatar = styled.div`
  position: relative;

  div {
    position: absolute;
    display: flex;
    top: 20px;
    left: 20px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;

    img {
      height: 20px;
      width: 20px;
    }
  }
`;

export { Avatar };
