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
import { Form, Icon, Input } from '@kube-design/components'
import { isEqual } from 'lodash'

import { Modal } from 'components/Base'
import { CATEGORY_ICONS } from 'configs/openpitrix/app'

import styles from './index.scss'

export default class CategoryCreate extends Component {
  static propTypes = {
    detail: PropTypes.object,
    categoryNames: PropTypes.array,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    detail: {},
    categoryNames: [],
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.state = {
      name: this.props.detail.name,
      description: this.props.detail.description,
    }
  }

  componentDidUpdate(prevProps) {
    const { detail } = this.props
    if (!isEqual(detail, prevProps.detail)) {
      this.setState({
        name: detail.name,
        description: detail.description,
      })
    }
  }

  changeName = name => {
    this.setState({ name })
  }

  changeIcon = icon => {
    this.setState({ description: icon })
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const { detail, categoryNames } = this.props
    if (value !== detail.name && categoryNames.includes(value)) {
      return callback({ message: t('NAME_EXIST_DESC'), field: rule.field })
    }

    callback()
  }

  createOrModify = () => {
    const data = {
      name: this.state.name,
      description: this.state.description,
      locale: '{}',
    }

    const { category_id } = this.props.detail
    if (category_id) {
      data.category_id = category_id
    }

    this.formRef.validate(() => {
      this.props.onOk(data)
    })
  }

  onCancel = () => {
    this.setState({ name: '', description: '' })
    this.props.onCancel()
  }

  render() {
    const { visible, ...rest } = this.props
    const formData = {
      name: this.state.name,
      description: this.state.description,
    }

    return (
      <Modal
        width={600}
        visible={visible}
        footerClassName={styles.footer}
        {...rest}
        onOk={this.createOrModify}
        onCancel={this.onCancel}
      >
        <Form
          data={formData}
          ref={form => {
            this.formRef = form
          }}
        >
          <Form.Item
            label={t('NAME')}
            desc={t('CATEGORY_NAME_DESC')}
            rules={[
              { required: true, message: t('ENTER_CATEGORY_NAME_TIP') },
              { validator: this.nameValidator },
            ]}
          >
            <Input name="name" onChange={this.changeName} maxLength={20} />
          </Form.Item>
          <Form.Item label={t('ICON')}>
            <div
              name="description"
              className={styles.icons}
              value={formData.description}
            >
              {CATEGORY_ICONS.map(icon => (
                <label
                  key={icon}
                  onClick={() => this.changeIcon(icon)}
                  className={classnames({
                    [styles.active]: icon === formData.description,
                  })}
                >
                  <Icon name={icon} size={20} />
                </label>
              ))}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
