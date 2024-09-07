/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Title = styled.div`
  height: 20px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  color: #242e42;
`;

export const SnapshotList = styled.div`
  background: #f9fbfd;
  padding: 10px;
`;

export const Item = styled.div`
  margin-bottom: 10px;
  display: flex;
  background: #fff;
  border: solid 1px #ccd3db;
  padding: 12px;
  border-radius: 4px;
`;

export const ItemAttrs = styled.div`
  flex: 1;
  padding: 0 10px;
  h3 {
    font-weight: bold;
  }
  p {
    color: #79879c;
  }
`;
