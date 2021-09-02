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
import { isEmpty } from 'lodash'

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
    }
  }

  componentDidMount() {
    const { onCancel } = this.props
    const { registerSubRoute } = this.context
    registerSubRoute && registerSubRoute(this.handleSubmit, onCancel)
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
    const { type } = this.state
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
          const { volumeMounts, ...rest } = data
          volume = rest
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

        onSave(volume, volumeMounts)
        callback && callback()
      })
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
          {t('Volumes')}
        </div>
        <div className={classNames(styles.contentWrapper, contentClassName)}>
          <div className={styles.title}>{t('MOUNT_VOLUME')}</div>
          <RadioGroup
            mode="button"
            value={this.state.type}
            onChange={this.handleTypeChange}
            size="small"
          >
            <RadioButton value="exist">{t('EXISTING_VOLUME')}</RadioButton>
            <RadioButton value="temp">{t('TEMPORARY_VOLUME')}</RadioButton>
            <RadioButton value="host">{t('HOSTPATH_VOLUME')}</RadioButton>
          </RadioGroup>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
