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
import { ICON_TYPES } from 'utils/constants'
import { getFormTemplate } from 'utils/form.templates'
import ConfigMapStore from 'stores/configmap'

import { Avatar } from 'components/Base'
import Base from 'core/containers/Base/List'
import CreateModal from 'components/Modals/Create'
import EditYamlModal from 'components/Modals/EditYaml'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import ConfigMapEditModal from 'projects/components/Modals/ConfigMapEdit'

import FORM_STEPS from 'configs/steps/configmaps'

@inject('rootStore')
@observer
export default class ConfigMaps extends Base {
  init() {
    this.store = new ConfigMapStore()
    this.initWebsocket()
  }

  get module() {
    return 'configmaps'
  }

  get name() {
    return 'ConfigMap'
  }

  get steps() {
    return FORM_STEPS
  }

  get formTemplate() {
    const { namespace } = this.props.match.params
    return getFormTemplate(namespace, this.module)
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
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
        key: 'editConfigMap',
        icon: 'pen',
        text: t('Modify Config'),
        action: 'edit',
        onClick: this.showModal('editConfigMapModal'),
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
      title: t('Config Field'),
      dataIndex: 'data',
      isHideable: true,
      width: '33%',
      render: data => Object.keys(data).join(','),
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
    })
  }

  handleEditConfigMap = data => {
    this.store.update(this.state.selectItem, data).then(() => {
      this.hideModal('editConfigMapModal')()
      this.routing.query()
    })
  }

  renderExtraModals() {
    const {
      createModal,
      editModal,
      editYamlModal,
      editConfigMapModal,
      selectItem = {},
    } = this.state
    const { isSubmitting } = this.store

    return (
      <div>
        <CreateModal
          name={this.name}
          module={this.module}
          store={this.store}
          visible={createModal}
          steps={this.steps}
          formTemplate={this.formTemplate}
          isSubmitting={isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
        />
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
        <ConfigMapEditModal
          visible={editConfigMapModal}
          detail={selectItem._originData}
          onOk={this.handleEditConfigMap}
          onCancel={this.hideModal('editConfigMapModal')}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }
}
