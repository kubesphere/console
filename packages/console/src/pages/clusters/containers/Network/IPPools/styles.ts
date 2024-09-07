/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

const FieldLabel = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  font-weight: 400;
  color: #79879c;
  max-width: 300px;
`;

const ListWrapper = styled.div`
  .mb12 {
    box-shadow: 0 4px 8px 0 rgb(36 46 66 / 6%);
  }
  .banner-desc {
    display: flex;

    svg {
      margin-left: 12px;
      margin-right: 4px;
    }
    a {
      font-size: 12px;
      font-weight: 600;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.67;
      letter-spacing: normal;
      color: #3385b0;
    }
  }
`;

export { FieldLabel, ListWrapper };
