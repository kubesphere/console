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
import { PropTypes } from 'prop-types'
import { Input, Select, TextArea, Button, Form } from '@kube-design/components'
import { find, last } from 'lodash'

import { Upload, Image } from 'components/Base'
import { PATTERN_URL } from 'utils/constants'
import { UPLOAD_FILE_TYPES } from 'configs/openpitrix/app'

import styles from './index.scss'

export default class AppBaseEdit extends React.Component {
  static propTypes = {
    formData: PropTypes.object,
    categories: PropTypes.array,
    handleChange: PropTypes.func,
    fileStore: PropTypes.object,
  }

  static defaultProps = {
    formData: {},
    categories: [],
    handleChange() {},
    fileStore() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      base64Str: '',
    }
  }

  get categories() {
    return [
      ...this.props.categories.map(({ name, category_id }) => ({
        label: t(`APP_CATE_${name.toUpperCase().replace(/[^A-Z]+/g, '_')}`, {
          defaultValue: name,
        }),
        value: category_id,
      })),
    ]
  }

  checkPackage = async file => {
    const {
      checkFile,
      handleFileByBase64Str,
      validateImageSize,
    } = this.props.fileStore
    const result = checkFile(file, 'icon')
    if (result) {
      this.setState({ error: result, base64Str: '' })
    } else {
      const fileType = last(file.name.toLocaleLowerCase().split('.'))
      await handleFileByBase64Str(file, async base64Str => {
        const type = fileType === 'svg' ? 'svg+xml' : fileType
        const base64Show = `data:image/${type};base64,${base64Str}`
        const imagesResult = await validateImageSize(base64Show)

        if (!imagesResult) {
          this.setState({
            error: 'FILE_MAX_SIZE_ICON',
            base64Str: '',
          })
        } else {
          this.handleAppChange(base64Str, 'icon')
          this.props.store.uploadIcon(base64Str)
          this.setState({
            error: '',
            base64Str,
          })
        }
      })
    }
    return Promise.reject()
  }

  handleAppChange = (value, name) => {
    this.props.handleChange(value, name)
  }

  renderIcon() {
    const { formData } = this.props
    const { base64Str, error } = this.state

    return (
      <>
        <div className={styles.uploadIcon}>
          <div className={styles.iconShow}>
            <Image
              className={styles.image}
              isBase64Str={Boolean(base64Str)}
              src={base64Str || formData.icon}
              iconLetter={formData.name}
              iconSize={96}
            />
          </div>
          <div className={styles.word}>
            <div className={styles.note}>
              {t('APP_ICON_FORMAT')} <br />
              {t('APP_ICON_SIZE')}
            </div>
            <Upload
              beforeUpload={this.checkPackage}
              accept={UPLOAD_FILE_TYPES.icon}
            >
              <Button>{t('UPLOAD')}</Button>
            </Upload>
          </div>
        </div>
        {error && <div className={styles.error}>{t(error)}</div>}
      </>
    )
  }

  render() {
    const { formData, formRef } = this.props
    const category = find(formData.category_set, { status: 'enabled' }) || {}
    formData.category_id = formData.category_id || category.category_id

    return (
      <div className={styles.wrapper}>
        <div className="h5">{t('BASIC_INFORMATION')}</div>
        <Form data={formData} ref={formRef}>
          <Form.Item
            label={t('NAME')}
            desc={t('APP_NAME_DESC')}
            rules={[
              {
                required: true,
                message: t('NAME_EMPTY_DESC'),
              },
            ]}
          >
            <Input
              name="name"
              onChange={value => this.handleAppChange(value, 'name')}
              maxLength={20}
            />
          </Form.Item>
          <Form.Item label={t('DESCRIPTION')} desc={t('APP_DESCRIPTION_DESC')}>
            <TextArea
              name="description"
              maxLength={120}
              onChange={value => this.handleAppChange(value, 'description')}
            />
          </Form.Item>
          <Form.Item label={t('ICON')} className={styles.upload}>
            {this.renderIcon()}
          </Form.Item>
          <Form.Item
            label={t('APP_CATEGORY')}
            desc={t('CHOOSE_APP_CATEGORY_DESC')}
          >
            <Select
              name="category_id"
              options={this.categories}
              onChange={this.handleAppChange}
              placeholder=" "
            />
          </Form.Item>
          <Form.Item
            label={t('SERVICE_PROVIDER_WEBSITE_TCAP')}
            desc={t('SERVICE_PROVIDER_WEBSITE_DESC')}
            rules={[
              {
                pattern: PATTERN_URL,
                message: t('WRONG_ADDRESS_TIP'),
              },
            ]}
          >
            <Input
              name="home"
              onChange={value => this.handleAppChange(value, 'home')}
              maxLength={100}
            />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
