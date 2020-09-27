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
import { computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { get, capitalize } from 'lodash'

import { Notify } from '@kube-design/components'
import { Image } from 'components/Base'
import Confirm from 'apps/components/Confirm'
import Base from 'core/containers/Base/Detail'
import BaseInfo from 'core/containers/Base/Detail/BaseInfo'

import AppStore from 'stores/openpitrix/app'
import VersionStore from 'stores/openpitrix/version'
import {
  getVersionTypesName,
  getAppCategoryNames,
  transferAppStatus,
} from 'utils/app'
import { HANDLE_TYPE_TO_SHOW } from 'configs/openpitrix/version'
import { getLocalTime } from 'utils'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class AppDetail extends Base {
  init() {
    this.store = new AppStore()
    this.versionStore = new VersionStore()
    this.store.isAdmin = true
  }

  @computed
  get detailName() {
    const { name } = this.store.detail

    return name
  }

  @computed
  get detailDesc() {
    const { description } = this.store.detail

    return description
  }

  get listUrl() {
    return '/apps-manage/store'
  }

  getOperations = () => {
    const { status } = this.store.detail

    if (status === 'active') {
      return [
        {
          key: 'suspend',
          type: 'control',
          icon: 'sort-descending',
          text: t('Suspend App'),
          onClick: this.showHandleModel('suspend'),
        },
      ]
    }

    return [
      {
        key: 'recover',
        type: 'control',
        icon: 'sort-ascending',
        text: t('Activate App'),
        onClick: this.showHandleModel('recover'),
      },
    ]
  }

  getAttrs = () => {
    const detail = toJS(this.store.detail)
    const createTime = get(detail, 'create_time', new Date())

    return [
      {
        name: t('App Number'),
        value: detail.app_id,
      },
      {
        name: t('Status'),
        value: t(capitalize(transferAppStatus(detail.status))),
      },
      {
        name: t('Category'),
        value: getAppCategoryNames(get(detail, 'category_set', [])),
      },
      {
        name: t('App Version Types'),
        value: getVersionTypesName(get(detail, 'app_version_types', '')),
      },
      {
        name: t('App Provider'),
        value: get(detail, 'isv', '-'),
      },
      {
        name: t('Created Time'),
        value: getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  showHandleModel = type => () => {
    this.showModal('handleConfirm')()
    this.setState({ handleType: type })
  }

  handleApp = () => {
    const { handleType } = this.state
    const { appId } = this.props.match.params

    this.store.handle({ action: handleType, app_id: appId }).then(() => {
      const type = HANDLE_TYPE_TO_SHOW[handleType] || handleType
      this.hideModal('handleConfirm')()
      Notify.success({
        content: `${t(`${capitalize(type)} Successfully`)}!`,
      })
      this.fetchData()
    })
  }

  renderSider() {
    const { detail } = this.store

    const icon = (
      <label className={styles.icon}>
        <Image iconLetter={detail.name} src={detail.icon} alt="" />
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
    const { handleType } = this.state

    return (
      <div>
        <Confirm
          content={t.html(
            `APP_${(handleType || 'suspend').toUpperCase()}_TIP`,
            {
              name: get(this.props, 'detail.name', ''),
            }
          )}
          visible={this.state.handleConfirm}
          onOk={this.handleApp}
          onCancel={this.hideModal('handleConfirm')}
          isSubmitting={this.store.isSubmitting}
        />
      </div>
    )
  }
}
