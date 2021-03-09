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

import { get } from 'lodash'
import React from 'react'
import classNames from 'classnames'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import {
  Button,
  RadioGroup,
  InputSearch,
  Columns,
  Column,
} from '@kube-design/components'
import { Modal, ScrollLoad } from 'components/Base'

import WorkspaceStore from 'stores/workspace'
import ProjectStore from 'stores/project'
import FederatedStore from 'stores/project.federated'
import DevOpsStore from 'stores/devops'

import Card from './Card'
import ClusterSelect from './ClusterSelect'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class ProjectSelectModal extends React.Component {
  constructor(props) {
    super(props)

    this.store = new WorkspaceStore()
    this.projectStore = new ProjectStore()
    this.fedProjectStore = new FederatedStore({ module: 'namespaces' })
    this.devopsStore = new DevOpsStore()

    this.stores = {
      devops: this.devopsStore,
      federatedprojects: this.fedProjectStore,
      projects: this.projectStore,
    }

    this.state = {
      type: props.defaultType || 'projects',
      cluster: props.cluster || '',
      search: '',
    }
  }

  componentDidMount() {
    this.store.fetchDetail({ workspace: this.props.workspace })
    this.store.fetchClusters({ workspace: this.props.workspace }).then(() => {
      if (!this.state.cluster) {
        this.setState({
          cluster: get(this.store.clusters, 'data[0].name', ''),
        })
      }
    })
  }

  get clusters() {
    return this.store.clusters.data.map(item => ({
      label: item.name,
      value: item.name,
      cluster: item,
      disabled: !item.isReady,
    }))
  }

  get enabledActions() {
    const { workspace } = this.props
    return {
      projects: globals.app.getActions({ workspace, module: 'projects' }),
      federatedprojects: globals.app.getActions({
        workspace,
        module: 'federatedprojects',
      }),
      devops: globals.app.getActions({ workspace, module: 'devops' }),
    }
  }

  get types() {
    const types = [
      {
        label: t('Projects'),
        value: 'projects',
      },
    ]

    if (globals.app.isMultiCluster) {
      types.push({
        label: t('Multi-cluster Projects'),
        value: 'federatedprojects',
      })
    }

    if (globals.app.hasKSModule('devops')) {
      types.push({
        label: t('DevOps Projects'),
        value: 'devops',
      })
    }

    return types
  }

  get canCreate() {
    return this.enabledActions[this.state.type].includes('create')
  }

  fetchData = query => {
    const { workspace } = this.props
    const { cluster, search } = this.state
    const params = { workspace, ...query }

    if (this.state.type === 'federatedprojects') {
      params.labelSelector = `kubesphere.io/workspace=${workspace}`
    } else {
      params.cluster = cluster
      params.labelSelector = 'kubefed.io/managed!=true'
    }

    if (search) {
      params.name = search
    }

    this.stores[this.state.type].fetchList(params)
  }

  handleSearch = name => {
    this.setState({ search: name }, this.fetchData)
  }

  handleRefresh = () => this.fetchData()

  handleTypeChange = type => {
    if (this.state.type !== type) {
      this.setState({ type, search: '' }, this.fetchData)
    }
  }

  handleClusterChange = cluster => {
    this.setState({ cluster, search: '' }, this.fetchData)
  }

  handleEnterWorkspace = () => {
    const { workspace, onChange } = this.props
    return onChange(`/workspaces/${workspace}`)
  }

  handleOnEnter = item => {
    const { workspace, onChange } = this.props
    const { cluster } = this.state
    if (this.state.type === 'projects') {
      onChange(`/${workspace}/clusters/${cluster}/projects/${item.name}`)
    } else if (this.state.type === 'federatedprojects') {
      onChange(`/${workspace}/federatedprojects/${item.name}`)
    } else {
      item.namespace && cluster
        ? onChange(`/${workspace}/clusters/${cluster}/devops/${item.namespace}`)
        : null
    }
  }

  clusterRenderer = option => `${t('Cluster')}: ${option.label}`

  showCreate = () => {
    const { workspace, rootStore } = this.props
    const { cluster } = this.state
    if (this.state.type === 'projects') {
      rootStore.triggerAction('project.create', {
        store: this.projectStore,
        workspace,
        success: () => this.fetchData(),
      })
    } else if (this.state.type === 'federatedprojects') {
      rootStore.triggerAction('federated.project.create', {
        store: this.projectStore,
        workspace,
        clusters: this.store.clusters.data.slice(),
        success: () => this.fetchData(),
      })
    } else {
      rootStore.triggerAction('devops.create', {
        store: this.devopsStore,
        cluster,
        workspace,
        success: () => this.fetchData(),
      })
    }
  }

  render() {
    const { visible, workspace, onCancel } = this.props
    const { type, cluster } = this.state
    const { detail } = this.store
    const list = this.stores[type].list
    const { data, total, page, isLoading } = toJS(list)

    const showClusterSelect =
      globals.app.isMultiCluster && type !== 'federatedprojects'

    return (
      <Modal
        bodyClassName={styles.body}
        visible={visible}
        onCancel={onCancel}
        width={960}
        icon="enterprise"
        title={<a onClick={this.handleEnterWorkspace}>{workspace}</a>}
        description={get(detail, 'description') || t('Workspace')}
        hideFooter
      >
        <div className={styles.bar}>
          <Columns className="is-variable is-1">
            <Column className="is-narrow">
              <RadioGroup
                mode="button"
                value={type}
                options={this.types}
                onChange={this.handleTypeChange}
              />
            </Column>
            <Column>
              <div className={styles.searchWrapper}>
                {showClusterSelect && (
                  <ClusterSelect
                    className={styles.cluster}
                    options={this.clusters}
                    value={cluster}
                    onChange={this.handleClusterChange}
                  />
                )}
                <InputSearch
                  className={classNames(styles.search, {
                    [styles.withSelect]: showClusterSelect,
                  })}
                  value={this.state.search}
                  placeholder={t('Search by name')}
                  onSearch={this.handleSearch}
                />
              </div>
            </Column>
            <Column className="is-narrow">
              <div>
                <Button
                  icon="refresh"
                  type="flat"
                  onClick={this.handleRefresh}
                />
                {this.canCreate && (
                  <Button type="control" onClick={this.showCreate}>
                    {t('Create Project')}
                  </Button>
                )}
              </div>
            </Column>
          </Columns>
        </div>
        <div className={styles.list}>
          <ScrollLoad
            wrapperClassName={styles.listWrapper}
            data={data}
            total={total}
            page={page}
            loading={isLoading}
            onFetch={this.fetchData}
          >
            {data.map(item => (
              <Card
                key={item.uid || item.devops}
                data={item}
                type={type}
                onEnter={this.handleOnEnter}
              />
            ))}
          </ScrollLoad>
        </div>
      </Modal>
    )
  }
}
