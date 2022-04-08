/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
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
import { pick, get, set } from 'lodash'
import ProjectStore from 'stores/project'
import { Select, Icon } from '@kube-design/components'
import CDStore from 'stores/cd'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { ObjectInput } from 'components/Inputs'
import styles from './index.scss'

@observer
export default class Destinations extends React.Component {
  cdStore = new CDStore()

  projectStore = new ProjectStore()

  componentDidMount() {
    this.init()
  }

  @computed
  get clusters() {
    return this.cdStore.clustersList.map(item => ({
      label: item.name,
      value: item.name,
      server: item.server,
    }))
  }

  @computed
  get namespaces() {
    return this.projectStore.list.data
      .filter(item => item.status !== 'Terminating')
      .map(item => ({
        label: item.name,
        value: item.name,
        disabled: item.isFedManaged,
        isFedManaged: item.isFedManaged,
      }))
  }

  async init() {
    this.setState({ initializing: true })

    const { name, namespace, server } = this.props.value || {}

    await this.fetchClusters()

    if (name && server && namespace) {
      const clusterInfo = this.clusters.find(item => item.value === name)

      set(this.state.formData, `name`, get(this.clusters, clusterInfo.value))
      set(this.state.formData, `server`, get(this.clusters, clusterInfo.server))

      await this.fetchNamespaces(clusterInfo.value)

      const namespaceData =
        this.namespaces.find(item => item.value === namespace) ||
        set(this.state.formData, `namespace`, namespaceData.value || '')
    }

    this.setState({ initializing: false })
  }

  async fetchClusters() {
    await this.cdStore.getClustersList()
  }

  fetchNamespaces = async cluster => {
    const _cluster = cluster === 'in-cluster' ? 'default' : cluster

    await this.projectStore.fetchList({
      cluster: _cluster,
      limit: -1,
      type: 'user',
    })
  }

  projectOptionRenderer = option => (
    <span className={styles.option}>
      {option.isFedManaged ? (
        <img className={styles.indicator} src="/assets/cluster.svg" />
      ) : (
        <Icon name="project" />
      )}
      {option.label}
      {option.isFedManaged && (
        <Tooltip content={t('FEDPROJECT_CANNOT_DEPLOY_APP_TIP')}>
          <Icon className={styles.tip} name="question" />
        </Tooltip>
      )}
    </span>
  )

  handleClusterChange = async value => {
    await this.fetchNamespaces(value)
    const server = this.clusters.find(item => item.value === value).server
    this.props.onChange({ name: value, server })
  }

  handleChange = res => {
    this.props.onChange({ ...res })
  }

  render() {
    const { value } = this.props
    return (
      <ObjectInput value={value} onChange={this.handleChange}>
        <Select
          name="name"
          placeholder={t('CLUSTER_PL')}
          options={this.clusters}
          onChange={this.handleClusterChange}
          prefixIcon={<Icon name="cluster" size={16} />}
        />
        <Select
          name="namespace"
          placeholder={t('WORKSPACE_PL')}
          options={this.namespaces}
          pagination={pick(this.projectStore.list, ['page', 'limit', 'total'])}
          isLoading={this.projectStore.list.isLoading}
          onFetch={this.fetchNamespaces}
          valueRenderer={this.projectOptionRenderer}
          optionRenderer={this.projectOptionRenderer}
          searchable
          clearable
        />
      </ObjectInput>
    )
  }
}
