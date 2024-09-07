/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { isEmpty } from 'lodash';
import BaseTable from '../Base/Table';
import { Column } from '../DataTable';
import { EmptyWrapper, Table, Wrapper } from './styles';

export type CellPropsColumn = Column & {
  cellProps?: Record<string, string>;
};

export function RankTable({
  theme = 'default',
  columns = [],
  data,
}: {
  theme?: 'default' | 'transparent';
  columns: CellPropsColumn[];
  cluster?: string;
  data?: any;
  sortMetric?: string;
}) {
  return (
    <Wrapper>
      {isEmpty(data) ? (
        <EmptyWrapper
          title={t('NO_DATA')}
          image={<img src="/assets/empty-card.svg" />}
          imageStyle={{ width: '100%', background: 'none' }}
        />
      ) : (
        <Table transparent={theme === 'transparent'}>
          <BaseTable columns={columns} dataSource={data} />
        </Table>
      )}
    </Wrapper>
  );
}
