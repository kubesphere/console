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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { cloneDeep } from 'lodash'

import {
  Columns,
  Column,
  RadioButton,
  RadioGroup,
  Select,
  Input,
} from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import { NumberInput, StringInput, ObjectInput } from 'components/Inputs'
import Confirm from 'components/Forms/Base/Confirm'

import styles from './index.scss'

@observer
export default class ProbeForm extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    data: {},
    onSave() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      formData: cloneDeep(props.data),
      checkerType: this.checkerType,
    }

    this.formRef = React.createRef()
  }

  get defaultData() {
    return {
      scheme: 'HTTP',
      path: '/',
      port: 80,
    }
  }

  get checkerType() {
    const { data } = this.props

    if ('exec' in data) return 'command'

    if ('tcpSocket' in data) return 'tcp'

    return 'http'
  }

  get httpRequestTypes() {
    return [
      {
        label: 'HTTP',
        value: 'HTTP',
      },
      {
        label: 'HTTPS',
        value: 'HTTPS',
      },
    ]
  }

  filterData = formData => {
    const { checkerType } = this.state
    const data = {
      ...formData,
    }

    switch (checkerType) {
      default:
      case 'http': {
        delete data.tcpSocket
        delete data.exec
        break
      }
      case 'command': {
        delete data.httpGet
        delete data.tcpSocket
        break
      }
      case 'tcp': {
        delete data.httpGet
        delete data.exec
        break
      }
    }

    return data
  }

  handleTypeChange = value => {
    this.setState({ checkerType: value })
  }

  handleSubmit = () => {
    const { onSave } = this.props
    const form = this.formRef.current

    form &&
      form.validate(() => {
        onSave(this.filterData(form.getData()))
      })
  }

  renderProbeSection() {
    const { checkerType } = this.state

    if (checkerType === 'command') {
      return (
        <Form.Item
          key={checkerType}
          label={t('Commands')}
          desc={t('PROBE_COMMAND_DESC')}
          rules={[{ required: true, message: t('Please input command') }]}
        >
          <StringInput className="max-width-full" name="exec.command" />
        </Form.Item>
      )
    }

    if (checkerType === 'tcp') {
      return (
        <Columns>
          <Column>
            <Form.Item
              label={t('Port')}
              rules={[{ required: true, message: t('Please input port') }]}
            >
              <NumberInput
                name="tcpSocket.port"
                defaultValue={80}
                min={0}
                max={65535}
                integer
              />
            </Form.Item>
          </Column>
          <Column />
        </Columns>
      )
    }

    return (
      <Form.Item
        key={checkerType}
        label={t('HTTP Request')}
        rules={[{ required: true, message: t('Please input http request') }]}
      >
        <ObjectInput
          name="httpGet"
          className={styles.object}
          defaultValue={this.defaultData}
        >
          <Select name="scheme" options={this.httpRequestTypes} />
          <Input name="path" />
          <NumberInput name="port" min={0} max={65535} integer />
        </ObjectInput>
      </Form.Item>
    )
  }

  render() {
    const { className, onCancel } = this.props
    const { formData, checkerType } = this.state

    return (
      <div className={classNames(styles.wrapper, className)}>
        <div className={classNames(styles.radioGroup, 'probe-radio-group')}>
          <RadioGroup
            wrapClassName="radio-default"
            buttonWidth={150}
            value={checkerType}
            onChange={this.handleTypeChange}
            size="small"
          >
            <RadioButton value="http">{t('HTTP Request Check')}</RadioButton>
            <RadioButton value="command">{t('Exec Command Check')}</RadioButton>
            <RadioButton value="tcp">{t('TCP Port Check')}</RadioButton>
          </RadioGroup>
        </div>
        <Form ref={this.formRef} type="inner" data={formData}>
          <div className="margin-b12">{this.renderProbeSection()}</div>
          <Columns>
            <Column>
              <Form.Item
                label={t('Initial Delay(s)')}
                desc={t('INITIAL_DELAY_DESC')}
              >
                <NumberInput
                  name="initialDelaySeconds"
                  defaultValue={0}
                  min={0}
                  integer
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('Timeout(s)')} desc={t('TIMEOUT_DESC')}>
                <NumberInput
                  name="timeoutSeconds"
                  defaultValue={1}
                  min={1}
                  integer
                />
              </Form.Item>
            </Column>
          </Columns>
          <Columns>
            <Column>
              <Form.Item
                label={t('Period Seconds')}
                desc={t('PERIOD_SECONDS_DESC')}
              >
                <NumberInput
                  name="periodSeconds"
                  defaultValue={10}
                  min={1}
                  integer
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item
                label={t('Success Threshold')}
                desc={t('SUCCESS_THRESHOLD_DESC')}
              >
                <NumberInput
                  name="successThreshold"
                  defaultValue={1}
                  min={1}
                  integer
                />
              </Form.Item>
            </Column>
          </Columns>
          <Columns>
            <Column>
              <Form.Item
                label={t('Failure Threshold')}
                desc={t('FAILURE_THRESHOLD_DESC')}
              >
                <NumberInput
                  name="failureThreshold"
                  defaultValue={3}
                  min={1}
                  integer
                />
              </Form.Item>
            </Column>
            <Column />
          </Columns>
        </Form>
        <Confirm
          className={styles.confirm}
          onOk={this.handleSubmit}
          onCancel={onCancel}
        />
      </div>
    )
  }
}
