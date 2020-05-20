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

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router'
import { Select } from '@pitrix/lego-ui'

import styles from './index.scss'

@withRouter
@inject('rootStore')
@observer
export default class ClusterSelect extends Component {
  routing = this.props.rootStore.routing

  get workspace() {
    return this.props.match.params.workspace
  }

  handleChange = cluster => {
    const { module } = this.props

    this.routing.push(
      `/workspaces/${this.workspace}/${module}?cluster=${cluster}`
    )
  }

  valueRenderer = option => `${t('Cluster')}: ${option.label}`

  render() {
    const { cluster, clusters } = this.props

    return (
      <Select
        className={styles.select}
        value={cluster}
        onChange={this.handleChange}
        options={clusters}
        valueRenderer={this.valueRenderer}
      />
    )
  }
}
