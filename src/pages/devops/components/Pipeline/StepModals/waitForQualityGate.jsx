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

import { observer } from 'mobx-react'
import { Alert, Form, Select } from '@kube-design/components'
import { Modal } from 'components/Base'

import styles from './index.scss'

@observer
export default class WaitForQualityGate extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  get options() {
    return [
      {
        label: t('Inspection results do not affect subsequent tasks'),
        value: 'false',
      },
      {
        label: t('Start the follow-up task after the inspection'),
        value: 'true',
      },
    ]
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = { formData: {} }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.edittingData.type === 'waitForQualityGate') {
      const formData = nextProps.edittingData.data.reduce((prev, arg) => {
        prev[arg.key] = arg.value.value
        return prev
      }, {})
      return { formData }
    }
    return null
  }

  handleOk = () => {
    const current = this.formRef.current || {}
    const formData = current.getData()
    this.formRef.current.validate(() => {
      const _arguments = Object.keys(formData).map(key => ({
        key,
        value: {
          isLiteral: true,
          value: formData[key],
        },
      }))
      this.props.onAddStep({
        name: 'waitForQualityGate',
        arguments: _arguments.filter(arg => arg.value.value !== ''),
      })
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
        title={t('waitForQualityGate')}
      >
        <Form data={this.state.formData} ref={this.formRef}>
          <Alert
            type="info"
            className={styles.info}
            message={t('waitForQualityGate_desc')}
          />
          <Form.Item
            label={t('abortPipeline')}
            rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
          >
            <Select
              name="abortPipeline"
              options={this.options}
              defaultValue="true"
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
