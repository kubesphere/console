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

import { RadioButton, RadioGroup, Form } from '@kube-design/components'

import Confirm from 'components/Forms/Base/Confirm'
import ProbeConfig from './ProbeConfig'

import styles from './index.scss'
import ProbeSection from './ProbeSection'

const PROBE_RADIO_CONFIG = [
  { value: 'http', desc: 'HTTP_REQUEST' },
  { value: 'command', desc: 'COMMAND' },
  { value: 'tcp', desc: 'TCP_PORT' },
]

@observer
export default class ProbeForm extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    componentType: PropTypes.string,
    data: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    data: {},
    onSave() {},
    onCancel() {},
    componentType: 'heal',
  }

  constructor(props) {
    super(props)

    this.state = {
      formData: cloneDeep(props.data),
      checkerType: this.checkerType,
    }

    this.formRef = React.createRef()
  }

  get checkerType() {
    const { data } = this.props

    if ('exec' in data) return 'command'

    if ('tcpSocket' in data) return 'tcp'

    return 'http'
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

  render() {
    const { className, probType, onCancel, componentType = 'heal' } = this.props
    const { formData, checkerType } = this.state

    return (
      <div className={classNames(styles.wrapper, className)}>
        <div className={classNames(styles.radioGroup, 'probe-radio-group')}>
          <RadioGroup
            mode="button"
            buttonWidth={150}
            value={checkerType}
            onChange={this.handleTypeChange}
            size="small"
          >
            {PROBE_RADIO_CONFIG.map(item => (
              <RadioButton value={item.value}>{t(item.desc)}</RadioButton>
            ))}
          </RadioGroup>
        </div>
        <Form ref={this.formRef} type="inner" data={formData}>
          <div className="margin-b12">
            <ProbeSection checkerType={checkerType} />
          </div>
          {componentType === 'life' ? null : (
            <ProbeConfig probType={probType} />
          )}
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
