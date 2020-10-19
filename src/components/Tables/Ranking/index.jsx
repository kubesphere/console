/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { observer, inject } from 'mobx-react'
import { Table } from '@kube-design/components'
import classNames from 'classnames'
import { get } from 'lodash'

import styles from './index.scss'

export const THEME = {
  default: classNames(styles.table, styles.table_rank, styles.table_no_border),
  transparent: classNames(
    styles.table,
    styles.table_rank,
    styles.table_no_border,
    styles.table_transparent
  ),
}

@inject('rootStore')
@observer
export default class RankingTable extends React.Component {
  get columns() {
    const sort_metric = get(this, 'props.store.sort_metric', '')
    return this.props.columns.map(column => ({
      ...column,
      className: column.sort_metric === sort_metric ? styles.rankCol : '',
    }))
  }

  render() {
    const { theme, ...tableProps } = this.props

    return (
      <div className={theme || THEME.default} data-test="ranking">
        <Table {...tableProps} columns={this.columns} />
      </div>
    )
  }
}
