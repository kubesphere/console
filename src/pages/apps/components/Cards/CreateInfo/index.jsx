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
import { last } from 'lodash'

import { Upload, Image } from 'components/Base'
import { UPLOAD_FILE_TYPES } from 'configs/openpitrix/app'

import styles from './index.scss'

export default class HelmUpload extends Component {
  static propTypes = {
    createInfo: PropTypes.object,
    fileStore: PropTypes.object,
    uploadIcon: PropTypes.func,
  }

  static defaultProps = {
    createInfo: {},
    fileStore: {},
    uploadIcon() {},
  }

  constructor(props) {
    super(props)

    this.fileStore = this.props.fileStore
    this.state = {
      error: '',
      base64Str: '',
      base64Show: '',
    }
  }

  onUploadClick = () => {
    this.uploadRef.onClick()
  }

  setShowBase64 = ({ base64Str, base64Show }) => {
    this.setState({
      base64Str,
      base64Show,
      error: '',
    })
    this.props.uploadIcon(base64Str)
  }

  checkPackage = async file => {
    const {
      checkFile,
      handleFileByBase64Str,
      validateImageSize,
    } = this.fileStore
    const result = checkFile(file, 'icon')
    if (result) {
      this.setState({ error: result, base64Str: '', base64Show: '' })
      this.props.uploadIcon('')
    } else {
      const fileType = last(file.name.toLocaleLowerCase().split('.'))
      await handleFileByBase64Str(file, async base64Str => {
        const type = fileType === 'svg' ? 'svg+xml' : fileType
        const base64Show = `data:image/${type};base64,${base64Str}`
        const imagesResult = await validateImageSize(base64Show)

        if (!imagesResult) {
          this.setState({
            error: t('FILE_MAX_SIZE_ICON'),
            base64Str: '',
            base64Show: '',
          })
          this.props.uploadIcon('')
        } else {
          this.setShowBase64({ base64Str, base64Show })
        }
      })
    }
    return Promise.reject()
  }

  renderInfo() {
    const { createInfo } = this.props

    return (
      <div>
        <dl>
          <dt>{createInfo.name || '-'}</dt>
          <dd>{t('NAME')}</dd>
        </dl>
        <dl>
          <dt>{createInfo.version_name || '-'}</dt>
          <dd>{t('VERSION')}</dd>
        </dl>
        <dl>
          <dt>{createInfo.home || '-'}</dt>
          <dd>{t('HOMEPAGE')}</dd>
        </dl>
        <dl>
          <dt>{createInfo.description || '-'}</dt>
          <dd>{t('DESCRIPTION')}</dd>
        </dl>
      </div>
    )
  }

  render() {
    const { error, base64Show } = this.state
    const { createInfo } = this.props

    return (
      <div className={styles.createInfo}>
        <div className={styles.title}>{t('APP_INFORMATION')}</div>
        <div className={styles.appContent}>
          <Upload
            ref={node => {
              this.uploadRef = node
            }}
            beforeUpload={this.checkPackage}
            accept={UPLOAD_FILE_TYPES.icon}
          >
            <div className={styles.appIcon}>
              <div className={styles.iconShow}>
                <Image
                  src={base64Show || createInfo.icon}
                  iconSize={100}
                  iconLetter={createInfo.name}
                />
              </div>
              <label className={styles.uploadIcon}>{t('UPLOAD_ICON')}</label>
              <p className={styles.note}>{t('APP_ICON_NOTE')}</p>
            </div>
          </Upload>
          {this.renderInfo()}
        </div>
        {error && <div className={styles.error}>{t(`${error}_DESC`)}</div>}
      </div>
    )
  }
}
