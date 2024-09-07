/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const DefaultWrapper = styled.div`
  position: relative;
  padding: 20px;
  h6 {
    display: flex;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 12px;
    & .custom-icon {
      display: block;

      svg {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        vertical-align: sub;
      }

      &:hover {
        svg {
          color: #00aa72;
          fill: #90e0c5;
        }
      }
    }
  }

  .form-item {
    .input-wrapper {
      padding: 0;
      input {
        max-width: none;
        background-color: white;
        text-indent: 12px;
      }
    }

    textarea {
      padding: 12px;
      max-width: none;
      background-color: white;
      border-radius: 3px;
    }
  }
`;

export const FormWrapper = styled.div`
  padding: 12px;
  padding-bottom: 40px;
  margin-bottom: -40px;
  height: calc(100vh - 270px);
  background-color: #f9fbfd;
  overflow: auto;

  .form-item {
    .input-wrapper {
      max-width: unset;
    }
  }
`;
