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
import { toJS } from 'mobx'
import { Form, Modal } from 'components/Base'
import { Input, Select } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class Git extends React.Component {
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
    this.state = { formData: {} }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.edittingData && nextProps.edittingData.type === 'git') {
      const formData = nextProps.edittingData.data.reduce((prev, arg) => {
        prev[arg.key] = arg.value.value
        return prev
      }, {})
      return { formData }
    }
    return null
  }

  handleOk = () => {
    const formData = this.formRef.current.getData()
    this.formRef.current.validate(() => {
      const _arguments = Object.keys(formData).map(key => ({
        key,
        value: {
          isLiteral: true,
          value: formData[key],
        },
      }))
      this.props.onAddStep({
        name: 'git',
        arguments: [
          ..._arguments.filter(arg => arg.value.value !== ''),
          {
            key: 'changelog',
            value: {
              isLiteral: true,
              value: true,
            },
          },
          {
            key: 'poll',
            value: {
              isLiteral: true,
              value: false,
            },
          },
        ],
      })
    })
  }

  render() {
    const { visible, onCancel } = this.props
    const { credentials } = this.props.store

    return (
      <Modal
        width={680}
        bodyClassName={styles.body}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        title={'Git'}
      >
        <Form data={this.state.formData} ref={this.formRef}>
          <Form.Item
            label={t('Url')}
            rules={[{ required: true, message: t('This param is required') }]}
          >
            <Input name="url" />
          </Form.Item>
          <Form.Item
            label={t('Credential ID')}
            desc={
              <p>
                {t('ADD_NEW_CREDENTIAL_DESC')}
                <span
                  className={styles.clickable}
                  onClick={this.props.showCredential}
                >
                  {t('Create a credential')}
                </span>
              </p>
            }
          >
            <Select name="credentialsId" options={toJS(credentials)} />
          </Form.Item>
          <Form.Item label={t('Branch')}>
            <Input name="branch" />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
