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
import classNames from 'classnames'
import { concat, get, set, isEmpty } from 'lodash'
import { List } from 'components/Base'

import Card from './Card'

import styles from './index.scss'

export default class VolumeList extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.array,
    containers: PropTypes.array,
    onChange: PropTypes.func,
    onShowAddVolume: PropTypes.func,
    onShowEdit: PropTypes.func,
    hideVolumeSetting: PropTypes.bool,
  }

  static defaultProps = {
    prefix: '',
    name: '',
    value: [],
    containers: [],
    onChange() {},
    onShowAddVolume() {},
    onShowEdit() {},
    hideVolumeSetting: false,
  }

  static contextTypes = {
    formData: PropTypes.object,
  }

  getFormattedVolumes = () => {
    const { value, containers } = this.props

    if (isEmpty(value) || isEmpty(containers)) {
      return []
    }

    return value.map(item => {
      const volumeMounts = []
      containers.forEach(container => {
        if (get(container, 'volumeMounts', false)) {
          const volumeMount = container.volumeMounts.find(
            vm => vm.name === item.metadata.name
          )

          if (volumeMount) {
            volumeMounts.push({
              ...volumeMount,
              containerName: container.name,
            })
          }
        }
      })

      return { ...item, volumeMounts }
    })
  }

  deleteVolumeMounts = name => {
    const { formData } = this.context

    const containers = get(
      formData,
      `${this.props.prefix}spec.containers`,
      []
    ).map(c => ({ ...c, type: 'worker' }))
    const initContainers = get(
      formData,
      `${this.props.prefix}spec.initContainers`,
      []
    ).map(c => ({ ...c, type: 'init' }))

    const mergedContainers = concat(containers, initContainers)
    mergedContainers.forEach(container => {
      if (!isEmpty(container.volumeMounts)) {
        container.volumeMounts = container.volumeMounts.filter(
          vm => vm.name !== name
        )
      }
    })

    const _containers = []
    const _initContainers = []
    mergedContainers.forEach(item => {
      if (item.type === 'worker') {
        delete item.type
        _containers.push(item)
      } else {
        delete item.type
        _initContainers.push(item)
      }
    })
    set(formData, `${this.props.prefix}spec.containers`, _containers)
    set(formData, `${this.props.prefix}spec.initContainers`, _initContainers)
  }

  handleAddVolume = () => {
    this.props.onShowAddVolume()
  }

  handleEdit = data => {
    this.props.onShowEdit(data)
  }

  handleDelete = name => {
    const { value, onChange } = this.props

    this.deleteVolumeMounts(name)

    onChange(value.filter(item => item.metadata.name !== name))
  }

  renderAddVolume() {
    return (
      <List.Add
        onClick={this.handleAddVolume}
        title={t('ADD_PERSISTENT_VOLUME_CLAIM_TEMPLATE')}
        description={t('ADD_PERSISTENT_VOLUME_CLAIM_TEMPLATE_DESC')}
      />
    )
  }

  render() {
    const { className, hideVolumeSetting } = this.props
    const formatVolumes = this.getFormattedVolumes()

    return (
      <div className={classNames(styles.wrapper, className)}>
        <div className={styles.content}>
          {!isEmpty(formatVolumes) && (
            <ul className={styles.list}>
              {formatVolumes.map(volume => (
                <Card
                  volume={volume}
                  key={get(volume, 'metadata.name')}
                  onEdit={this.handleEdit}
                  onDelete={this.handleDelete}
                  banEdit={hideVolumeSetting}
                />
              ))}
            </ul>
          )}
          {!hideVolumeSetting && this.renderAddVolume()}
        </div>
      </div>
    )
  }
}
