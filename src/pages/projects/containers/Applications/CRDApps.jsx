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
import { getLocalTime } from 'utils'

import { get } from 'lodash'
import { Status, Avatar } from 'components/Base'

import EditModal from 'components/Modals/EditBasicInfo'

import EmptyTable from 'components/Cards/EmptyTable'

import Base from 'core/containers/Base/List'

@inject('rootStore')
@observer
export default class CRDApps extends Base {
  init() {
    this.store = this.props.store

    this.state = {
      showServiceDeployApp: false,
      sampleApp: '',
      deleteModal: false,
    }
  }

  get rowKey() {
    return 'name'
  }

  get prefix() {
    const { namespace } = this.props.match.params
    return `/projects/${namespace}/applications/composing`
  }

  get module() {
    return 'applications'
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: true,
      sortOrder: this.getSortOrder('name'),
      search: true,
      render: (name, record) => (
        <Avatar
          title={name}
          avatar={record.icon || '/assets/default-app.svg'}
          to={`${this.prefix}/${name}`}
          desc={get(record, 'annotations["kubesphere.io/description"]', '-')}
        />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      isHideable: true,
      width: '20%',
      render: status => <Status name={t(status)} type={status} />,
    },
    {
      title: t('Version'),
      dataIndex: 'version',
      isHideable: true,
      width: '20%',
    },
    {
      title: t('Last Updated Time'),
      dataIndex: 'updateTime',
      sorter: true,
      sortOrder: this.getSortOrder('updateTime'),
      isHideable: true,
      width: 180,
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'more',
      width: 20,
      render: this.renderMore,
    },
  ]

  getData = (params = {}) => {
    this.store.fetchList({
      namespace: this.props.match.params.namespace,
      ...params,
    })
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
    const { selectItem = {} } = this.state

    return (
      <EditModal
        visible={this.state.editModal}
        detail={selectItem._originData}
        onOk={this.handleEdit}
        onCancel={this.hideModal('editModal')}
        isSubmitting={this.store.isSubmitting}
      />
    )
  }
}
