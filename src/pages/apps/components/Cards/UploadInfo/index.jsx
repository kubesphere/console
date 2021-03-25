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
import { Icon, Button, Notify, Loading } from '@kube-design/components'

import { Upload } from 'components/Base'
import { UPLOAD_STATUS_WORD, UPLOAD_FILE_TYPES } from 'configs/openpitrix/app'
import { getLocalTime } from 'utils'

import styles from './index.scss'

export default class UploadInfo extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    appId: PropTypes.string,
    versionId: PropTypes.string,
    packageName: PropTypes.string,
    updateTime: PropTypes.string,
    hasPackage: PropTypes.bool,
    canCreate: PropTypes.bool,
    canEdit: PropTypes.bool,
    onOk: PropTypes.func,
    changeCheckStatus: PropTypes.func,
    fileStore: PropTypes.object,
  }

  static defaultProps = {
    type: 'CREATE_APP',
    appId: '',
    versionId: '',
    packageName: '',
    updateTime: '',
    hasPackage: false,
    canCreate: false,
    canEdit: false,
    onOk() {},
    changeCheckStatus() {},
    fileStore: {},
  }

  constructor(props) {
    super(props)

    this.fileStore = this.props.fileStore
    this.state = {
      errorInfo: '',
      status: 'init',
    }
  }

  showPackage = () => {
    const { hasPackage, canCreate, canEdit } = this.props
    return (hasPackage || canCreate || canEdit) && this.state.status === 'init'
  }

  onUploadClick = e => {
    e.stopPropagation()
    this.uploadRef.onClick()
  }

  checkPackage = async file => {
    await this.setState({
      status: 'uploading',
      fileName: file.name,
    })

    const { checkFile, handleFileByBase64Str } = this.fileStore
    const result = checkFile(file, 'package')
    if (result) {
      this.setState({
        errorInfo: result,
        status: 'error',
      })
    } else {
      await handleFileByBase64Str(file, this.validatePackage)
    }

    return Promise.reject()
  }

  validatePackage = async base64Str => {
    const { versionId, type, changeCheckStatus, appId, onOk } = this.props
    const { validatePackage, uploadPackage } = this.fileStore
    const result = await validatePackage(base64Str, appId)
    const status = result.error ? 'error' : 'success'
    this.setState({
      missFile: result.missFile,
      errorInfo: result.error,
      status,
    })
    changeCheckStatus({ status, ...result })

    if (type === 'MODIFY_VERSION' && status === 'success') {
      uploadPackage(
        type,
        {
          version_id: versionId,
          app_id: appId,
          name: result.version_name,
          base64Str: result.base64Str,
        },
        onOk
      )
      this.setState({ status: 'init' })
    }
  }

  downloadPackage = () => {
    const { appId, versionId, packageName } = this.props
    const data = {
      version_id: versionId,
      app_id: appId,
      packageName,
    }
    this.fileStore.downloadPackage(data).then(() => {
      Notify.success({ content: `${t('Download Successfully')}` })
    })
  }

  renderIcon() {
    const { status } = this.state

    if (status === 'uploading') {
      return (
        <div className={styles.statusIcon}>
          <Loading />
        </div>
      )
    }

    return (
      <div className={styles.statusIcon}>
        <span className={styles.emoji}>📦</span>
        <Icon size={16} name={status} className={styles.icon} />
      </div>
    )
  }

  renderUploadInfo() {
    const { status, fileName, errorInfo, missFile } = this.state
    const uploadStatusWord = {
      ...UPLOAD_STATUS_WORD,
      error: errorInfo,
    }

    return (
      <div className={styles.word}>
        <div className={styles.name}>
          {status === 'init' ? t('UPLOAD_HELM_TITLE') : fileName}
        </div>
        <div className={styles.description}>
          {t(uploadStatusWord[status], { file: missFile })}
          {status === 'error' && <label>, {t('please upload again')}</label>}
        </div>
      </div>
    )
  }

  renderPackageInfo() {
    const { className, packageName, updateTime, canEdit } = this.props

    return (
      <div className={classnames(styles.upload, styles.packageInfo, className)}>
        {this.renderIcon()}
        <div className={styles.word}>
          <div className={styles.name}>
            {packageName}
            {canEdit && (
              <label className={styles.edit} onClick={this.onUploadClick}>
                「{t('File')}」
              </label>
            )}
          </div>
          <div className={styles.description}>
            {t('Updated Time')}:&nbsp;
            {getLocalTime(updateTime).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        </div>
        <Button onClick={this.downloadPackage} type="default">
          {t('Download')}
        </Button>
        <Upload
          ref={node => {
            this.uploadRef = node
          }}
          beforeUpload={this.checkPackage}
          accept={UPLOAD_FILE_TYPES.package}
        />
      </div>
    )
  }

  renderInfo() {
    const { className, canCreate } = this.props
    const { status } = this.state

    return (
      <>
        <div
          className={classnames(
            styles.upload,
            styles[status],
            {
              [styles.hide]: this.showPackage(),
            },
            className
          )}
        >
          {this.renderIcon()}
          {this.renderUploadInfo()}
        </div>
        {canCreate && (
          <div onClick={this.onUploadClick} className={styles.reUpload}>
            👉 {t('Package problems')}? <label>{t('Re-upload')}</label>
          </div>
        )}
      </>
    )
  }

  render() {
    if (this.showPackage()) {
      return this.renderPackageInfo()
    }

    return (
      <Upload
        ref={node => {
          this.uploadRef = node
        }}
        beforeUpload={this.checkPackage}
        accept={UPLOAD_FILE_TYPES.package}
      >
        {this.renderInfo()}
      </Upload>
    )
  }
}
