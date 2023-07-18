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

import { PATTERN_PORT_NAME } from 'utils/constants'
import { Form, Button } from '@kube-design/components'
import { isEmpty, set } from 'lodash'

import {
  ContainerPort,
  ContainerServicePort,
  ArrayInput,
} from 'components/Inputs'

import styles from './index.scss'

export default class Ports extends React.Component {
  static defaultProps = {
    prefix: '',
  }

  static contextTypes = {
    imageDetail: PropTypes.object,
    forceUpdate: PropTypes.func,
  }

  get prefix() {
    const { prefix } = this.props
    return prefix ? `${prefix}.` : ''
  }

  portsValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (value.length > 0) {
      const names = []
      value.forEach(item => {
        if (
          !item.name ||
          !item.containerPort ||
          (this.props.withService && !item.servicePort)
        ) {
          return callback({ message: t('INVALID_PORT') })
        }

        if (names.includes(item.name)) {
          return callback({ message: t('PORT_INPUT_DESC') })
        }

        if (
          item.name &&
          (item.name.length > 15 || !PATTERN_PORT_NAME.test(item.name))
        ) {
          return callback({ message: t('WORKLOAD_PORT_NAME_DESC') })
        }

        names.push(item.name)
      })
    }

    callback()
  }

  checkContainerPortValid = value => {
    if (this.props.withService) {
      return value && value.name && value.containerPort && value.servicePort
    }

    return value && value.name && value.containerPort
  }

  handleFillPorts = () => {
    const { exposedPorts = [] } = this.context.imageDetail
    const ports = exposedPorts.map(port => {
      const protocol = port.split('/')[1]
      const containerPort = Number(port.split('/')[0])

      return {
        name: `${protocol}-${containerPort}`,
        protocol: protocol.toUpperCase(),
        containerPort,
        servicePort: containerPort,
      }
    })

    if (!isEmpty(ports)) {
      set(this.props.data, 'ports', ports)
      this.context?.forceUpdate()
    }
  }

  render() {
    const { withService, className } = this.props

    return (
      <Form.Group
        className={className}
        label={t('PORT_SETTINGS')}
        desc={t('PORT_SETTINGS_DESC')}
      >
        <Form.Item
          rules={[
            { required: withService, message: t('PORT_EMPTY') },
            { validator: this.portsValidator, checkOnSubmit: true },
          ]}
        >
          <ArrayInput
            name={`${this.prefix}ports`}
            itemType="object"
            addText={t('ADD_PORT')}
            checkItemValid={this.checkContainerPortValid}
            extraAdd={
              !isEmpty(this.context?.imageDetail?.exposedPorts ?? []) && (
                <Button
                  className={styles.defaultButton}
                  onClick={this.handleFillPorts}
                >
                  {t('USE_IMAGE_DEFAULT_PORTS')}
                </Button>
              )
            }
          >
            {withService ? <ContainerServicePort /> : <ContainerPort />}
          </ArrayInput>
        </Form.Item>
      </Form.Group>
    )
  }
}
