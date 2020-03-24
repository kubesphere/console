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
import { SearchSelect } from 'components/Base'
import ProjectStore from 'stores/project'

import styles from './index.scss'

@withRouter
@inject('rootStore')
@observer
export default class ProjectSelect extends Component {
  projectStore = new ProjectStore()

  routing = this.props.rootStore.routing

  componentDidMount() {
    this.fetchProjects()
  }

  fetchProjects = (params = {}) => {
    const { cluster } = this.props.match.params
    return this.projectStore.fetchList({
      cluster,
      metrics: false,
      ...params,
    })
  }

  getProjects() {
    return [
      { label: t('All'), value: '' },
      ...this.projectStore.list.data.map(item => ({
        label: item.name,
        value: item.name,
      })),
    ]
  }

  handleChange = namespace => {
    const { module } = this.props
    const { cluster } = this.props.match.params

    if (!namespace) {
      this.routing.push(`/clusters/${cluster}/${module}`)
    } else {
      this.routing.push(`/clusters/${cluster}/${module}?namespace=${namespace}`)
    }
  }

  render() {
    const { namespace = '' } = this.props

    return (
      <SearchSelect
        className={styles.select}
        value={namespace}
        onChange={this.handleChange}
        options={this.getProjects()}
        page={this.projectStore.list.page}
        total={this.projectStore.list.total}
        currentLength={this.projectStore.list.data.length}
        isLoading={this.projectStore.list.isLoading}
        onFetch={this.fetchProjects}
      />
    )
  }
}
