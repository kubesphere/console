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

import { Notify, Image } from 'components/Base'
import Base from 'core/containers/Base/Detail'
import BaseInfo from 'core/containers/Base/Detail/BaseInfo'
import AppEditModal from 'apps/components/Modals/AppEdit'
import HelmUploadModal from 'apps/components/Modals/HelmUpload'
import AppDeployModal from 'apps/components/Modals/AppDeploy'

import AppStore from 'stores/openpitrix/app'
import VersionStore from 'stores/openpitrix/version'
import {
  getVersionTypesName,
  getAppCategoryNames,
  transferAppStatus,
} from 'utils/app'
import { getLocalTime } from 'utils'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class AppDetail extends Base {
  init() {
    this.store = new AppStore()
    this.versionStore = new VersionStore()
  }

  get authKey() {
    return 'apps'
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get listUrl() {
    return `/workspaces/${this.workspace}/apps`
  }

  getOperations = () => [
    {
      key: 'editApp',
      type: 'control',
      text: t('Edit Info'),
      action: 'manage',
      onClick: this.showModal('editApp'),
    },
    {
      key: 'appDeploy',
      icon: 'snapshot',
      text: t('Deploy'),
      action: 'manage',
      onClick: this.showModal('appDeploy'),
    },
    {
      key: 'addVersion',
      icon: 'tag',
      text: t('New Version'),
      action: 'manage',
      onClick: this.showModal('helmUpload'),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('Delete'),
      action: 'manage',
      onClick: this.showModal('deleteModule'),
    },
  ]

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

  saveApp = params => {
    this.store.update(params).then(() => {
      this.hideModal('editApp')()
      Notify.success({ content: `${t('Modify Successfully')}!` })
      this.fetchData()
    })
  }

  handleAddVersion = params => {
    this.versionStore.create(params).then(() => {
      this.hideModal('helmUpload')()
      Notify.success({ content: `${t('Add Version Successfully')}!` })
      this.fetchData()
    })
  }

  handleDeploy = params => {
    const { workspace, namespace, ...rest } = params
    this.store.deploy(rest, { namespace }).then(() => {
      this.hideModal('appDeploy')()
      Notify.success({ content: `${t('Deploy Successfully')}!` })
      this.fetchData()
    })
  }

  renderSider() {
    const { detail } = this.store

    const icon = (
      <div className={styles.appName}>
        <Image
          iconSize={32}
          iconLetter={detail.name}
          src={detail.icon}
          alt=""
        />
      </div>
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
    const { editApp, helmUpload } = this.state

    return (
      <div>
        <AppEditModal
          isSubmitting={isSubmitting}
          title={t('Edit App Information')}
          description={t('EDIT_APP_DESC')}
          icon={'pen'}
          visible={editApp}
          onOk={this.saveApp}
          onCancel={this.hideModal('editApp')}
          detail={toJS(detail)}
          store={this.store}
        />
        <HelmUploadModal
          title={t('UPLOAD_HELM_TITLE')}
          description={t('New Version')}
          icon={'templet'}
          visible={helmUpload}
          appId={detail.app_id}
          isSubmitting={isSubmitting}
          type={'ADD_VERSION'}
          onOk={this.handleAddVersion}
          onCancel={this.hideModal('helmUpload')}
        />
        <AppDeployModal
          title={detail.name}
          description={detail.description}
          params={this.props.match.params}
          app={toJS(detail)}
          visible={this.state.appDeploy}
          isSubmitting={isSubmitting}
          onOk={this.handleDeploy}
          onCancel={this.hideModal('appDeploy')}
        />
      </div>
    )
  }
}
