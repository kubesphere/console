/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  .h4 {
    display: block;
    line-height: 1.4;
    margin-bottom: 32px;
    font-size: 20px;
    font-weight: 600;
    font-style: normal;
    color: #242e42;
    text-shadow: 0 4px 8px rgba(36, 46, 66, 0.1);
  }

  .custom-icon {
    img {
      width: 24px;
      height: 24px;
      color: #324558;
      fill: #b6c2cd;
      margin-right: 12px;
      vertical-align: sub;
    }

    &:hover {
      img {
        color: #00aa72;
        fill: #90e0c5;
      }
    }
  }
`;

export const FormWrapper = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const FromGroup = styled.div``;
