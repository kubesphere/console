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
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Columns, Column } from '@pitrix/lego-ui'
import { Button, Modal, Search, RadioGroup, ScrollLoad } from 'components/Base'
import WorkspaceStore from 'stores/workspace'
import ProjectStore from 'stores/project'
import DevOpsStore from 'stores/devops'

import Card from './Card'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class ProjectSelectModal extends React.Component {
  constructor(props) {
    super(props)

    this.store = new WorkspaceStore()
    this.projectStore = new ProjectStore()
    this.devopsStore = new DevOpsStore()

    this.state = {
      type: props.defaultType || 'projects',
    }
  }

  componentDidMount() {
    this.store.fetchDetail({ workspace: this.props.workspace })
  }

  get enabledActions() {
    const { workspace } = this.props
    return {
      projects: globals.app.getActions({
        workspace,
        module: 'projects',
      }),
      devops: globals.app.getActions({
        workspace,
        module: 'devops',
      }),
    }
  }

  get types() {
    const { detail } = this.store
    const types = []
    if (this.enabledActions.projects.includes('view')) {
      types.push({
        label: t('Projects'),
        value: 'projects',
        count: get(detail, 'annotations["kubesphere.io/namespace-count"]', '0'),
      })
    }

    if (
      this.enabledActions.devops.includes('view') &&
      globals.app.hasKSModule('devops')
    ) {
      types.push({
        label: t('DevOps Projects'),
        value: 'devops',
        count: get(detail, 'annotations["kubesphere.io/devops-count"]', '0'),
      })
    }

    return types
  }

  get canCreate() {
    return this.state.type === 'projects'
      ? this.enabledActions.projects.includes('create')
      : this.enabledActions.devops.includes('create')
  }

  fetchData = query => {
    const { cluster, workspace } = this.props
    const params = { cluster, workspace, ...query }
    if (this.state.type === 'projects') {
      this.projectStore.fetchList(params)
    } else {
      this.devopsStore.fetchList(params)
    }
  }

  handleSearch = keyword => {
    this.fetchData({ keyword })
  }

  handleRefresh = () => {
    this.fetchData()
  }

  handleTypeChange = type => {
    if (this.state.type !== type) {
      this.setState({ type }, () => {
        this.fetchData({ keyword: '' })
      })
    }
  }

  handleEnterWorkspace = () => {
    const { workspace, onChange } = this.props

    if (globals.app.isClusterAdmin) {
      return onChange(`/workspaces/${workspace}/overview`)
    }

    if (
      globals.app.hasPermission({ module: 'workspaces', action: 'manage' }) ||
      globals.app.hasPermission({
        module: 'workspaces',
        action: 'view',
        workspace,
      })
    ) {
      return onChange(`/workspaces/${workspace}/overview`)
    }

    return onChange(`/dashboard`)
  }

  handleOnEnter = item => {
    const { cluster, onChange } = this.props
    if (this.state.type === 'projects') {
      onChange(`/cluster/${cluster}/projects/${item.name}`)
    } else {
      onChange(`/devops/${item.namespace}`)
    }
  }

  showCreate = () => {
    const { workspace, rootStore } = this.props
    if (this.state.type === 'projects') {
      rootStore.triggerAction('project.create', {
        store: this.projectStore,
        workspace,
      })
    } else {
      rootStore.triggerAction('devops.create', {
        store: this.devopsStore,
        workspace,
      })
    }
  }

  render() {
    const { visible, workspace, onCancel } = this.props
    const { type } = this.state
    const { detail } = this.store
    const list =
      type === 'projects' ? this.projectStore.list : this.devopsStore.list
    const { data, total, page, isLoading } = toJS(list)

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
          <Columns>
            <Column className="is-narrow">
              <RadioGroup
                value={type}
                options={this.types}
                onChange={this.handleTypeChange}
              />
            </Column>
            <Column>
              <Search
                placeholder={t('Please enter a name to find')}
                onSearch={this.handleSearch}
              />
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
                key={item.uid || item.project_id}
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
