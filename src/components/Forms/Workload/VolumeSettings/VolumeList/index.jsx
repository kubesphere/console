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
import { concat, get, set, isEmpty, isUndefined } from 'lodash'
import { Columns, Column } from '@kube-design/components'
import { List } from 'components/Base'
import { isNotPersistentVolume } from 'utils/volume'

import Card from './Card'

import styles from './index.scss'

export default class VolumeList extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.array,
    volumes: PropTypes.array,
    volumeTypes: PropTypes.array,
    containers: PropTypes.array,
    onChange: PropTypes.func,
    onShowVolume: PropTypes.func,
    onShowConfig: PropTypes.func,
    onShowEdit: PropTypes.func,
  }

  static defaultProps = {
    prefix: '',
    name: '',
    value: [],
    volumes: [],
    volumeTypes: [],
    containers: [],
    onChange() {},
    onShowVolume() {},
    onShowConfig() {},
    onShowEdit() {},
  }

  static contextTypes = {
    formData: PropTypes.object,
  }

  getFormattedVolumes = () => {
    const { value, volumes, containers, logPath } = this.props

    if (isEmpty(value)) {
      return []
    }

    return value.map(item => {
      let volume = {}
      if (!isUndefined(item.persistentVolumeClaim)) {
        volume = volumes.find(
          v => v.name === item.persistentVolumeClaim.claimName
        )
      }

      const volumeMounts = []
      containers.forEach(container => {
        if (container.volumeMounts) {
          const volumeMount = container.volumeMounts.find(
            vm => vm.name === item.name
          )

          if (volumeMount) {
            const log = get(
              logPath,
              `containerLogConfigs.${container.name}.${item.name}`,
              []
            ).join(',')

            volumeMounts.push({
              ...volumeMount,
              logPath: log,
              containerName: container.name,
            })
          }
        }
      })

      return { ...item, volume, volumeMounts }
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
    this.props.onShowVolume()
  }

  handleAddConfig = () => {
    this.props.onShowConfig()
  }

  handleEdit = data => {
    const { volume, volumeMounts, ...rest } = data

    if (isNotPersistentVolume(data)) {
      this.props.onShowEdit({
        ...rest,
        volumeMounts,
      })
    } else {
      this.props.onShowEdit({
        volume,
        volumeMounts,
        specVolume: { ...rest },
      })
    }
  }

  handleDelete = name => {
    const { value, onChange } = this.props

    this.deleteVolumeMounts(name)

    onChange(value.filter(item => item.name !== name))
  }

  renderAddVolume() {
    return (
      <Columns>
        <Column>
          <List.Add
            onClick={this.handleAddVolume}
            title={t('MOUNT_VOLUME')}
            description={t('WORKLOAD_MOUNT_VOLUME_DESC')}
          />
        </Column>
        <Column>
          <List.Add
            onClick={this.handleAddConfig}
            title={t('MOUNT_CONFIGMAP_OR_SECRET')}
            description={t('MOUNT_CONFIGMAP_OR_SECRET_DESC')}
          />
        </Column>
      </Columns>
    )
  }

  render() {
    const { className } = this.props

    const formatVolumes = this.getFormattedVolumes()

    return (
      <div className={classNames(styles.wrapper, className)}>
        <div className={styles.content}>
          {!isEmpty(formatVolumes) && (
            <ul className={styles.list}>
              {formatVolumes.map(volume => (
                <Card
                  volume={volume}
                  key={volume.name}
                  onEdit={this.handleEdit}
                  onDelete={this.handleDelete}
                />
              ))}
            </ul>
          )}
          {this.renderAddVolume()}
        </div>
      </div>
    )
  }
}
