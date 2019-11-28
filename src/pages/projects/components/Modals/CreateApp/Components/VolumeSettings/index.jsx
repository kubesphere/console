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
import { isUndefined } from 'lodash'
import { observer, inject } from 'mobx-react'

import { Component as Base } from 'components/Forms/Workload/VolumeSettings'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class VolumeSettings extends Base {
  get formTemplate() {
    return this.props.formData.workload
  }

  get selectVolume() {
    return this.props.selectVolume
  }

  showVolume = () => {
    this.props.onUpdateState({
      state: 'ShowVolume',
      selectVolume: {},
    })
  }

  showEditVolume = volume => {
    let state

    if (!isUndefined(volume.configMap) || !isUndefined(volume.secret)) {
      state = 'ShowConfig'
    } else {
      state = 'ShowVolume'
    }

    this.props.onUpdateState({ state, selectVolume: volume })
  }

  showVolumeTemplate = () => {
    this.props.onUpdateState({
      state: 'ShowVolumeTemplate',
    })
  }

  showEditVolumeTemplate = volume => {
    this.props.onUpdateState({
      state: 'ShowVolumeTemplate',
      selectVolume: volume,
    })
  }

  resetState = state => {
    this.props.onUpdateState({ state: state || '' })
  }

  showConfig = () => {
    this.props.onUpdateState({ state: 'ShowConfig', selectVolume: {} })
  }

  render() {
    const { state } = this.props

    let content = null

    switch (state) {
      case 'ShowVolume':
        content = <div className={styles.wrapper}>{this.renderVolume()}</div>
        break
      case 'ShowConfig':
        content = <div className={styles.wrapper}>{this.renderConfig()}</div>
        break
      case 'ShowVolumeTemplate':
        content = (
          <div className={styles.wrapper}>{this.renderVolumeTemplate()}</div>
        )
        break
      default:
        content = this.renderList()
    }

    return content
  }
}
