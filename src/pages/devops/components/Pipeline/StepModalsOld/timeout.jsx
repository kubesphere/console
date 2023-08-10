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
import { Form, RadioGroup, Select } from '@kube-design/components'

import { Modal } from 'components/Base'
import { NumberInput } from 'components/Inputs'

import styles from './index.scss'

@observer
export default class Timeout extends React.Component {
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
    if (nextProps.edittingData.type === 'timeout') {
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
          value:
            key === 'time' ? Number.parseInt(formData[key], 10) : formData[key],
        },
      }))
      this.props.onAddStep({
        name: 'timeout',
        arguments: _arguments.filter(arg => arg.value.value !== ''),
        children: [],
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
        title={'timeout'}
      >
        <Form data={this.state.formData} ref={this.formRef}>
          <Form.Item label={t('time')}>
            <NumberInput name="time" />
          </Form.Item>
          <Form.Item label={t('unit')}>
            <Select
              name="unit"
              options={[
                { value: 'NANOSECONDS', label: t('NanoSeconds') },
                { value: 'MICROSECONDS', label: t('MicroSeconds') },
                { value: 'MILLISECONDS', label: t('MilliSeconds') },
                { value: 'SECONDS', label: t('Seconds') },
                { value: 'MINUTES', label: t('Minutes') },
                { value: 'HOURS', label: t('Hours') },
                { value: 'DAYS', label: t('Days') },
              ]}
              defaultValue={'MINUTES'}
            />
          </Form.Item>
          <Form.Item>
            <RadioGroup
              name="activity"
              defaultValue={true}
              options={[
                {
                  label: t('Timeout after no activity in logs for this block'),
                  value: true,
                },
                { label: t('Absolute duration'), value: false },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
