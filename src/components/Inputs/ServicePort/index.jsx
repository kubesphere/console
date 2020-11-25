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

import { debounce, isUndefined } from 'lodash'
import React from 'react'
import { Input, Select, Icon, Tooltip } from '@kube-design/components'
import { NumberInput, AddonsInput } from 'components/Inputs'
import { PROTOCOLS } from 'utils/constants'

import styles from './index.scss'

const DEFAULT_PROTOCOL = 'HTTP'

const getStateFromProps = props => {
  let protocol = DEFAULT_PROTOCOL
  const { name, targetPort, port } = props.value
  if (!isUndefined(name)) {
    const matchs = name.match(/^(\w+)-(.*)/)
    if (matchs) {
      protocol = (matchs[1] || DEFAULT_PROTOCOL).toUpperCase()
    }
  }

  return {
    name: !isUndefined(name) ? name : `${protocol.toLowerCase()}-`,
    protocol: PROTOCOLS.some(item => item.value === protocol)
      ? protocol
      : props.value.protocol,
    targetPort,
    port,
  }
}

export default class ServicePort extends React.Component {
  static defaultProps = {
    value: {},
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      ...getStateFromProps(props),
      value: props.value,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      return {
        ...getStateFromProps(props),
        value: props.value,
      }
    }
    return null
  }

  triggerChange = debounce(() => {
    const { name, protocol, targetPort, port } = this.state
    this.props.onChange({
      name,
      protocol: protocol === 'UDP' ? 'UDP' : 'TCP',
      targetPort,
      port,
    })
  }, 300)

  handleNameChange = (e, name) => {
    this.setState({ name }, () => this.triggerChange())
  }

  handleProtocolChange = protocol => {
    let name
    const oldName = this.state.name
    const prefix = `${this.state.protocol.toLowerCase()}-`
    if (oldName.startsWith(prefix)) {
      name = `${protocol.toLowerCase()}-${oldName.replace(prefix, '')}`
    } else {
      name = `${protocol.toLowerCase()}-`
    }

    this.setState(
      {
        name,
        protocol,
      },
      () => this.triggerChange()
    )
  }

  handleTargetPortChange = targetPort => {
    this.setState({ targetPort }, () => this.triggerChange())
  }

  handlePortChange = port => {
    this.setState({ port }, () => this.triggerChange())
  }

  render() {
    const { name, protocol, targetPort, port } = this.state

    return (
      <div className={styles.wrapper}>
        <AddonsInput
          prefix={
            <div className={styles.tip}>
              <span>{t('Protocol')}</span>
              <Tooltip content={t('ISTIO_PROTOCOL_TIP')}>
                <Icon name="question" />
              </Tooltip>
            </div>
          }
        >
          <Select
            name="protocol"
            value={protocol}
            options={PROTOCOLS}
            defaultValue={DEFAULT_PROTOCOL}
            onChange={this.handleProtocolChange}
          />
        </AddonsInput>
        <AddonsInput prefix={t('Name')}>
          <Input name="name" value={name} onChange={this.handleNameChange} />
        </AddonsInput>
        <AddonsInput prefix={t('Container Port')}>
          <NumberInput
            name="targetPort"
            min={1}
            max={65535}
            value={targetPort}
            integer
            onChange={this.handleTargetPortChange}
          />
        </AddonsInput>
        <AddonsInput prefix={t('Service Port')}>
          <NumberInput
            name="port"
            min={1}
            max={65535}
            value={port}
            integer
            placeholder={t('required')}
            onChange={this.handlePortChange}
          />
        </AddonsInput>
      </div>
    )
  }
}
