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
import classnames from 'classnames'
import { isEmpty } from 'lodash'

import { Form } from '@kube-design/components'
import { Modal } from 'components/Base'
import { PropertiesInput } from 'components/Inputs'

import styles from './index.scss'

export default class ObjectEditModal extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    title: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    title: '',
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
      enableSave: true,
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, value } = this.props
    if (visible && visible !== prevProps.visible && value !== prevProps.value) {
      this.setState({ value })
    }
  }

  handleOk = () => {
    const { onOk } = this.props

    onOk(this.state.value)
  }

  handleChange = value => {
    this.setState({ value })
  }

  handleError = error => {
    this.setState({ enableSave: isEmpty(error) })
  }

  render() {
    const { title, onOk, ...rest } = this.props
    const { value, enableSave } = this.state

    return (
      <Modal.Form
        width={1162}
        bodyClassName={styles.body}
        title={`${t('Edit ')}${title}`}
        icon="pen"
        okText={t('Save')}
        onOk={this.handleOk}
        disableOk={!enableSave}
        {...rest}
      >
        <div className={styles.wrapper}>
          <div className={classnames(styles.title, 'h5')}>{t(title)}</div>
          <div className={styles.content}>
            <Form.Item>
              <PropertiesInput
                className={styles.inputs}
                addText={`${t('Add ')}${title}`}
                value={value}
                onChange={this.handleChange}
                onError={this.handleError}
              />
            </Form.Item>
          </div>
        </div>
      </Modal.Form>
    )
  }
}
