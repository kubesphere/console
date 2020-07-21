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

import Base from 'components/Forms/Workload/ContainerSettings/ContainerList'

import Card from './Card'

import styles from './index.scss'

export default class ContainerList extends Base {
  renderEmpty() {
    return null
  }

  renderContainers() {
    const { value, disabled } = this.props
    return (
      <ul className={styles.list}>
        {value.map(item => (
          <Card
            container={item}
            key={item.name}
            onEdit={this.handleEdit}
            onDelete={this.handleDelete}
            disabled={disabled}
          />
        ))}
      </ul>
    )
  }

  renderInitContainers() {
    const {
      specTemplate: { initContainers = [] },
      disabled,
    } = this.props

    return initContainers.map(item => (
      <Card
        container={item}
        key={item.name}
        type="init"
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
        disabled={disabled}
      />
    ))
  }

  renderAdd() {
    if (this.props.disabled) {
      return null
    }

    return super.renderAdd()
  }
}
