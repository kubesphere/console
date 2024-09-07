/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Skeleton } from '@kubed/components';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;

  .ml15 {
    margin-left: 15px;
  }
  .ml25 {
    margin-left: 25px;
  }
`;

const ToolBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const TableHead = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const TableRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 15px;
  justify-content: space-between;
  padding-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eff4f9;
`;

const Title = styled.div`
  display: flex;
  .left {
    width: 45px;
    height: 45px;
  }
  .right {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  }
`;

export interface TableSkeletonProps {
  row?: number;
  hasCreateButton?: boolean;
  hasToolbar?: boolean;
}

const TableSkeleton = ({
  row = 3,
  hasCreateButton = true,
  hasToolbar = true,
}: TableSkeletonProps) => {
  return (
    <Wrapper>
      {hasToolbar && (
        <ToolBar>
          <Skeleton height={30} width="90%" radius="xl" />
          <Skeleton circle height={25} className="ml15" />
          <Skeleton circle height={25} className="ml25" />
          {hasCreateButton && <Skeleton radius="sm" width={90} height={30} className="ml25" />}
        </ToolBar>
      )}
      <TableHead>
        <Skeleton height={30} width="100%" radius="sm" />
      </TableHead>
      {[...Array(row)].map((item, i) => {
        return (
          <TableRow key={i}>
            <Title>
              <Skeleton height={20} width={160} radius="sm" className="left" />
              <div className="right">
                <Skeleton height={15} width={180} radius="sm" style={{ marginBottom: '10px' }} />
                <Skeleton height={15} width={120} radius="sm" />
              </div>
            </Title>
            <Skeleton height={20} width={80} radius="sm" />
            <Skeleton height={20} width={80} radius="sm" />
            <Skeleton height={20} width={100} radius="sm" />
            <Skeleton height={20} width={80} radius="sm" />
            <Skeleton height={20} width={80} radius="sm" />
          </TableRow>
        );
      })}
    </Wrapper>
  );
};

export default TableSkeleton;
