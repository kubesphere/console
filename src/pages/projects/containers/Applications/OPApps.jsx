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
import { toJS } from 'mobx'
import { getLocalTime } from 'utils'

import { get } from 'lodash'
import { Status } from 'components/Base'
import Avatar from 'apps/components/Avatar'

import EditModal from 'projects/components/Modals/AppEdit'

import EmptyTable from 'components/Cards/EmptyTable'

import Base from 'core/containers/Base/List'

@inject('rootStore')
@observer
export default class OPApps extends Base {
  init() {
    this.store = this.props.store

    this.state = {
      showAppRepo: false,
      deleteModal: false,
    }
  }

  get module() {
    return 'applications'
  }

  get rowKey() {
    return 'name'
  }

  get prefix() {
    const { cluster, namespace } = this.props.match.params
    return `/cluster/${cluster}/projects/${namespace}/applications/template`
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: true,
      sortOrder: this.getSortOrder('name'),
      render: (name, record) => (
        <Avatar
          isApp
          to={`${this.prefix}/${record.cluster_id}`}
          avatar={record.app.icon}
          iconLetter={name}
          iconSize={40}
          title={name}
          desc={record.description}
        />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      isHideable: true,
      width: '20%',
      render: (status, record) => (
        <Status
          name={t(record.transition_status || status)}
          type={record.transition_status || status}
        />
      ),
    },
    {
      title: t('Version'),
      dataIndex: 'version.name',
      isHideable: true,
      width: '20%',
    },
    {
      title: t('Last Updated Time'),
      dataIndex: 'status_time',
      sorter: true,
      sortOrder: this.getSortOrder('status_time'),
      isHideable: true,
      width: 180,
      render: (time, record) =>
        getLocalTime(record.update_time || record.status_time).format(
          'YYYY-MM-DD HH:mm:ss'
        ),
    },
    {
      key: 'more',
      width: 20,
      render: this.renderMore,
    },
  ]

  getData = (params = {}) => {
    const runtime_id = get(this.props.project, 'annotations.openpitrix_runtime')

    if (this.props.project.name) {
      this.store.fetchList({
        namespace: this.props.project.name,
        runtime_id,
        ...params,
      })
    }
  }

  getTableProps() {
    const actions = this.props.canCreate
      ? [
          {
            key: 'deploy',
            type: 'control',
            text: t('Deploy New Application'),
            onClick: this.props.showDeployAppModal,
          },
        ]
      : []

    return {
      ...Base.prototype.getTableProps.call(this),
      actions,
      onCreate: null,
      selectActions: [],
    }
  }

  renderHeader() {
    return null
  }

  renderEmpty() {
    const onCreate = this.props.canCreate ? this.props.showDeployAppModal : null

    return (
      <EmptyTable
        createText={t('Deploy New Application')}
        desc={t('APP_TEMPLATE_DESC')}
        onCreate={onCreate}
      />
    )
  }

  renderExtraModals() {
    const { selectItem } = this.state

    return (
      <EditModal
        visible={this.state.editModal}
        detail={toJS(selectItem)}
        onOk={this.handleEdit}
        onCancel={this.hideModal('editModal')}
        isSubmitting={this.store.isSubmitting}
      />
    )
  }
}
