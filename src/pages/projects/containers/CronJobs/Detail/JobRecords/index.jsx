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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'

import { getLocalTime } from 'utils'
import { getJobStatus } from 'utils/status'
import RecordStore from 'stores/workload/record'
import WorkloadStore from 'stores/workload'

import { Button, Table } from '@kube-design/components'
import { Card, Status } from 'components/Base'

import styles from './index.scss'

@inject('rootStore', 'detailStore')
@observer
class JobRecords extends React.Component {
  constructor(props) {
    super(props)

    this.recordStore = props.recordStore || new RecordStore()
    this.imitateJobsStore = new WorkloadStore('jobs')
  }

  get store() {
    return this.props.detailStore
  }

  get params() {
    return this.props.match.params
  }

  get prefix() {
    const { cluster, workspace, namespace } = this.props.match.params
    return `${
      workspace ? `/${workspace}` : ''
    }/clusters/${cluster}/projects/${namespace}`
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = params => {
    const detail = toJS(this.store.detail)
    const { cluster, namespace } = detail
    const selector = get(detail, 'spec.jobTemplate.metadata.labels', {})

    this.recordStore.fetchListByK8s({
      ...params,
      cluster,
      namespace,
      selector,
    })
  }

  getColumns = () => [
    {
      title: t('JOB'),
      dataIndex: 'name',
      width: '19%',
      render: name => (
        <Link className="item-name" to={`${this.prefix}/jobs/${name}`}>
          {name}
        </Link>
      ),
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      width: '19%',
      render: (status, record) => {
        const _status = getJobStatus(record)
        return <Status type={_status} name={t(_status)} />
      },
    },
    {
      title: t('START_TIME'),
      dataIndex: 'status.startTime',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: t('END_TIME'),
      dataIndex: 'status.completionTime',
      render: (time, record) => {
        const failedTime = get(record, 'status.conditions[0].lastProbeTime')
        if (time) {
          return getLocalTime(time).format('YYYY-MM-DD HH:mm:ss')
        }
        if (failedTime) {
          return getLocalTime(failedTime).format('YYYY-MM-DD HH:mm:ss')
        }
        return '-'
      },
    },
    {
      render: record => (
        <Button icon="refresh" type="flat" onClick={this.handleRerun(record)} />
      ),
    },
  ]

  handleRerun = job => () => {
    this.imitateJobsStore.rerun(job).then(() => {
      this.fetchData()
    })
  }

  renderTable() {
    const { data, isLoading } = this.recordStore.list

    return (
      <Table
        className={styles.table}
        dataSource={toJS(data)}
        columns={this.getColumns()}
        loading={isLoading}
      />
    )
  }

  render() {
    return (
      <Card className={styles.main} title={t('RUN_RECORDS')}>
        <div className={styles.content}>{this.renderTable()}</div>
      </Card>
    )
  }
}

export default JobRecords
