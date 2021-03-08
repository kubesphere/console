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

import { trigger } from 'utils/action'

import DetailPage from 'core/containers/Base/Detail'
import { Image } from 'components/Base'

import AppStore from 'stores/openpitrix/app'
import VersionStore from 'stores/openpitrix/version'
import {
  getVersionTypesName,
  getAppCategoryNames,
  transferAppStatus,
} from 'utils/app'
import { getLocalTime } from 'utils'

import routes from './routes'

import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
export default class RoleDetail extends React.Component {
  store = new AppStore()

  versionStore = new VersionStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return this.store.module
  }

  get authKey() {
    return 'app-templates'
  }

  get name() {
    return 'Apps'
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get listUrl() {
    return `/workspaces/${this.workspace}/apps`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => {
    const detail = toJS(this.store.detail)
    return [
      {
        key: 'editApp',
        type: 'control',
        text: t('Edit Info'),
        action: 'manage',
        onClick: () =>
          this.trigger('openpitrix.template.edit', {
            detail,
            title: t('Edit App Information'),
            description: t('EDIT_APP_DESC'),
            icon: 'pen',
            success: () => this.fetchData(),
          }),
      },
      {
        key: 'appDeploy',
        icon: 'snapshot',
        text: t('Deploy'),
        action: 'manage',
        onClick: () =>
          this.trigger('openpitrix.template.deploy', {
            ...this.props.match.params,
            app: detail,
          }),
      },
      {
        key: 'addVersion',
        icon: 'tag',
        text: t('New Version'),
        action: 'manage',
        onClick: () =>
          this.trigger('openpitrix.template.addVersion', {
            title: t('UPLOAD_HELM_TITLE'),
            description: t('New Version'),
            icon: 'templet',
            appId: detail.app_id,
            type: 'ADD_VERSION',
            workspace: detail.workspace,
            versionStore: this.versionStore,
            success: () => this.fetchData(),
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'manage',
        onClick: () =>
          this.trigger('openpitrix.template.delete', {
            detail,
            versions: this.versionStore.list.data,
            success: () => this.routing.push(this.listUrl),
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

  renderIcon = () => {
    const { detail } = this.store
    return (
      <div className={styles.appName}>
        <Image
          iconSize={32}
          iconLetter={detail.name}
          src={detail.icon}
          alt=""
        />
      </div>
    )
  }

  render() {
    const stores = { detailStore: this.store, versionStore: this.versionStore }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      icon: this.renderIcon(),
      module: this.module,
      authKey: this.authKey,
      name: this.store.detail.name,
      desc: this.store.detail.description,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('App Templates'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
