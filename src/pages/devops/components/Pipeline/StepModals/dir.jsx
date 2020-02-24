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
import { get } from 'lodash'

import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Modal } from 'components/Base'
import { Input } from '@pitrix/lego-ui'

import styles from './index.scss'

@observer
export default class Dir extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.edittingData.type === 'dir') {
      this.formData = {
        path: get(nextProps.edittingData, 'data.value', ''),
      }
    }
  }

  @observable
  formData = {}

  handleOk = () => {
    const formData = this.formRef.current.getData()
    this.props.onAddStep({
      name: 'dir',
      arguments: {
        isLiteral: true,
        value: formData.path,
      },
      children: [],
    })
  }

  render() {
    const { visible, onCancel } = this.props

    return (
      <Modal
        width={680}
        bodyClassName={styles.body}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        title={t('dir')}
      >
        <Form data={this.formData} ref={this.formRef}>
          <Form.Item label={t('Path')}>
            <Input name="path" />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
