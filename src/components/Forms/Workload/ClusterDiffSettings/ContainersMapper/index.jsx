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

import { get, set, cloneDeep, isEmpty } from 'lodash'
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
        editContainer: container,
      },
      () => {
        onSelect(cluster)
      }
    )
  }

  handleEdit = ({ index, containerType, data }) => {
    const { cluster, formTemplate } = this.props
    const overrides = get(formTemplate, 'spec.overrides', [])

    const prefix = `spec.template.spec.${
      containerType === 'init' ? 'init_containers' : 'containers'
    }.${index}`
    const clusterOverrides = []
    Object.keys(data).forEach(key => {
      const path = `${prefix}.${key}`
      if (get(this.props.formTemplate, path) !== data[key]) {
        clusterOverrides.push({
          path: `/${path.replace(/\./g, '/')}`,
          value: data[key],
        })
      }
    })

    const override = overrides.find(item => item.clusterName === cluster)
    if (override) {
      override.clusterOverrides = clusterOverrides
    } else {
      overrides.push({
        clusterName: cluster,
        clusterOverrides,
      })
    }

    set(formTemplate, 'spec.overrides', overrides)

    this.setState({ editContainer: '' })
  }

  getContainer({ index, container, containerType }) {
    const { cluster, formTemplate } = this.props
    const override =
      get(formTemplate, 'spec.overrides', []).find(
        item => item.clusterName === cluster
      ) || {}

    const containerTemplate = cloneDeep(container)

    const prefix = `/spec/template/spec/${
      containerType === 'init' ? 'init_containers' : 'containers'
    }/${index}/`

    if (override && !isEmpty(override.clusterOverrides)) {
      override.clusterOverrides.forEach(item => {
        if (item.path.startsWith(prefix)) {
          const subPath = item.path.replace(prefix, '').replace(/\//g, '.')
          set(containerTemplate, subPath, item.value)
        }
      })
    }

    return containerTemplate
  }

  renderContainer = (container, index, containerType) => {
    const { children, selected } = this.props
    const { editContainer } = this.state

    const containerTemplate = this.getContainer({
      container,
      index,
      containerType,
    })

    return (
      <div
        key={container.name}
        className={classNames(styles.wrapper, {
          [styles.selected]: selected,
        })}
      >
        {children({
          ...this.props,
          index,
          containerType: 'worker',
          container: containerTemplate,
          isEdit: editContainer === container.name,
          showEdit: this.showEdit,
          onEdit: this.handleEdit,
        })}
      </div>
    )
  }

  render() {
    const { formTemplate } = this.props

    const containers = get(formTemplate, 'spec.template.spec.containers', [])
    const initContainers = get(
      formTemplate,
      'spec.template.spec.init_containers',
      []
    )

    return (
      <>
        {containers.map((container, index) =>
          this.renderContainer(container, index, 'worker')
        )}
        {initContainers.map((container, index) =>
          this.renderContainer(container, index, 'init')
        )}
      </>
    )
  }
}
