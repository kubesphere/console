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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'

import { Notify } from '@kube-design/components'
import UploadInfo from 'apps/components/Cards/UploadInfo'
import VersionStore from 'stores/openpitrix/version'
import FileStore from 'stores/openpitrix/file'
import { CAN_EDIT_STATUS } from 'configs/openpitrix/version'

import styles from './index.scss'

@observer
export default class ConfigFile extends React.Component {
  static propTypes = {
    appId: PropTypes.string,
    versionId: PropTypes.string,
    appName: PropTypes.string,
  }

  static defaultProps = {
    appId: '',
    versionId: '',
    appName: '',
  }

  constructor(props) {
    super(props)

    this.store = new VersionStore()
    this.fileStore = new FileStore()
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.versionId !== this.props.versionId) {
      this.fetchData()
    }
  }

  fetchData = () => {
    const { appId, versionId } = this.props

    if (appId && versionId) {
      this.store.fetchDetail({
        app_id: appId,
        version_id: versionId,
      })
    }
  }

  getPackageName = () => {
    const { appName } = this.props
    const { package_name: packageName, name = '' } = this.store.detail

    if (!packageName || packageName.startsWith('att-')) {
      return `${appName}-${name}`
    }

    return packageName
  }

  modifyPackage = async params => {
    await this.store.update(params)
    Notify.success({ content: `${t('Modify Successfully')}` })
    await this.fetchData()
  }

  renderUpdate() {
    const { detail } = this.store

    if (!detail.description) {
      return (
        <div className={styles.updateInfo}>
          <pre>{t('No version information')}</pre>
        </div>
      )
    }

    return (
      <div className={styles.updateInfo}>
        <div className={styles.title}>{t('Version Update Info')}</div>
        <pre>{detail.description}</pre>
      </div>
    )
  }

  render() {
    const { detail } = this.store

    return (
      <div className={styles.main}>
        <UploadInfo
          fileStore={this.fileStore}
          onOk={this.modifyPackage}
          packageName={this.getPackageName()}
          updateTime={detail.update_time || detail.status_time}
          type={'MODIFY_VERSION'}
          appId={detail.app_id}
          versionId={detail.version_id}
          canEdit={CAN_EDIT_STATUS.includes(detail.status)}
          className={styles.uploadInfo}
          hasPackage
        />
        {this.renderUpdate()}
      </div>
    )
  }
}
