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
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Column, Columns, Icon, Notify } from '@kube-design/components'
import { Upload } from 'components/Base'

import styles from './index.scss'

export default class UploadInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    defaultLogo: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    value: '',
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.uploaderProps = {
      name: 'file',
      action: '/images/upload',
      accept: 'image/*',
      beforeUpload: file => {
        if (file.size > 1024 * 1024 * 2) {
          Notify.error(t('FILE_OVERSIZED_TIP'))
          return false
        }
        return true
      },
      onSuccess: res => {
        if (res) {
          props.onChange(res.path)
        }
      },
    }
  }

  render() {
    const { className, value, placeholder, defaultLogo } = this.props

    return (
      <Columns className={classNames('is-variable is-2', className)}>
        <Column className="is-narrow">
          <img
            className={classNames(styles.image, 'upload-preview')}
            src={value || defaultLogo}
          />
        </Column>
        <Column>
          <Upload {...this.uploaderProps}>
            <div className={styles.upload}>
              <Icon size={32} name="upload" />
              <p>{placeholder}</p>
            </div>
          </Upload>
        </Column>
      </Columns>
    )
  }
}
