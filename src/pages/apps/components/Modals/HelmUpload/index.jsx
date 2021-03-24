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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon, Notify } from '@kube-design/components'

import { Modal } from 'components/Base'
import UploadInfo from 'apps/components/Cards/UploadInfo'
import CreateInfo from 'apps/components/Cards/CreateInfo'
import { OPENPITRIX_LINKS } from 'configs/openpitrix/app'
import FileStore from 'stores/openpitrix/file'

import typeFiles from './files'
import styles from './index.scss'

export default class HelmUpload extends Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    errorFiles: PropTypes.array,
    appId: PropTypes.string,
    type: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    errorFiles: [],
    type: 'CREATE_APP',
    appId: '',
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.fileStore = new FileStore()
    this.state = {
      checkStatus: 'init',
      canCreate: false,
      resultInfo: {},
      icon: '',
    }
  }

  reset = () => {
    this.setState({
      canCreate: false,
      checkStatus: 'init',
    })
  }

  changeCheckStatus = (result = {}) => {
    this.setState({ checkStatus: result.status, resultInfo: result })
  }

  changeIcon = icon => {
    this.setState({ icon })
  }

  onCancel = () => {
    this.props.onCancel()
    this.reset()
  }

  createApp = async () => {
    const { type, onOk } = this.props
    const { canCreate } = this.state

    if (canCreate) {
      const { icon, resultInfo } = this.state
      const iconStr = icon || resultInfo.icon

      const data = {
        version_type: 'helm',
        name: resultInfo.name,
        base64Str: resultInfo.base64Str,
        icon: iconStr,
      }

      this.fileStore.uploadPackage(type, data, onOk).then(() => {
        this.reset()
      })
    } else {
      this.setState({ canCreate: !canCreate })
    }
  }

  handleSubmit = () => {
    const { appId, workspace, type, onOk } = this.props
    const { resultInfo } = this.state

    if (this.state.checkStatus !== 'success') {
      Notify.error({
        content: `${t('UPLOAD_PACKAGE_OK_NOTE')}`,
      })
      return false
    }

    if (type === 'CREATE_APP') {
      this.createApp()
    } else {
      const params = {
        type: 'helm',
        app_id: appId,
        workspace,
        base64Str: resultInfo.base64Str,
      }
      this.fileStore.uploadPackage(type, params, onOk).then(() => {
        this.setState({ checkStatus: 'init' })
      })
    }
  }

  renderCheckFiles() {
    const { errorFiles } = this.props

    return (
      <div>
        <div className={styles.checkFiles}>
          <ul>
            {typeFiles.map(file => (
              <li
                key={file.name}
                className={classnames({
                  [styles.error]: errorFiles.includes(file.name),
                })}
              >
                <span className={styles.name}>{file.name}</span>
                <div className={styles.description}>
                  #&nbsp;&nbsp;
                  {file.isOptional && (
                    <span>[{t('optional')}]&nbsp;&nbsp;</span>
                  )}
                  {t(file.description)}
                </div>
              </li>
            ))}
          </ul>
          {this.state.checkStatus !== 'success' && (
            <div className={styles.configMask} />
          )}
        </div>
        <div className={styles.note}>
          💁‍♂️ {t('APP_CREATE_GUIDE')}
          <a
            href={OPENPITRIX_LINKS.helm_developer_guide}
            target="_blank"
            rel="noreferrer noopener"
          >
            {t('HELM_DEVELOP_GUIDE')}
          </a>
        </div>
      </div>
    )
  }

  render() {
    const { appId, ...rest } = this.props
    const { canCreate, resultInfo } = this.state

    return (
      <Modal
        width={960}
        bodyClassName={styles.body}
        {...rest}
        onOk={this.handleSubmit}
        onCancel={this.onCancel}
        disableSubmit={!resultInfo.name}
      >
        <div className={styles.content}>
          <div className={styles.helmIcon}>
            <Icon name={'helm'} size={60} />
          </div>
          <UploadInfo
            className={classnames(styles.upload, {
              [styles.canCreate]: canCreate,
            })}
            canCreate={canCreate}
            changeCheckStatus={this.changeCheckStatus}
            fileStore={this.fileStore}
            appId={appId}
          />
          {canCreate ? (
            <CreateInfo
              createInfo={resultInfo}
              uploadIcon={this.changeIcon}
              fileStore={this.fileStore}
            />
          ) : (
            this.renderCheckFiles()
          )}
        </div>
      </Modal>
    )
  }
}
