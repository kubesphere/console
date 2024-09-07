/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Form } from '@kubed/components';
import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 6px;

  span {
    margin-left: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex: 0 0 auto;
  height: 82px;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 4px;
  background-color: #f9fbfd;

  & > div {
    width: 340px;
    flex-grow: 0;
    margin-top: 0;
    margin-right: 20px;
    margin-bottom: 0;
  }

  button {
    margin-top: 30px;
  }
`;

export const Chart = styled.div`
  height: 100%;
  height: 370px;
  padding: 5px 0 12px;
  margin-bottom: 12px;
  border-radius: 4px;
  background-color: #f9fbfd;
`;

export const TableWrapper = styled.div`
  flex: 0 0 auto;
  height: 328px;
  padding: 12px;
  border-radius: 4px;
  background-color: #f9fbfd;
`;

export const TableBox = styled.div`
  border-radius: 4px;
  border: 1px solid #e3e9ef;
  background-color: #fff;
  overflow: hidden;

  & > div:last-child {
    height: calc(100% - 49px);
  }

  table {
    padding: 0 20px;
  }
`;

export const TableTitle = styled.div`
  padding: 12px 20px;
  line-height: 24px;
  font-weight: 600;
  border-bottom: 1px solid #e3e9ef;
  background-color: #f9fbfd;
`;

export const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
