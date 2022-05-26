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
import { Form, Select } from '@kube-design/components'

import { Modal } from 'components/Base'

import styles from './index.scss'

export default class CategoryAdjust extends Component {
  static propTypes = {
    categories: PropTypes.array,
    categoryId: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    categories: [],
    categoryId: '',
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.state = {
      categoryId: this.props.categoryId,
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

  handleChange = categoryId => {
    this.setState({ categoryId })
  }

  adjustCategory = () => {
    this.props.onOk({ category_id: this.state.categoryId })
  }

  onCancel = () => {
    this.setState({ categoryId: '' })
    this.props.onCancel()
  }

  render() {
    const { ...rest } = this.props
    const formData = { category_id: this.state.categoryId }

    return (
      <Modal
        width={600}
        footerClassName={styles.footer}
        {...rest}
        onOk={this.adjustCategory}
        onCancel={this.onCancel}
      >
        <Form
          className={styles.form}
          data={formData}
          ref={form => {
            this.formRef = form
          }}
        >
          <Form.Item
            label={t('CHANGE_CATEGORY')}
            desc={t('CHANGE_CATEGORY_DESC')}
          >
            <Select
              name="category_id"
              options={this.categories}
              value={this.state.categoryId}
              onChange={this.handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
