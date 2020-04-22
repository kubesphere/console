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
 *
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { isEmpty, get } from 'lodash'
import { compile } from 'path-to-regexp'
import { VOLUME_SNAPSHOT_STATUS } from 'utils/constants'
import { observer } from 'mobx-react'

import SnapshotStore from 'stores/volumeSnapshot'
import { getLocalTime } from 'utils'
import { SearchSelect, Avatar, Status } from 'components/Base'
import Project from 'stores/project'

import BaseTable from 'components/Tables/Base'
import Banner from 'components/Cards/Banner'
import { Icon, Tooltip } from '@pitrix/lego-ui'
import withList from 'components/HOCs/withList'

import styles from './index.scss'

@withList({
  store: new SnapshotStore(),
  module: 'volume-snapshots',
  name: 'VolumeSnapshot',
  authKey: 'volumes',
})
@observer
export default class VolumeSnapshot extends React.Component {
  projectStore = new Project()

  get namespace() {
    return this.props.match.params.namespace
  }

  async componentDidMount() {
    await this.projectStore.fetchList()

    const { list } = this.projectStore
    const { data = [] } = list
    const firstNamespace = get(data, '[0].name')
    const currentNamespace = this.props.match.params.namespace

    if (currentNamespace) {
      this.fetchRules(currentNamespace)
    } else {
      this.updateNamespace(firstNamespace)
    }
  }

  updateNamespace(namespace) {
    const { path: pathRegexp, params } = this.props.match
    const generatedNewPath = compile(pathRegexp)
    const newPath = generatedNewPath({ ...params, namespace })
    this.props.rootStore.routing.history.push(newPath)
    this.fetchRules(namespace)
  }

  async fetchRules(namespace) {
    const rootStore = this.props.rootStore
    if (namespace && !rootStore.project) {
      const projectStore = new Project()
      rootStore.register('project', projectStore)
    }

    if (namespace) {
      const projectRule = get(globals.user, `rules[${namespace}]`)
      if (!projectRule) {
        await rootStore.project.fetchDetail({ namespace })
        await rootStore.project.fetchRules({
          namespace,
        })
      }
    }
  }

  getStatus() {
    return VOLUME_SNAPSHOT_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getColumns() {
    const { getSortOrder, renderMore, prefix } = this.props

    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        sortOrder: getSortOrder('name'),
        search: true,
        sorter: true,
        render: (name, record) => (
          <Avatar
            icon={'snapshot'}
            iconSize={40}
            to={`${prefix}/${name}`}
            title={name}
            desc={record.snapshotClassName}
          />
        ),
      },
      {
        title: t('Status'),
        dataIndex: 'status',
        isHideable: true,
        filters: this.getStatus(),
        search: true,
        render: (_, record) => {
          const { errorMessage, backupStatus } = record

          return (
            <div className={styles.status}>
              <Status
                type={backupStatus}
                name={t(`CREATE_STATUS_${backupStatus.toUpperCase()}`)}
              />{' '}
              {!isEmpty(errorMessage) && (
                <Tooltip content={errorMessage}>
                  <Icon name={'question'} />
                </Tooltip>
              )}
            </div>
          )
        },
      },
      {
        title: t('Capacity'),
        dataIndex: 'restoreSize',
        width: '20%',
        render: restoreSize => restoreSize || '-',
      },
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        width: '20%',
        render: time =>
          time ? getLocalTime(time).format('YYYY-MM-DD HH:mm:ss') : '-',
      },
      {
        key: 'more',
        width: 60,
        render: renderMore,
      },
    ]
  }

  handleNamespaceChange = namespace => {
    this.updateNamespace(namespace)
  }

  renderNamespaceFitler() {
    const { list } = this.projectStore
    const { data } = this.projectStore.list
    const options = data.map(pro => ({
      label: pro.name,
      value: pro.name,
    }))

    return (
      <div className={styles.namespaceFilter}>
        <SearchSelect
          page={list.page}
          value={this.namespace}
          total={list.total}
          isLoading={list.isLoading}
          options={options}
          currentLength={data.length || 0}
          prefixIcon={<Icon name="project" size={16} />}
          onChange={this.handleNamespaceChange}
          searchable={false}
        />
      </div>
    )
  }

  render() {
    const { bannerProps, tableProps } = this.props

    const initializing =
      this.projectStore.list.isLoading ||
      get(this.props.rootStore, 'project.initializing')

    return (
      <div>
        <Banner
          {...bannerProps}
          tabs={this.tabs}
          tips={[
            {
              title: t('WHAT_IS_VOLUME_SNAPSHOTS'),
              description: t('VOLUMESNAPSHOT_DESC'),
            },
          ]}
        />
        {initializing || (
          <BaseTable
            {...tableProps}
            columns={this.getColumns()}
            customFilter={this.renderNamespaceFitler()}
          />
        )}
      </div>
    )
  }
}
