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
import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES, SERVICE_TYPES } from 'utils/constants'
import { getFormTemplate } from 'utils/form.templates'

import ServiceStore from 'stores/service'
import WorkloadStore from 'stores/workload'

import Base from 'core/containers/Base/List'
import { Text, Avatar, Notify } from 'components/Base'
import EditYamlModal from 'components/Modals/EditYaml'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import EditGatewayModal from 'projects/components/Modals/ServiceGatewaySetting'
import CreateServiceModal from 'projects/components/Modals/ServiceCreate'
import EditServiceModal from 'projects/components/Modals/ServiceSetting'
import DeleteServiceModal from 'projects/components/Modals/ServiceDelete'

@inject('rootStore')
@observer
export default class Services extends Base {
  init() {
    this.store = new ServiceStore(this.module)

    this.workloadStore = new WorkloadStore()
  }

  get module() {
    return 'services'
  }

  get name() {
    return 'Service'
  }

  get formTemplate() {
    const { namespace } = this.props.match.params
    return getFormTemplate(namespace, this.module)
  }

  get tips() {
    return [
      {
        title: t('SERVICE_TYPES_Q'),
        description: t('SERVICE_TYPES_A'),
      },
      {
        title: t('SCENARIOS_FOR_SERVICES_Q'),
        description: t('SCENARIOS_FOR_SERVICES_A'),
      },
    ]
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        action: 'edit',
        onClick: this.showModal('editModal'),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('Edit YAML'),
        action: 'edit',
        onClick: this.showModal('editYamlModal'),
      },
      {
        key: 'editService',
        icon: 'network-router',
        text: t('Edit Service'),
        action: 'edit',
        onClick: this.showModal('editServiceModal'),
      },
      {
        key: 'editGateway',
        icon: 'ip',
        text: t('Edit Internet Access'),
        action: 'edit',
        show: record => record.type === SERVICE_TYPES.VirtualIP,
        onClick: this.showModal('editGatewayModal'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showModal('deleteModal'),
      },
    ]
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: true,
      sortOrder: this.getSortOrder('name'),
      search: true,
      width: '24%',
      render: (name, record) => (
        <Avatar
          icon={ICON_TYPES[this.module]}
          iconSize={40}
          title={getDisplayName(record)}
          desc={record.description || '-'}
          to={`${this.prefix}/${name}`}
        />
      ),
    },
    {
      title: t('Service Type'),
      dataIndex: 'annotations["kubesphere.io/serviceType"]',
      isHideable: true,
      width: '16%',
      render: (serviceType, record) => (
        <Text
          title={
            serviceType
              ? t(`SERVICE_TYPE_${serviceType.toUpperCase()}`)
              : t('Custom Creation')
          }
          description={record.type || '-'}
        />
      ),
    },
    {
      title: t('Internet Access'),
      dataIndex: 'specType',
      isHideable: true,
      width: '20%',
      render: (type, record) => {
        if (type === 'ClusterIP') {
          return '-'
        }

        if (type === 'NodePort') {
          return (
            <Text
              description={type}
              title={record.ports
                .filter(port => port.nodePort)
                .map(port => `${port.port}:${port.nodePort}/${port.protocol}`)
                .join(';')}
            />
          )
        }

        return (
          <Text
            description={type}
            title={record.loadBalancerIngress || record.externalName}
          />
        )
      },
    },
    {
      title: t('Application'),
      dataIndex: 'app',
      isHideable: true,
      search: true,
      width: '16%',
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      sorter: true,
      sortOrder: this.getSortOrder('createTime'),
      isHideable: true,
      width: 150,
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'more',
      width: 20,
      render: this.renderMore,
    },
  ]

  handleYamlEdit = newObject => {
    const { selectItem } = this.state

    this.store.update(selectItem, newObject).then(() => {
      this.hideModal('editYamlModal')()
      this.routing.query()
    })
  }

  handleEditGateway = newObject => {
    const { selectItem } = this.state

    this.store.update(selectItem, newObject).then(() => {
      this.hideModal('editGatewayModal')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.routing.query()
    })
  }

  handleEditService = newObject => {
    const { selectItem } = this.state

    this.store.update(selectItem, newObject).then(() => {
      this.hideModal('editServiceModal')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.routing.query()
    })
  }

  renderModals() {
    const { isSubmitting } = this.store
    const {
      createModal,
      editModal,
      editYamlModal,
      editGatewayModal,
      editServiceModal,
      deleteModal,
      batchDeleteModal,
      selectItem = {},
    } = this.state
    const { namespace } = this.props.match.params

    return (
      <>
        <CreateServiceModal
          visible={createModal}
          namespace={namespace}
          store={this.store}
          workloadStore={this.workloadStore}
          isSubmitting={isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
        />
        <DeleteServiceModal
          resource={selectItem}
          visible={deleteModal}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModal')}
          isSubmitting={isSubmitting}
        />
        {this.list.selectedRowKeys && (
          <DeleteServiceModal
            resource={this.list.data.filter(item =>
              this.list.selectedRowKeys.includes(item.name)
            )}
            visible={batchDeleteModal}
            onOk={this.handleBatchDelete}
            onCancel={this.hideModal('batchDeleteModal')}
            isSubmitting={isSubmitting}
          />
        )}
        <EditBasicInfoModal
          visible={editModal}
          detail={selectItem._originData}
          isSubmitting={isSubmitting}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editModal')}
        />
        <EditYamlModal
          store={this.store}
          visible={editYamlModal}
          detail={selectItem._originData}
          isSubmitting={isSubmitting}
          onOk={this.handleYamlEdit}
          onCancel={this.hideModal('editYamlModal')}
        />
        <EditGatewayModal
          visible={editGatewayModal}
          detail={selectItem._originData}
          onOk={this.handleEditGateway}
          onCancel={this.hideModal('editGatewayModal')}
          isSubmitting={isSubmitting}
        />
        <EditServiceModal
          visible={editServiceModal}
          detail={selectItem._originData}
          type={selectItem.type}
          onOk={this.handleEditService}
          onCancel={this.hideModal('editServiceModal')}
          isSubmitting={isSubmitting}
        />
      </>
    )
  }
}
