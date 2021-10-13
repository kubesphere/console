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
import { getLocalTime, formatSize } from 'utils'

import { Icon, Notify } from '@kube-design/components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import styles from './index.scss'

@observer
export default class ImageRunRecords extends React.Component {
  handleCopy = () => {
    Notify.success({
      content: t('COPY_SUCCESSFUL'),
    })
  }

  render() {
    const {
      imageName,
      imageCreated,
      imageSize,
      commandPull,
    } = this.props.runDetail
    const { loading } = this.props

    if (loading) {
      return null
    }

    return (
      <ul className={styles.item}>
        <Icon name="cdn" size={40} />
        <li>
          <div className={styles.value}>{imageName}</div>
          <div className={styles.label}>{t('IMAGE_NAME_SCAP')}</div>
        </li>
        <li>
          <div className={styles.value}>{formatSize(imageSize)}</div>
          <div className={styles.label}>{t('IMAGE_SIZE_SCAP')}</div>
        </li>
        <li>
          <div className={styles.value}>
            {commandPull}
            <CopyToClipboard text={commandPull} onCopy={this.handleCopy}>
              <Icon className={styles.copyIcon} name="copy" changeable />
            </CopyToClipboard>
          </div>
          <div className={styles.label}>{t('PULL_COMMAND_SCAP')}</div>
        </li>
        <li>
          <div className={styles.value}>
            {getLocalTime(imageCreated).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          <div className={styles.label}>{t('RELEASE_TIME_SCAP')}</div>
        </li>
      </ul>
    )
  }
}
