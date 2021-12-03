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

import { Icon, Notify, Progress } from '@kube-design/components'
import Upload from 'components/Base/Upload'
import { isNumber } from 'lodash'
import classnames from 'classnames'
import { formatSize } from 'utils'
import { ReactComponent as JSONIcon } from 'assets/json.svg'

import styles from './index.scss'

export default class Uploader extends React.Component {
  constructor(props) {
    super(props)

    this.uploaderProps = {
      name: 'grafanaDashboard',
      method: 'post',
      action: this.getUploadUrl,
      multiple: false,
      type: 'json',
      beforeUpload: this.beforeUploadHandler,
      onStart: this.startHandler,
      onSuccess: this.successHandler,
      onProgress: this.progressHandler,
      onError: this.errorHandler,
    }

    this.state = {
      files: {},
    }
  }

  get getUploadUrl() {
    return `/grafana/file`
  }

  setFileStatus = (fileId, fileStatus) => {
    this.setState(prevState => ({
      files: {
        ...prevState.files,
        [fileId]: { ...prevState.files[fileId], ...fileStatus },
      },
    }))
  }

  beforeUploadHandler = async file => {
    const length = Object.keys(this.state.files).length

    if (length > 0) {
      Notify.error(t('FILE_UPLOAD_ERROR'))
      return Promise.reject(t('FILE_UPLOAD_ERROR'))
    }

    const extensionName = file.name.slice(file.name.lastIndexOf('.') + 1)
    if (extensionName !== 'json') {
      Notify.error(t('WRONG_FILE_EXTENSION_NAME', { type: 'JSON' }))
      return Promise.reject(t('WRONG_FILE_EXTENSION_NAME', { type: 'JSON' }))
    }
  }

  startHandler = file => {
    this.setFileStatus(file.uid, {
      size: file.size,
      name: file.name,
      showProgress: true,
      showFile: false,
      percentage: 0,
      status: 'active',
    })
  }

  progressHandler = (step, file) => {
    const percent = isNumber(step.percent) ? Math.round(step.percent) : 0
    this.setFileStatus(file.uid, {
      size: file.size,
      percentage: percent === 100 ? 99 : percent,
      status: 'active',
    })
  }

  successHandler = (res, file) => {
    const info = {
      name: file.name,
      size: file.size,
      showProgress: false,
      showFile: true,
      percentage: 100,
      status: 'active',
    }
    this.setFileStatus(file.uid, info)

    const reader = new FileReader()

    reader.readAsText(file, 'utf8')

    reader.addEventListener('load', () => {
      const result = reader.result
      this.props.onChange && this.props.onChange(result)
    })

    Notify.success({
      content: t('UPLOAD_SUCCESSFUL'),
    })
  }

  errorHandler = (err, res, file) => {
    this.setFileStatus(file.uid, {
      size: file.size,
      showProgress: true,
      showFile: false,
      status: 'exception',
    })
    Notify.error({
      content: t('UPLOAD_FAILED'),
    })
  }

  handleReUpload = () => {
    Object.keys(this.state.files).forEach(id => {
      this.uploader.abort(id)
    })
    this.setState({ files: {} })
    this.props.onChange('')
    this.uploader.onClick()
  }

  renderProgress = fileId => {
    const { files } = this.state
    const file = files[fileId]

    return (
      <div className={styles.uploadingContent} key={fileId}>
        <p className={styles.fileInfo}>
          <span className={styles.fileName}>{file.name}</span>
          <span className={styles.uploadText}>
            {t('UPLOAD_PERCENT', { percent: file.percentage })}
          </span>
          <span className={styles.uploadText}>
            {t('FILE_SIZE', { size: formatSize(file.size) })}
          </span>
        </p>
        <Progress
          status="primary"
          className={styles.progress}
          percent={file.percentage}
          strokeWidth={8}
          key={fileId}
          showInfo={false}
        />
      </div>
    )
  }

  renderFileItem = fileId => {
    const { files } = this.state
    const file = files[fileId]

    return (
      <div className={styles.uploadingContent} key={fileId}>
        <p className={styles.fileInfo}>
          <span className={styles.fileName}>{file.name}</span>
          <span className={styles.uploadText}>{t('UPLOAD_FULLY')}</span>
          <span className={styles.uploadText}>
            {t('FILE_SIZE', { size: formatSize(file.size) })}
          </span>
        </p>
        <Progress
          status="primary"
          className={styles.progress}
          percent={100}
          strokeWidth={8}
          showInfo={false}
        />
      </div>
    )
  }

  render() {
    const { files } = this.state
    const UploadLength = Object.keys(files).length

    return (
      <div>
        <div className={styles.container}>
          <Upload
            {...this.uploaderProps}
            ref={n => {
              this.uploader = n
            }}
          >
            <div className={classnames(styles.selectContainer, {})}>
              <Icon className={styles.icon} size={40} name="upload" />
              <p className={styles.title}>{t('UPLOAD_FROM_LOCAL_TITLE')}</p>
              <p className={styles.desc}>{t(`SUPPORT_JSON_FILE`)}</p>
            </div>
          </Upload>
        </div>
        <div
          className={classnames(styles.uploadContainer, {
            [styles.none]: !UploadLength,
          })}
        >
          <span className={styles.icon}>
            <JSONIcon />
          </span>

          {Object.keys(files).map(fileId => {
            if (!files[fileId]) return null
            if (files[fileId].showProgress) {
              return this.renderProgress(fileId)
            }
            if (files[fileId].showFile) {
              return this.renderFileItem(fileId)
            }
            return null
          })}
          <Icon
            changeable
            name="trash"
            onClick={this.handleReUpload}
            className={styles.uploadIcon}
          />
        </div>
      </div>
    )
  }
}
