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
import { observer } from 'mobx-react'
import { Icon, Tooltip } from '@pitrix/lego-ui'
import { SearchSelect } from 'components/Base'
import ProjectStore from 'stores/project'

import styles from './index.scss'

@observer
export default class ProjectSelect extends Component {
  projectStore = new ProjectStore()

  componentDidMount() {
    this.fetchProjects()
  }

  fetchProjects = (params = {}) => {
    const { cluster } = this.props
    return this.projectStore.fetchList({
      cluster,
      ...params,
    })
  }

  getProjects() {
    const { defaultValue } = this.props
    const { data } = this.projectStore.list

    const result = data.map(item => ({
      label: item.name,
      value: item.name,
      disabled: item.isFedManaged,
      isFedManaged: item.isFedManaged,
    }))

    if (defaultValue && !data.find(item => item.name === defaultValue)) {
      result.unshift({
        label: defaultValue,
        value: defaultValue,
      })
    }

    return result
  }

  optionRenderer = option => (
    <span className={styles.option}>
      {option.isFedManaged ? (
        <img className={styles.indicator} src="/assets/cluster.svg" />
      ) : (
        <Icon name="project" />
      )}
      {option.label}
      {option.isFedManaged && (
        <Tooltip content={t('FEDPROJECT_RESOURCE_TIP')}>
          <Icon className={styles.tip} name="question" />
        </Tooltip>
      )}
    </span>
  )

  render() {
    const { cluster, ...rest } = this.props

    if (!rest.value && rest.defaultValue) {
      rest.value = rest.defaultValue
    }

    return (
      <SearchSelect
        options={this.getProjects()}
        page={this.projectStore.list.page}
        total={this.projectStore.list.total}
        currentLength={this.projectStore.list.data.length}
        isLoading={this.projectStore.list.isLoading}
        valueRenderer={this.optionRenderer}
        optionRenderer={this.optionRenderer}
        onFetch={this.fetchProjects}
        {...rest}
      />
    )
  }
}
