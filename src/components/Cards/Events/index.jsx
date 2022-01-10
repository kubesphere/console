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
import PropTypes from 'prop-types'

import { Table } from '@kube-design/components'
import { Panel, Status } from 'components/Base'

import styles from './index.scss'

class Events extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
  }

  getColumns = () => [
    {
      title: t('TYPE'),
      dataIndex: 'type',
      width: '10%',
      render: type => (
        <Status type={type} name={t(`EVENT_${type.toUpperCase()}`)} />
      ),
    },
    {
      title: t('REASON'),
      dataIndex: 'reason',
      width: '16%',
    },
    {
      title: t('EVENT_AGE'),
      dataIndex: 'age',
      width: '16%',
    },
    {
      title: t('SOURCE'),
      dataIndex: 'from',
      width: '18%',
    },
    {
      title: t('MESSAGE'),
      dataIndex: 'message',
    },
  ]

  render() {
    const { data, loading } = this.props
    return (
      <Panel title={t('EVENT_PL')}>
        <Table
          className={styles.table}
          dataSource={data}
          columns={this.getColumns()}
          loading={loading}
        />
      </Panel>
    )
  }
}

export default Events
