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
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { get } from 'lodash'
import { Select } from '@kube-design/components'
import RoleStore from 'stores/role'

import styles from './index.scss'

@observer
export default class RoleSelect extends Component {
  roleStore = new RoleStore()

  componentDidMount() {
    this.props.namespace && this.fetchRoles()
  }

  componentDidUpdate(prevProps) {
    if (this.props.namespace !== prevProps.namespace && this.props.namespace) {
      this.fetchRoles()
    }
  }

  @computed
  get roles() {
    return this.roleStore.list.data.map(role => ({
      label: role.name,
      value: role.name,
      item: role,
      desc: t(get(role, 'description')),
    }))
  }

  fetchRoles = () => {
    const { cluster, namespace } = this.props
    return this.roleStore.fetchList({
      cluster,
      namespace,
      limit: -1,
      sortBy: 'createTime',
    })
  }

  optionRenderer = option => (
    <div className={styles.option}>
      <div>{option.label}</div>
      <p>{option.desc}</p>
    </div>
  )

  render() {
    const { ...rest } = this.props

    return (
      <Select
        options={this.roles}
        optionRenderer={this.optionRenderer}
        {...rest}
      />
    )
  }
}
