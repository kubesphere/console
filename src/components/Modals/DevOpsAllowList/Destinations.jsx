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
import { pick, get, set, isEmpty, isEqual } from 'lodash'
import { ObjectInput } from 'components/Inputs'
import ProjectStore from 'stores/project'
import { Select, Icon } from '@kube-design/components'
import { action, computed, observable } from 'mobx'
import { observer } from 'mobx-react'
import { inCluster2Default } from 'utils'

import styles from './index.scss'

@observer
export default class Destinations extends React.Component {
  projectStore = new ProjectStore()

  state = {
    formData: {},
  }

  @observable
  cluster = this.props.formtemplate.name || ''

  @computed
  get clusters() {
    return this.props.clusters || []
  }

  get destinations() {
    return get(this.props.formtemplate, 'spec.argo.destinations', [])
  }

  componentDidMount() {
    this.init()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.formtemplate, this.props.formtemplate)) {
      this.init()
    }
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
    const { name, namespace, server } =
      this.destinations[this.props.index] || {}

    if (name && server && namespace && this.clusters.length > 0) {
      const clusterInfo = this.clusters.find(item => item.value === name)

      set(this.state.formData, `name`, get(this.clusters, clusterInfo.value))
      set(this.state.formData, `server`, get(this.clusters, clusterInfo.server))

      this.cluster = clusterInfo.value

      await this.fetchNamespaces()

      const namespaceData =
        this.namespaces.find(item => item.value === namespace) ||
        set(this.state.formData, `namespace`, namespaceData.value || '')
    }
  }

  fetchNamespaces = async (params = {}) => {
    const _cluster = inCluster2Default(this.cluster)
    await this.projectStore.fetchList({
      cluster: _cluster,
      ...params,
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

  @action
  handleClusterChange = async value => {
    await this.fetchNamespaces()
    const server = this.clusters.find(item => item.value === value).server
    this.cluster = value
    this.props.onChange({ name: value, server })
  }

  handleChange = res => {
    this.props.onChange({ ...res })
  }

  checkDestinationsValid = value => {
    return !isEmpty(value) && value.name && value.namespace && value.server
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
