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
import { capitalize } from 'lodash'

import { Status, Notify, Button } from 'components/Base'
import Banner from 'components/Cards/Banner'
import EmptyTable from 'components/Cards/EmptyTable'
import Base from 'core/containers/Base/List'
import Avatar from 'apps/components/Avatar'
import CreateModal from 'apps/components/Modals/AppCreate'
import UploadModal from 'apps/components/Modals/HelmUpload'

import { getDateDiff, getDisplayName } from 'utils'
import { transferAppStatus } from 'utils/app'
import AppStore from 'stores/openpitrix/app'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class Apps extends Base {
  init() {
    this.store = new AppStore()
  }

  get authKey() {
    return 'apps'
  }

  get name() {
    return 'Apps'
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get rowKey() {
    return 'app_id'
  }

  get module() {
    return 'apps'
  }

  getData(params) {
    this.store.fetchList({ isv: this.workspace, statistics: true, ...params })
  }

  get tips() {
    return [
      {
        title: t('DEVELOP_APP_TITLE'),
        description: t('DEVELOP_APP_DESC'),
        operation: this.enabledActions.includes('create') ? (
          <Button type="flat" onClick={this.showModal('uploadModal')}>
            {t('Upload Template')}
          </Button>
        ) : null,
        closable: false,
      },
      {
        title: t('HOW_PUBLISH_APP_TITLE'),
        description: t('HOW_PUBLISH_APP_DESC'),
      },
    ]
  }

  getTableProps() {
    return {
      ...Base.prototype.getTableProps.call(this),
      onCreate: this.showModal('createModal'),
      selectActions: [],
    }
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'app_id',
      width: '27%',
      render: (app_id, app) => (
        <Avatar
          isApp
          to={`/workspaces/${this.workspace}/apps/${app_id}`}
          avatarType={'appIcon'}
          avatar={app.icon}
          iconLetter={app.name}
          iconSize={40}
          title={getDisplayName(app)}
          desc={app.description}
        />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      isHideable: true,
      width: '20%',
      render: status => (
        <Status type={status} name={t(capitalize(transferAppStatus(status)))} />
      ),
    },
    {
      title: t('Latest Version'),
      dataIndex: 'latest_app_version.name',
      isHideable: true,
      width: '15%',
    },
    {
      title: t('Deployed Instances'),
      dataIndex: 'cluster_total',
      isHideable: true,
      width: '15%',
      render: total => total || 0,
    },
    {
      title: t('Updated Time'),
      dataIndex: 'update_time',
      isHideable: true,
      width: '20%',
      render: (time, item) => getDateDiff(time || item.status_time) || '-',
    },
  ]

  startUpload = () => {
    this.hideModal('createModal')()
    this.showModal('uploadModal')()
  }

  handleCreate = params => {
    this.store.create({ ...params, isv: this.workspace }).then(() => {
      this.hideModal('uploadModal')()
      Notify.success({ content: `${t('Created Successfully')}!` })
      this.store.fetchList({ isv: this.workspace })
    })
  }

  renderEmpty() {
    const onCreate = this.enabledActions.includes('create')
      ? this.showModal('createModal')
      : null

    return (
      <EmptyTable
        name={this.name}
        createText={t('Upload Template')}
        onCreate={onCreate}
        {...this.getEmptyProps()}
      />
    )
  }

  renderBannerImages() {
    return (
      <>
        <img src={'/assets/banner/shape-5.svg'} className={styles.img1} />
        <img src={'/assets/banner/shape-3.svg'} className={styles.img2} />
        <img src={'/assets/banner/shape-4.svg'} className={styles.img3} />
      </>
    )
  }

  renderHeader() {
    return (
      <Banner
        className={styles.header}
        title={t('App Templates')}
        description={t('APP_TEMPLATE_DESCRIPTION')}
        module={this.module}
        tips={this.tips}
        extra={this.renderBannerImages()}
      />
    )
  }

  renderModals() {
    const { isSubmitting } = this.store
    const { createModal, uploadModal } = this.state

    return (
      <div>
        <CreateModal
          visible={createModal}
          onOk={this.startUpload}
          onCancel={this.hideModal('createModal')}
        />
        <UploadModal
          title={t('UPLOAD_HELM_TITLE')}
          description={t('UPLOAD_HELM_DESC')}
          icon={'templet'}
          type={'CREATE_APP'}
          visible={uploadModal}
          isSubmitting={isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideModal('uploadModal')}
        />
      </div>
    )
  }
}
