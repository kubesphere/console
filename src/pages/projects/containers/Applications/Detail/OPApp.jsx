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
import { Notify, Image } from 'components/Base'
import BaseInfo from 'core/containers/Base/Detail/BaseInfo'
import DeleteModal from 'components/Modals/Delete'
import Base from 'core/containers/Base/Detail'
import EditModal from 'projects/components/Modals/AppEdit'
import AppStore from 'stores/openpitrix/application'

import styles from './index.scss'

class ApplicationDetail extends Base {
  get name() {
    return 'Application'
  }

  init() {
    this.store = new AppStore()
  }

  get detailDesc() {
    return get(this.store.detail, 'description')
  }

  get listUrl() {
    return `/projects/${this.namespace}/${this.module}`
  }

  getOperations = () => {
    const detail = toJS(this.store.detail)

    const operations = [
      {
        key: 'edit',
        type: 'control',
        text: t('EDIT'),
        action: 'edit',
        onClick: this.showModal('editBaseInfo'),
      },
    ]

    if (detail && detail.status === 'deleted') {
      operations.push({
        key: 'destroy',
        type: 'danger',
        text: t('Destroy'),
        action: 'delete',
        onClick: this.showModal('destroyModule'),
      })
    } else {
      operations.push({
        key: 'delete',
        type: 'danger',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showModal('deleteModule'),
      })
    }

    return operations
  }

  getAttrs = () => {
    const detail = toJS(this.store.detail)

    return [
      {
        name: t('Project'),
        value: this.namespace,
      },
      {
        name: t('Application'),
        value: get(detail, 'app.name', '-'),
      },
      {
        name: t('Version'),
        value: get(detail, 'version.name', '-'),
      },
      {
        name: t('Created Time'),
        value: getLocalTime(get(detail, 'create_time')).format(
          'YYYY-MM-DD HH:mm:ss'
        ),
      },
      {
        name: t('Updated Time'),
        value: getLocalTime(get(detail, 'status_time')).format(
          'YYYY-MM-DD HH:mm:ss'
        ),
      },
      {
        name: t('Creator'),
        value: get(detail, 'owner', '-'),
      },
    ]
  }

  handleEdit = data => {
    const { cluster_id, zone } = this.store.detail
    this.store.patch({ cluster_id, zone }, data).then(() => {
      this.hideModal('editBaseInfo')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.fetchData()
    })
  }

  handleDestroy = () => {
    this.store.destroy(this.store.detail.cluster).then(() => {
      this.hideModal('destroyModule')()
      this.deleteCallback()
    })
  }

  isInvalidRoute(route) {
    return !route.name
  }

  renderSider() {
    const detail = toJS(this.store.detail)

    const icon = (
      <label className={styles.icon}>
        <Image
          iconLetter={get(detail, 'app.name')}
          src={get(detail, 'app.icon')}
          alt=""
        />
      </label>
    )

    return (
      <BaseInfo
        icon={icon}
        name={get(detail, 'name', '')}
        desc={this.detailDesc}
        operations={this.getEnabledOperations()}
        labels={this.labels}
        attrs={this.getAttrs()}
      />
    )
  }

  renderExtraModals() {
    const { detail, isSubmitting } = this.store
    const { editBaseInfo, destroyModule } = this.state

    return (
      <div>
        <EditModal
          visible={editBaseInfo}
          detail={toJS(detail)}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editBaseInfo')}
          isSubmitting={isSubmitting}
        />
        <DeleteModal
          title={t('DESTROY_TITLE')}
          desc={t.html('DESTROY_TIP', {
            type: t('Application'),
            resource: detail.name,
          })}
          visible={destroyModule}
          onOk={this.handleDestroy}
          onCancel={this.hideModal('destroyModule')}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(ApplicationDetail))
export const Component = ApplicationDetail
