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
import { observer } from 'mobx-react'
import { Columns, Column } from '@pitrix/lego-ui'
import { Button, Modal, Search, RadioGroup, ScrollLoad } from 'components/Base'
import WorkspaceStore from 'stores/workspace'

import Card from './Card'

import styles from './index.scss'

@observer
export default class ProjectSelectModal extends React.Component {
  constructor(props) {
    super(props)
    this.store = new WorkspaceStore()
    this.state = {
      type: props.defaultType || 'projects',
    }
  }

  get enabledActions() {
    return {
      projects: globals.app.getActions({
        workspace: this.props.workspace.name,
        module: 'projects',
      }),
      devops: globals.app.getActions({
        workspace: this.props.workspace.name,
        module: 'devops',
      }),
    }
  }

  get types() {
    const { workspace = {} } = this.props
    const types = []

    if (this.enabledActions.projects.includes('view')) {
      types.push({
        label: t('Projects'),
        value: 'projects',
        count: get(
          workspace,
          'annotations["kubesphere.io/namespace-count"]',
          '0'
        ),
      })
    }

    if (
      this.enabledActions.devops.includes('view') &&
      globals.app.hasKSModule('devops')
    ) {
      types.push({
        label: t('DevOps Projects'),
        value: 'devops',
        count: get(workspace, 'annotations["kubesphere.io/devops-count"]', '0'),
      })
    }

    return types
  }

  fetchData = query => {
    const { keyword } = this.store.list
    const { workspace = {} } = this.props
    const params = {
      keyword,
      workspace: workspace.name,
      ...query,
    }
    if (this.state.type === 'projects') {
      this.store.fetchNamespaces(params)
    } else {
      this.store.fetchDevOps(params)
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
    const { workspace = {}, onChange } = this.props

    if (globals.app.isClusterAdmin) {
      return onChange(`/workspaces/${workspace.name}/overview`)
    }

    if (
      globals.app.hasPermission({ module: 'workspaces', action: 'manage' }) ||
      globals.app.hasPermission({
        module: 'workspaces',
        action: 'view',
        workspace: workspace.name,
      })
    ) {
      return onChange(`/workspaces/${workspace.name}/overview`)
    }

    return onChange(`/dashboard`)
  }

  handleOnEnter = item => {
    const { onChange } = this.props
    if (this.state.type === 'devops') {
      onChange(`/devops/${item.project_id}`)
    } else {
      onChange(`/projects/${item.name}`)
    }
  }

  render() {
    const { visible, workspace = {}, onCancel, onShowCreate } = this.props
    const { type } = this.state
    const list = type === 'devops' ? this.store.devops : this.store.namespaces
    const { data, total, page, isLoading } = toJS(list)

    return (
      <Modal
        bodyClassName={styles.body}
        visible={visible}
        onCancel={onCancel}
        width={960}
        icon="enterprise"
        title={<a onClick={this.handleEnterWorkspace}>{workspace.name}</a>}
        description={get(workspace, 'description') || '-'}
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
                {onShowCreate && (
                  <Button type="control" onClick={onShowCreate}>
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
