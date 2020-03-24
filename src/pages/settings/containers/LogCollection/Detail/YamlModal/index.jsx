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
import Modal from 'components/Base/Modal'
import { CodeEditor } from 'components/Base'
import yamlParser from 'js-yaml/dist/js-yaml'
import { isNull } from 'lodash'

export default class YamlModal extends Component {
  static propTypes = {
    value: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
  }

  static defaultProps = {
    value: {},
    visible: false,
    onOk() {},
    icon: 'pen',
    title: 'EditYaml',
    onCancel() {},
    okText: 'Update',
    fullScreen: true,
  }

  value = this.props.value

  handleSubmit = () => {
    if (isNull(this.value)) {
      this.props.onCancel()
    } else {
      this.props.onOk(this.value)
    }
  }

  handleCancel = () => {
    this.value = this.props.value
    this.props.onCancel()
  }

  parse(yaml) {
    try {
      return yamlParser.safeLoad(yaml)
    } catch (e) {
      return null
    }
  }

  handleChange = yaml => {
    this.value = this.parse(yaml)
  }

  render() {
    const { visible, onCancel, value, onOk, ...rest } = this.props
    return (
      <Modal
        visible={visible}
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
        {...rest}
      >
        <CodeEditor onChange={this.handleChange} value={value} />
      </Modal>
    )
  }
}
