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

import { get } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { getLocalTime } from 'utils'
import { Notify } from 'components/Base'
import BaseInfo from 'core/containers/Base/Detail/BaseInfo'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import AddComponentModal from 'projects/components/Modals/AddComponent'
import Base from 'core/containers/Base/Detail'
import AppStore from 'stores/application/crd'

import styles from './index.scss'

class ApplicationDetail extends Base {
  get name() {
    return 'Application'
  }

  init() {
    this.store = new AppStore(this.module)
  }

  get detailDesc() {
    return get(this.store.detail, 'description')
  }

  get listUrl() {
    const { cluster, namespace } = this.props.match.params
    return `/cluster/${cluster}/projects/${namespace}/${this.module}/composing`
  }

  getOperations = () => [
    {
      key: 'edit',
      type: 'control',
      text: t('EDIT'),
      action: 'edit',
      onClick: this.showModal('editBaseInfo'),
    },
    {
      key: 'addComponent',
      text: t('Add Component'),
      action: 'edit',
      onClick: this.showModal('addComponent'),
    },
    {
      key: 'delete',
      text: t('Delete'),
      action: 'delete',
      onClick: this.showModal('deleteModule'),
    },
  ]

  getAttrs = () => {
    const detail = toJS(this.store.detail)

    const appName = get(detail, 'labels["app.kubernetes.io/name"]')
    return [
      {
        name: t('Project'),
        value: detail.namespace,
      },
      {
        name: t('Application'),
        value: appName,
      },
      {
        name: t('Version'),
        value: detail.version,
      },
      {
        name: t('Created Time'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('Updated Time'),
        value: getLocalTime(detail.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('Creator'),
        value: get(detail, 'creator', '-'),
      },
    ]
  }

  handleEdit = data => {
    this.store.patch(this.params, data).then(() => {
      this.hideModal('editBaseInfo')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.fetchData()
    })
  }

  handleAddComponent = data => {
    this.store.addComponent(data, this.params).then(() => {
      this.hideModal('addComponent')()
      Notify.success({ content: `${t('Add Component Successfully')}!` })
      this.fetchData()
    })
  }

  handleImageOnError(e) {
    if (e.target.src !== '/assets/default-app.svg') {
      e.target.src = '/assets/default-app.svg'
    }
  }

  isInvalidRoute(route) {
    const { detail } = this.store
    if (
      get(detail, 'annotations["servicemesh.kubesphere.io/enabled"]') !== 'true'
    ) {
      return route.servicemesh
    }

    return !route.name
  }

  renderSider() {
    const detail = toJS(this.store.detail)

    const icon = (
      <img
        className={styles.icon}
        src={get(detail, 'icon', '/assets/default-app.svg')}
        alt=""
        onError={this.handleImageOnError}
      />
    )

    return (
      <BaseInfo
        icon={icon}
        name={this.detailName}
        desc={this.detailDesc}
        operations={this.getEnabledOperations()}
        labels={this.labels}
        attrs={this.getAttrs()}
      />
    )
  }

  renderExtraModals() {
    const { detail, isSubmitting } = this.store
    const { editBaseInfo, addComponent } = this.state

    const { namespace } = this.props.match.params

    return (
      <div>
        <EditBasicInfoModal
          visible={editBaseInfo}
          detail={toJS(detail._originData)}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editBaseInfo')}
          isSubmitting={isSubmitting}
        />
        <AddComponentModal
          visible={addComponent}
          namespace={namespace}
          detail={toJS(detail)}
          onOk={this.handleAddComponent}
          onCancel={this.hideModal('addComponent')}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(ApplicationDetail))
export const Component = ApplicationDetail
