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

import { Avatar, Notify } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'
import { getLocalTime } from 'utils'
import { ICON_TYPES } from 'utils/constants'
import MonitoringDashboard from 'stores/customMonitorDashboard'

import EditModal from './EditDashborad'
import CreateModal from './CreateDashborad'

import styles from './index.scss'

@withList({
  store: new MonitoringDashboard(),
  module: 'dashboards',
  authKey: 'custom-monitoring',
  name: 'CustomMonitorDashboard',
})
export default class CustomMonitoringDashboards extends React.Component {
  state = {
    createModalVisiable: false,
    editModalVisiable: false,
    editData: {},
  }

  getData = () => {
    this.props.store.fetchListByK8s(this.props.match.params)
  }

  getColumns() {
    const { getSortOrder, module } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'title',
        sortOrder: getSortOrder('name'),
        render: (title, { name, _originData, description }) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={
              <div
                className={styles.link}
                onClick={this.openDashboard(_originData)}
              >
                {name} {title && `(${title})`}
              </div>
            }
            desc={description}
          />
        ),
      },
      {
        title: t('Created Time'),
        dataIndex: 'creationTimestamp',
        sorter: true,
        sortOrder: getSortOrder('creationTimestamp'),
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  get itemActions() {
    const { trigger, routing } = this.props
    return [
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('Edit YAML'),
        action: 'edit',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
            success: routing.query,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: t(this.name),
            detail: item,
            success: routing.query,
          }),
      },
    ]
  }

  showCreateModal = () => {
    this.setState({ createModalVisiable: true })
  }

  openDashboard(_originData) {
    return () => {
      this.setState({
        editModalVisiable: true,
        editData: _originData,
      })
    }
  }

  hideCreateModal = () => {
    this.setState({ createModalVisiable: false })
  }

  hideEditModal = () => {
    this.setState({ editModalVisiable: false, editData: {} })
  }

  createDashboard = async params => {
    await this.props.store.create({
      ...this.props.match.params,
      ...params,
    })
    this.hideCreateModal()
    this.getData()
  }

  editDashboard = async params => {
    const result = await this.props.store.edit({
      ...this.props.match.params,
      ...params,
    })
    this.setState({ editData: result })

    this.getData()
    Notify.success({ content: `${t('Updated Successfully')}!` })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    const { createModalVisiable, editModalVisiable, editData } = this.state
    const { cluster, namespace } = this.props.match.params

    return (
      <div>
        <ListPage {...this.props} getData={this.getData}>
          <Banner {...bannerProps} tabs={this.tabs} />
          <Table
            {...tableProps}
            itemActions={this.itemActions}
            columns={this.getColumns()}
            onCreate={this.showCreateModal}
            searchType="name"
          />
        </ListPage>

        {createModalVisiable && (
          <CreateModal
            store={this.props.store}
            cluster={cluster}
            namespace={namespace}
            isSaving={this.props.store.isSubmitting}
            onCancel={this.hideCreateModal}
            onSave={this.createDashboard}
          />
        )}
        {editModalVisiable && (
          <EditModal
            data={editData}
            cluster={cluster}
            isSaving={this.props.store.isSubmitting}
            onCancel={this.hideEditModal}
            onSave={this.editDashboard}
          />
        )}
      </div>
    )
  }
}
