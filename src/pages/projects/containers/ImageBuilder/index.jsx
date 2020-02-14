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
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { reaction } from 'mobx'
import { parse } from 'qs'
import { get } from 'lodash'

import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES } from 'utils/constants'
import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import STEPS from 'configs/steps/imagebuilder'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import CreateModal from 'components/Modals/Create'
import FORM_TEMPLATES from 'utils/form.templates'

import S2IBuilderStore from 'stores/s2i/builder'

import Base from 'core/containers/Base/List'

class ImageBuilder extends Base {
  init() {
    this.store = new S2IBuilderStore(this.module)
    this.freshDisposer = reaction(
      () => this.store.list.isLoading,
      () => {
        const isRunning = this.store.list.data.some(
          detail => get(detail, 'status.lastRunState', 'Running') === 'Running'
        )
        clearTimeout(this.freshTimer)
        if (isRunning) {
          this.freshTimer = setTimeout(this.handleFresh, 4000)
        }
      },
      { fireImmediately: true }
    )
  }

  get module() {
    return 's2ibuilders'
  }

  get name() {
    return 'Image Builder'
  }

  get steps() {
    return STEPS
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        onClick: this.showModal('editModal'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        onClick: this.showModal('deleteModal'),
      },
    ]
  }

  get formTemplate() {
    const { namespace } = this.props.match.params

    return FORM_TEMPLATES.s2ibuilders({ namespace })
  }

  unMountActions = () => {
    this.freshDisposer && this.freshDisposer()
    clearTimeout(this.freshTimer)
  }

  handleFresh = () => {
    const params = parse(location.search.slice(1))
    this.getData({ ...params, silent: true })
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      render: (name, record) => (
        <Avatar
          icon={ICON_TYPES[this.module]}
          iconSize={40}
          title={getDisplayName(record)}
          desc={
            record.serviceName
              ? t('Build image for service x', {
                  service: record.serviceName,
                })
              : '-'
          }
          to={`${this.prefix}/${name}`}
        />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      isHideable: true,
      width: '15%',
      render: status => {
        let _status = get(status, 'lastRunState', '')
        _status = _status === 'Running' ? 'Building' : _status
        return (
          <Status
            name={t(_status || 'Not running yet')}
            type={_status || 'Unknown'}
            flicker
          />
        )
      },
    },
    {
      title: t('type'),
      dataIndex: 'type',
      isHideable: true,
      width: '15%',
      render: type => t(type),
    },
    {
      title: t('Service'),
      dataIndex: 'serviceName',
      width: '15%',
      render: name => {
        if (name) {
          return <Link to={`./services/${name}/`}>{name}</Link>
        }
        return '-'
      },
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
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

  renderHeader() {
    return (
      <Banner
        className="margin-b12"
        title={t(this.title)}
        description={t(`IMAGE_BUILDER_DESC`)}
        module={this.module}
        tips={this.tips}
      />
    )
  }

  renderExtraModals() {
    const { editModal, selectItem = {}, createModal } = this.state
    const { namespace } = this.props.match.params

    return (
      <div>
        <CreateModal
          noCodeEdit
          namespace={namespace}
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
        <EditBasicInfoModal
          visible={editModal}
          detail={selectItem._originData}
          isSubmitting={this.store.isSubmitting}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editModal')}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(ImageBuilder))
export const Component = ImageBuilder
