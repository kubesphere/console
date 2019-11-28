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
import classnames from 'classnames'
import { Icon } from '@pitrix/lego-ui'
import { get } from 'lodash'

import { Image, Upload } from 'components/Base'
import { UPLOAD_FILE_TYPES, UPLOAD_CHECK_RULES } from 'configs/openpitrix/app'

import styles from './index.scss'

const MAX_LEN = 6

@observer
export default class Screenshots extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    store: PropTypes.object,
    fileStore: PropTypes.object,
  }

  static defaultProps = {
    detail: {},
    store: {},
    fileStore() {},
  }

  state = { error: '' }

  onUploadClick = () => {
    this.uploadRef.onClick()
  }

  uploadScreenshot = async file => {
    const { checkFile, handleFileByBase64Str } = this.props.fileStore
    const { uploadScreenshot } = this.props.store
    const { detail } = this.props
    const result = checkFile(file, 'screenshots')

    if (result) {
      this.setState({ error: result })
    } else {
      handleFileByBase64Str(file, async base64Str => {
        this.setState({ error: '' })
        const img = await this.createImageElement(base64Str)
        const { screenshots } = UPLOAD_CHECK_RULES
        if (
          img.height > screenshots.maxHeight ||
          img.width > screenshots.maxWidth
        ) {
          this.setState({ error: t('FILE_SCREENSHOTS_NOTE') })
        } else {
          uploadScreenshot(base64Str, detail)
        }
      })
    }

    return Promise.reject()
  }

  createImageElement(base64Str) {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img')
      img.src = `data:image/png;base64,${base64Str}`
      img.onload = () => {
        resolve(img)
      }
      img.onerror = err => {
        reject(err)
      }
    })
  }

  render() {
    const { error } = this.state
    const { detail, store } = this.props
    const { deleteScreenshot } = store
    const screenshotStr = get(detail, 'screenshots', '')
    const screenshots = screenshotStr ? screenshotStr.split(',') : []
    const len = screenshots.length

    return (
      <div>
        <div className={styles.title}>{t('App Screenshots')}</div>
        <div className={styles.screenshot}>
          <ul className={styles.pictures}>
            {screenshots.map((item, index) => (
              <li key={index}>
                <Image src={item} isBase64Str />
                <div className={styles.delete}>
                  <label onClick={() => deleteScreenshot(index, detail)}>
                    <Icon name="trash" size={20} className={styles.icon} />
                    {t('Delete picture')}
                  </label>
                </div>
              </li>
            ))}
            {len < MAX_LEN && (
              <li className={styles.upload}>
                <Upload
                  multiple
                  className={styles.upload}
                  beforeUpload={this.uploadScreenshot}
                  ref={node => {
                    this.uploadRef = node
                  }}
                  accept={UPLOAD_FILE_TYPES.screenshot}
                >
                  <Icon name="add" size={48} className={styles.add} />
                </Upload>
              </li>
            )}
          </ul>
          {error ? (
            <div className={styles.error}>{t(this.state.error)}</div>
          ) : (
            <div className={styles.words}>
              {len}/{MAX_LEN} {t('screenshots')} ({t('FILE_SCREENSHOTS_NOTE')})
              {len > 0 ? (
                <label
                  className={styles.deleteAll}
                  onClick={() => deleteScreenshot(-1, detail)}
                >
                  {t('Delete all')}
                </label>
              ) : (
                <label
                  className={classnames(styles.deleteAll, styles.disabled)}
                >
                  {t('Delete all')}
                </label>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}
