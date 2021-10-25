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

import { get, set, isEmpty, uniqBy, isArray } from 'lodash'
import React, { Component } from 'react'
import classNames from 'classnames'

import styles from './index.scss'

export default class ContainersMapper extends Component {
  state = {
    editContainer: '',
  }

  showEdit = container => {
    const { onSelect, cluster } = this.props
    this.setState(
      {
        editContainer: container.clusterName,
      },
      () => {
        onSelect(cluster)
      }
    )
  }

  handleEdit = ({ data }) => {
    const { cluster, formTemplate, onChange } = this.props
    const servicePorts = []

    data.ports.forEach(port => {
      if (port.servicePort) {
        servicePorts.push({
          name: port.name,
          protocol: port.protocol,
          port: port.servicePort,
          targetPort: port.containerPort,
        })
      }
    })

    const clusterOverrides = [{ path: '/spec/ports', value: servicePorts }]

    const overrides = get(formTemplate, 'spec.overrides', [])
    const override = overrides.find(item => item.clusterName === cluster)
    if (override) {
      override.clusterOverrides = uniqBy(
        [...clusterOverrides, ...(override.clusterOverrides || [])],
        'path'
      )
    } else {
      overrides.push({ clusterName: cluster, clusterOverrides })
    }

    set(formTemplate, 'spec.overrides', overrides)
    this.setState({ editContainer: '' })
    onChange()
  }

  getContainer(port) {
    const { cluster, formTemplate } = this.props

    const prefix = `/spec/ports`

    const override =
      get(formTemplate, 'spec.overrides', []).find(
        item => item.clusterName === cluster
      ) || {}

    const containerTemplate = { path: prefix, value: port }

    if (override && !isEmpty(override.clusterOverrides)) {
      override.clusterOverrides.forEach(item => {
        if (item && item.path.startsWith(prefix)) {
          let value = item.value
          if (isEmpty(value) || !isArray(value)) {
            value = get(formTemplate, 'spec.template.spec.ports')
          }
          set(containerTemplate, 'value', value)
        }
      })
    }

    const pots = containerTemplate.value.map(item => {
      const servicePort = {
        name: item.name,
        protocol: item.protocol,
        servicePort: item.port,
        containerPort: item.targetPort,
      }
      return servicePort
    })

    return { clusterName: cluster, ports: pots }
  }

  renderContainer = formData => {
    const { children, selected } = this.props
    const { editContainer } = this.state

    return (
      <div
        key={formData.name}
        className={classNames(styles.wrapper, {
          [styles.selected]: selected,
        })}
      >
        {children({
          ...this.props,
          containerType: 'worker',
          formData,
          isEdit: editContainer === formData.clusterName,
          showEdit: this.showEdit,
          onEdit: this.handleEdit,
        })}
      </div>
    )
  }

  render() {
    const { formTemplate } = this.props

    const ports = get(formTemplate, 'spec.template.spec.ports', [])
    const containerPort = this.getContainer(ports)

    return <>{this.renderContainer(containerPort, 'worker')}</>
  }
}
