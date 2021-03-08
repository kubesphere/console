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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { get, capitalize } from 'lodash'
import { Loading } from '@kube-design/components'

import { Image } from 'components/Base'
import { getLocalTime, getDisplayName } from 'utils'
import { trigger } from 'utils/action'
import {
  getVersionTypesName,
  getAppCategoryNames,
  transferAppStatus,
} from 'utils/app'
import AppStore from 'stores/openpitrix/app'
import VersionStore from 'stores/openpitrix/version'

import DetailPage from 'core/containers/Base/Detail'

import routes from './routes'

import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
export default class AppDetail extends React.Component {
  store = new AppStore()

  versionStore = new VersionStore()

  componentDidMount() {
    this.fetchData()
    this.store.isAdmin = true
  }

  get module() {
    return this.store.module
  }

  get authKey() {
    return 'apps'
  }

  get name() {
    return 'App'
  }

  get listUrl() {
    return '/apps-manage/store'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => {
    const { detail } = this.store

    if (detail.status === 'active') {
      return [
        {
          key: 'suspend',
          type: 'control',
          icon: 'sort-descending',
          text: t('Suspend App'),
          onClick: () =>
            this.trigger('openpitrix.template.action', {
              detail,
              handleType: 'suspend',
              success: this.fetchData,
            }),
        },
      ]
    }

    return [
      {
        key: 'recover',
        type: 'control',
        icon: 'sort-ascending',
        text: t('Activate App'),
        onClick: () =>
          this.trigger('openpitrix.template.action', {
            detail,
            handleType: 'recover',
            success: this.fetchData,
          }),
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
        name: t('Workspace'),
        value: get(detail, 'isv', '-'),
      },
      {
        name: t('Created Time'),
        value: getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  render() {
    const stores = { detailStore: this.store, versionStore: this.versionStore }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const { detail } = this.store

    const icon = (
      <label className={styles.icon}>
        <Image iconLetter={detail.name} src={detail.icon} alt="" />
      </label>
    )

    const sideProps = {
      icon,
      module: this.module,
      authKey: this.authKey,
      name: getDisplayName(this.store.detail),
      desc: this.store.detail.description,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('App Store'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
