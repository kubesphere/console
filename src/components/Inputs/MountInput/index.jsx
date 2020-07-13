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

import Item from './Item'

export default class MountInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    containers: PropTypes.array,
    value: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    value: [],
    containers: [],
    onChange() {},
  }

  getReadOny = readOnly => {
    if (readOnly === 'true' || readOnly === 'null') {
      return readOnly
    }

    return 'false'
  }

  getFormatValue = () => {
    const { value, containers } = this.props

    return containers.map(container => {
      const volumeMount = value.find(
        item => item.containerName === container.name
      )

      if (!volumeMount) {
        return {
          readOnly: 'null',
          mountPath: '',
        }
      }

      const { containerName, readOnly, ...rest } = volumeMount

      return {
        ...rest,
        readOnly: this.getReadOny(String(readOnly)),
      }
    })
  }

  handleItemChange = (containerName, itemValue) => {
    const { value, onChange } = this.props

    let newValue = []

    const existItem = value.find(item => item.containerName === containerName)

    if (existItem) {
      newValue = value.map(item =>
        item.containerName === containerName
          ? { ...existItem, ...itemValue }
          : item
      )
    } else {
      newValue = [...value, itemValue]
    }

    onChange(newValue)
  }

  render() {
    const { containers, collectSavedLog, supportedAccessModes } = this.props

    const formatValue = this.getFormatValue()

    return (
      <div>
        {containers.map((container, index) => (
          <Item
            key={container.name}
            value={formatValue[index]}
            container={container.name}
            onChange={this.handleItemChange.bind(this, container.name)}
            supportedAccessModes={supportedAccessModes}
            collectSavedLog={collectSavedLog}
          />
        ))}
      </div>
    )
  }
}
