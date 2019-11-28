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
import { get } from 'lodash'

import FORM_STEPS from 'configs/steps/storageclasses'
import FORM_TEMPLATES from 'utils/form.templates'
import { ICON_TYPES, MODULE_KIND_MAP } from 'utils/constants'
import StorageClassStore from 'stores/storageClass'

import { Avatar } from 'components/Base'
import CreateModal from 'components/Modals/Create'
import Banner from 'components/Cards/Banner'
import Base from 'core/containers/Base/List'

@inject('rootStore')
@observer
class StorageClasses extends Base {
  init() {
    this.store = new StorageClassStore()

    this.state = {
      selectStorageClass: {},
    }
  }

  get module() {
    return 'storageclasses'
  }

  get name() {
    return 'Storage Class'
  }

  get title() {
    return 'Storage Classes'
  }

  get formTemplate() {
    const kind = MODULE_KIND_MAP[this.module]

    if (!kind) {
      return {}
    }

    const template = FORM_TEMPLATES[this.module]()

    return {
      [kind]: template,
    }
  }

  get steps() {
    return FORM_STEPS
  }

  get quotas() {
    const { data, total } = this.store.list

    const defaultStorageClass = data.find(item => item.default) || {}

    return [
      { name: t('Storage Class'), value: total },
      {
        name: t('Default Storage Class'),
        value: defaultStorageClass.name || '-',
      },
    ]
  }

  getColumns = () => [
    {
      title: t('Name'),
      key: 'name',
      dataIndex: 'name',
      sorter: true,
      sortOrder: this.getSortOrder('name'),
      search: true,
      render: name => (
        <Avatar
          icon={ICON_TYPES[this.module]}
          to={`${this.prefix}/${name}`}
          title={name}
        />
      ),
    },
    {
      title: t('Volume Count'),
      dataIndex: 'volumeCount',
      isHideable: true,
      render: (count, record) =>
        get(record, 'annotations["kubesphere.io/pvc-count"]') || 0,
    },
    {
      title: t('Default'),
      dataIndex: 'default',
      isHideable: true,
      render: value => (value ? t('Yes') : '-'),
    },
    {
      title: t('Provisioner'),
      dataIndex: 'provisioner',
      isHideable: true,
    },
  ]

  renderExtraModals() {
    const { createModal } = this.state

    return (
      <CreateModal
        name={this.name}
        module={this.module}
        store={this.store}
        visible={createModal}
        steps={this.steps}
        formTemplate={this.formTemplate}
        isSubmitting={this.store.isSubmitting}
        onOk={this.handleCreate}
        onCancel={this.hideModal('createModal')}
      />
    )
  }

  renderHeader() {
    return (
      <Banner
        className="margin-b12"
        title={t(this.title)}
        description={t(`${this.name.toUpperCase()}_DESC`)}
        quotas={this.quotas}
        module={this.module}
      />
    )
  }
}

export default StorageClasses
