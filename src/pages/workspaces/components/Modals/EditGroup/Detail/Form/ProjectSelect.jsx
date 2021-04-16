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
import PropTypes from 'prop-types'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { isEqual } from 'lodash'

import { Select, Icon, Tooltip } from '@kube-design/components'

import RoleStore from 'stores/role'
import ProjectStore from 'stores/project'

import styles from './index.scss'

@observer
export default class ProjectSelect extends Component {
  static propTypes = {
    clusters: PropTypes.array,
  }

  constructor(props) {
    super(props)

    this.workspaceStore = props.workspaceStore
    this.projectStore = new ProjectStore()
    this.roleStore = new RoleStore()

    this.state = {
      cluster: props.value.cluster || '',
      namespace: props.value.namespace || '',
      role: props.value.role || '',
    }
  }

  componentDidMount() {
    this.fetchProjects()
    this.fetchRoles()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.value, this.props.value)) {
      this.setState(
        {
          cluster: this.props.value.cluster || '',
          namespace: this.props.value.namespace || '',
          role: this.props.value.role || '',
        },
        () => {
          this.fetchProjects()
          this.fetchRoles()
        }
      )
    }
  }

  @computed
  get projects() {
    const { arrayValue = [] } = this.props
    return this.projectStore.list.data
      .filter(item =>
        arrayValue.every(
          arrv =>
            arrv.cluster !== this.state.cluster || arrv.namespace !== item.name
        )
      )
      .map(item => ({
        label: item.name,
        value: item.name,
        item,
      }))
  }

  @computed
  get roles() {
    return this.roleStore.list.data.map(role => ({
      label: role.name,
      value: role.name,
      item: role,
    }))
  }

  fetchProjects() {
    const { cluster } = this.state
    const { showClusterSelect } = this.props
    if (cluster || !showClusterSelect) {
      this.projectStore.fetchList({
        workspace: this.props.workspace,
        cluster,
        labelSelector:
          'kubefed.io/managed!=true, kubesphere.io/kubefed-host-namespace!=true',
        limit: -1,
        sortBy: 'createTime',
      })
    }
  }

  fetchRoles() {
    const { cluster, namespace } = this.state
    if (namespace) {
      this.roleStore.fetchList({
        workspace: this.props.workspace,
        cluster,
        namespace,
        limit: -1,
        sortBy: 'createTime',
      })
    }
  }

  handleChange = () => {
    const { cluster, namespace, role } = this.state
    this.props.onChange({ cluster, namespace, role })
  }

  handleClusterChange = cluster => {
    this.setState({ cluster, namespace: '', role: '' }, () => {
      this.handleChange()
      this.fetchProjects()
      this.roleStore.list.update({ data: [] })
    })
  }

  handleProjectsChange = namespace => {
    this.setState({ namespace, role: '' }, () => {
      this.handleChange()
      this.fetchRoles()
    })
  }

  handleRoleChange = role => {
    this.setState({ role }, () => this.handleChange())
  }

  clusterRenderer = option => {
    return (
      <span>
        <span>{option.value}</span>
        {option.needUpgrade && (
          <Tooltip
            content={t('CLUSTER_UPGRADE_REQUIRED', { version: 'v3.1.0' })}
            placement="bottom"
          >
            <Icon
              name="update"
              className={styles.tip}
              color={{
                primary: '#ffc781',
                secondary: '#f5a623',
              }}
            />
          </Tooltip>
        )}
      </span>
    )
  }

  render() {
    const {
      clusters,
      value: { disabled },
      showClusterSelect,
    } = this.props
    const { cluster, namespace, role } = this.state
    return (
      <div className={styles.selectWrapper}>
        {showClusterSelect && (
          <Select
            name="cluster"
            value={cluster}
            disabled={disabled}
            options={clusters}
            placeholder={t('Please select a cluster')}
            valueRenderer={option => `${t('Cluster')}: ${option.value}`}
            optionRenderer={this.clusterRenderer}
            prefixIcon={<Icon name="cluster" size={16} />}
            onChange={this.handleClusterChange}
          />
        )}
        <Select
          name="namespace"
          value={namespace}
          disabled={disabled}
          options={this.projects}
          placeholder={t('Please select a project')}
          valueRenderer={option => `${t('Project')}: ${option.value}`}
          prefixIcon={<Icon name="project" size={16} />}
          onChange={this.handleProjectsChange}
        />
        <Select
          name="role"
          value={role}
          disabled={disabled}
          options={this.roles}
          valueRenderer={option => `${t('Project Role')}: ${option.value}`}
          prefixIcon={<Icon name="role" size={16} />}
          placeholder={t('Please select a project role')}
          onChange={this.handleRoleChange}
        />
      </div>
    )
  }
}
