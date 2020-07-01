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
import { Input, Select, TextArea } from '@pitrix/lego-ui'
import { find } from 'lodash'

import { Form, Upload, Image, Button } from 'components/Base'
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
        label: t(`APP_CATE_${name.toUpperCase()}`, { defaultValue: name }),
        value: category_id,
      })),
    ]
  }

  checkPackage = async file => {
    const { checkFile, handleFileByBase64Str } = this.props.fileStore
    const result = checkFile(file, 'icon')
    if (result) {
      this.setState({ error: result, base64Str: '' })
    } else {
      await handleFileByBase64Str(file, base64Str => {
        this.setState({
          base64Str,
          error: '',
        })
        this.handleAppChange(base64Str, 'icon')
        this.props.store.uploadIcon(base64Str)
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
              <Button>{t('Upload Icon')}</Button>
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
        <div className="h5">{t('Basic Info')}</div>
        <Form data={formData} ref={formRef}>
          <Form.Item
            label={t('Application Name')}
            desc={t('APP_NAME_DESC')}
            rules={[
              {
                required: true,
                message: t('Please input an application name'),
              },
            ]}
          >
            <Input
              name="name"
              onChange={value => this.handleAppChange(value, 'name')}
              maxLength={20}
            />
          </Form.Item>
          <Form.Item
            label={t('App Description')}
            desc={t('APP_ABSTRACTION_DESC')}
          >
            <TextArea
              name="description"
              maxLength={120}
              onChange={value => this.handleAppChange(value, 'description')}
            />
          </Form.Item>
          <Form.Item label={t('Application Icon')} className={styles.upload}>
            {this.renderIcon()}
          </Form.Item>
          <Form.Item
            label={t('Categories')}
            desc={t('CHOOSE_APP_CATEGORY_DESC')}
          >
            <Select
              name="category_id"
              options={this.categories}
              onChange={this.handleAppChange}
            />
          </Form.Item>
          <Form.Item
            label={t('Service Provider Website')}
            desc={t("Service provider's official website address")}
            rules={[
              {
                pattern: PATTERN_URL,
                message: t('Website format is error'),
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
