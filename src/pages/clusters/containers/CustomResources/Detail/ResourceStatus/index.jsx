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
import { Avatar } from 'components/Base'
import Table from 'components/Tables/List'
import { getLocalTime, getDisplayName } from 'utils'
import { trigger } from 'utils/action'
import CRDResource from 'stores/crd.resource'

import styles from './index.scss'

@inject('rootStore', 'detailStore')
@observer
@trigger
export default class ResourceStatus extends React.Component {
  constructor(props) {
    super(props)

    const { group, latestVersion, kind, module } = this.props.detailStore.detail

    this.store = new CRDResource({
      kind,
      module,
      apiVersion: `apis/${group}/${latestVersion}`,
    })
  }

  componentDidMount() {
    this.getData()
  }

  getData = params => {
    this.store.fetchList({
      ...params,
      cluster: this.props.match.params.cluster,
    })
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'customresourcedefinitions',
      cluster: this.props.match.params.cluster,
    })
  }

  get itemActions() {
    return [
      this.enabledActions.includes('edit')
        ? {
            key: 'editYaml',
            icon: 'pen',
            text: t('Edit YAML'),
            action: 'edit',
            onClick: item =>
              this.trigger('resource.yaml.edit', {
                detail: item,
                yaml: item._originData,
                success: this.getData,
              }),
          }
        : {
            key: 'viewYaml',
            icon: 'eye',
            text: t('View YAML'),
            action: 'view',
            onClick: item =>
              this.trigger('resource.yaml.edit', {
                detail: item,
                yaml: item._originData,
                readOnly: true,
              }),
          },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          this.trigger('resource.delete', {
            type: t(item.kind),
            detail: item,
            success: this.getData,
          }),
      },
    ]
  }

  get columns() {
    const { scope } = this.props.detailStore.detail
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        render: (name, record) => (
          <Avatar
            title={getDisplayName(record)}
            desc={record.description}
            noLink
          />
        ),
      },
      ...(scope === 'Namespaced'
        ? [
            {
              title: t('Namespace'),
              dataIndex: 'namespace',
            },
          ]
        : []),
      {
        title: t('Created Time'),
        dataIndex: 'createTime',
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  render() {
    const { data, name, page, total, limit, isLoading } = this.store.list
    const pagination = { page, total, limit }
    const filters = { name }

    return (
      <div>
        <div className={styles.title}>{t('Resource List')}</div>
        <Table
          data={toJS(data)}
          columns={this.columns}
          isLoading={isLoading}
          onFetch={this.getData}
          itemActions={this.itemActions}
          enabledActions={this.enabledActions}
          pagination={pagination}
          filters={filters}
          showEmpty={false}
          searchType="name"
          hideCustom
        />
      </div>
    )
  }
}
