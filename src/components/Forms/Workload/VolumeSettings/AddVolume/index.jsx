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
import { isEmpty, omit, get, set } from 'lodash'

import { RadioGroup, RadioButton } from '@kube-design/components'
import { ReactComponent as BackIcon } from 'assets/back.svg'

import ObjectMapeer from 'utils/object.mapper'

import AddExistVolumes from '../AddExistVolumes'
import AddTemporary from '../AddTemporary'
import AddHostPath from '../AddHostPath'

import styles from './index.scss'

export default class AddVolume extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    containers: PropTypes.array,
    volume: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    volume: {},
    containers: [],
    onSave() {},
    onCancel() {},
  }

  static contextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.formRef = React.createRef()

    this.state = {
      type: this.checkVolumeType(props.volume) || 'exist',
      editVolume: {},
    }
  }

  componentDidMount() {
    const { onCancel } = this.props
    const { registerSubRoute } = this.context
    registerSubRoute && registerSubRoute(this.handleSubmit, onCancel)
    this.saveEditVolume()
  }

  volumeTypeMap = typeArr => {
    if (typeArr.includes('emptyDir')) {
      return 'temp'
    }
    if (typeArr.includes('hostPath')) {
      return 'host'
    }
    return 'exist'
  }

  saveEditVolume() {
    const { volume } = this.props
    if (!isEmpty(volume)) {
      const type = this.volumeTypeMap(
        Object.keys(omit(volume, ['name', 'volumeMounts']))
      )
      if (type !== 'exist') {
        this.setState({
          editVolume: {
            name: volume.name,
            type,
          },
        })
      } else {
        this.setState({
          editVolume: {
            name: get(volume, 'specVolume.name', ''),
            type,
          },
        })
      }
    }
  }

  handleGoBack = () => {
    const { resetSubRoute } = this.context

    resetSubRoute && resetSubRoute()

    this.props.onCancel()
  }

  checkVolumeType(volume) {
    let type = 'exist'

    if (isEmpty(volume)) {
      return type
    }

    if (volume.emptyDir) {
      type = 'temp'
    } else if (volume.hostPath) {
      type = 'host'
    }

    return type
  }

  handleSubmit = callback => {
    const { onSave } = this.props
    const { type, editVolume } = this.state
    const form = this.formRef.current

    form &&
      form.validate(() => {
        const data = form.getData()

        let volume
        if (type === 'exist') {
          volume = data.volume
        } else if (type === 'temp') {
          volume = { name: data.name, emptyDir: {} }
        } else if (type === 'host') {
          const { hostPath = {}, name } = data
          volume = { hostPath, name }
        } else if (type === 'new') {
          const { volumeMounts, ...rest } = data
          volume = ObjectMapeer.volumes(rest)
        }

        let volumeMounts = []
        if (data.volumeMounts) {
          volumeMounts = data.volumeMounts.map(item => ({
            ...item,
            volume,
          }))
        }

        if (!isEmpty(editVolume)) {
          if (type === 'temp') {
            const { newVolume, newMounts } = this.updateVolume(
              volume,
              volumeMounts,
              'hostPath'
            )
            volume = newVolume
            volumeMounts = newMounts
          }
          if (type === 'host') {
            const { newVolume, newMounts } = this.updateVolume(
              volume,
              volumeMounts,
              'emptyDir'
            )
            volume = newVolume
            volumeMounts = newMounts
          }
        }
        onSave(volume, volumeMounts, this.state.editVolume)
        callback && callback()
      })
  }

  updateVolume = (volume, volumeMounts, omitKey) => {
    const { editVolume } = this.state
    const newVolume = omit(volume, omitKey)
    const otherVolume = volumeMounts.filter(
      item => item.name !== editVolume.name
    )
    const resetVolume = volumeMounts.filter(
      item => item.name === editVolume.name
    )
    if (resetVolume.length > 0) {
      resetVolume[0].volume = omit(resetVolume[0].volume, omitKey)
    }
    return {
      newVolume,
      newMounts: [...otherVolume, ...resetVolume],
    }
  }

  handleTypeChange = type => {
    this.setState({ type })
  }

  renderContent() {
    const {
      volume,
      volumes,
      containers,
      checkVolumeNameExist,
      collectSavedLog,
    } = this.props
    let content

    const currentName = volume.name
    const volumeMounts = get(volume, 'volumeMounts', [])
    if (this.state.type === 'exist') {
      const existName = get(volume, 'specVolume.name', false)
      existName && (volume.name = existName)
    } else {
      const tempAndHostName = get(volume, 'name', false)
      if (tempAndHostName) {
        volume.name = tempAndHostName
        set(volume, 'specVolume.name', tempAndHostName)
      }
    }

    if (volumeMounts.length > 0) {
      volume.volumeMounts.forEach(item => set(item, 'name', volume.name))
    }

    switch (this.state.type) {
      case 'temp': {
        content = (
          <AddTemporary
            formRef={this.formRef}
            formData={volume}
            currentName={currentName}
            containers={containers}
            checkVolumeNameExist={checkVolumeNameExist}
            collectSavedLog={collectSavedLog}
          />
        )
        break
      }
      case 'host': {
        content = (
          <AddHostPath
            formRef={this.formRef}
            formData={volume}
            currentName={currentName}
            containers={containers}
            checkVolumeNameExist={checkVolumeNameExist}
          />
        )
        break
      }
      default:
      case 'exist': {
        content = (
          <AddExistVolumes
            formRef={this.formRef}
            formData={volume}
            currentName={currentName}
            volumes={volumes}
            containers={containers}
            collectSavedLog={collectSavedLog}
          />
        )
        break
      }
    }

    return content
  }

  render() {
    const { className, contentClassName } = this.props
    return (
      <div className={classNames(styles.wrapper, className)}>
        <div className="h6">
          <a className="custom-icon" onClick={this.handleGoBack}>
            <BackIcon />
          </a>
          {t('VOLUME_PL')}
        </div>
        <div className={classNames(styles.contentWrapper, contentClassName)}>
          <div className={styles.title}>{t('MOUNT_VOLUME')}</div>
          <RadioGroup
            mode="button"
            value={this.state.type}
            onChange={this.handleTypeChange}
            size="small"
          >
            <RadioButton value="exist">{t('PERSISTENT_VOLUME')}</RadioButton>
            <RadioButton value="temp">{t('TEMPORARY_VOLUME')}</RadioButton>
            <RadioButton value="host">{t('HOSTPATH_VOLUME')}</RadioButton>
          </RadioGroup>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
