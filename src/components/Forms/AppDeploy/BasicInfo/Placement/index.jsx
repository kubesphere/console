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
import { get, set } from 'lodash'
import classNames from 'classnames'
import { Icon, Columns, Column, Select, Loading } from '@pitrix/lego-ui'
import { Text, Form, SearchSelect } from 'components/Base'
import Confirm from 'components/Forms/Base/Confirm'
import WorkspaceStore from 'stores/workspace'
import ProjectStore from 'stores/project'

import styles from './index.scss'

@observer
export default class Placment extends Component {
  state = {
    showForm: false,
    initializing: true,
    formData: this.props.formData,
  }

  formRef = React.createRef()

  workspaceStore = new WorkspaceStore()

  projectStore = new ProjectStore()

  componentDidMount() {
    this.init()
  }

  @computed
  get workspaces() {
    return this.workspaceStore.list.data
      .filter(item => item.name !== globals.config.systemWorkspace)
      .map(item => ({
        label: item.name,
        value: item.name,
      }))
  }

  @computed
  get clusters() {
    return this.workspaceStore.clusters.data.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  @computed
  get namespaces() {
    return this.projectStore.list.data.map(item => ({
      label: item.name,
      value: item.name,
      opRuntime: item.opRuntime,
    }))
  }

  async init() {
    this.setState({ initializing: true })

    const { workspace, cluster, namespace } = this.state.formData
    await this.fetchWorkspaces()

    if (!workspace) {
      set(this.state.formData, 'workspace', get(this.workspaces, '[0].value'))
    }

    await this.fetchClusters()

    if (!cluster) {
      set(this.state.formData, 'cluster', get(this.clusters, '[0].value'))
    }

    await this.fetchNamespaces()

    if (!namespace) {
      set(this.state.formData, 'namespace', get(this.namespaces, '[0].value'))
      set(
        this.state.formData,
        'runtime_id',
        get(this.namespaces, '[0].opRuntime')
      )
    }

    Object.assign(this.props.formData, this.state.formData)

    this.setState({ initializing: false })
  }

  async fetchWorkspaces(params = {}) {
    await this.workspaceStore.fetchList({
      ...params,
      limit: -1,
      ascending: true,
    })
  }

  async fetchClusters(params = {}) {
    const { workspace } = this.state.formData
    if (workspace) {
      await this.workspaceStore.fetchClusters({
        ...params,
        workspace,
        limit: -1,
        ascending: true,
      })
    }
  }

  fetchNamespaces = async (params = {}) => {
    const { workspace, cluster } = this.state.formData
    if (workspace && cluster) {
      await this.projectStore.fetchList({
        ...params,
        workspace,
        cluster,
        ascending: true,
      })
    }
  }

  handleWorkspaceChange = () => {
    this.fetchClusters()
  }

  handleClusterChange = () => {
    this.fetchNamespaces()
  }

  handleSubmit = () => {
    const form = this.formRef.current
    form &&
      form.validate(() => {
        const namespace = this.state.formData.namespace
        const runtime_id = (
          this.projectStore.list.data.find(item => item.name === namespace) ||
          {}
        ).opRuntime

        Object.assign(this.props.formData, {
          ...this.state.formData,
          runtime_id,
        })
        this.hideForm()
      })
  }

  showForm = () => {
    this.setState({ showForm: true })
  }

  hideForm = () => {
    this.setState({ showForm: false })
  }

  renderPlacement() {
    const { formData } = this.props
    const { namespace, workspace, cluster } = formData
    return (
      <div className={styles.placement}>
        <Text icon="project" title={namespace} description={t('Project')} />
        <Text title={cluster} description={t('Cluster')} />
        <Text title={workspace} description={t('Workspace')} />
        <Icon className={styles.icon} name="chevron-down" size={20} />
      </div>
    )
  }

  renderForm() {
    const { workspace } = this.props
    return (
      <div className={styles.form}>
        <Form ref={this.formRef} type="inner" data={this.state.formData}>
          <Columns>
            <Column>
              <Form.Item label={t('Workspace')}>
                <Select
                  name="workspace"
                  placeholder={t('Please select a workspace')}
                  options={this.workspaces}
                  onChange={this.handleWorkspaceChange}
                  prefixIcon={<Icon name="enterprise" size={16} />}
                  disabled={!!workspace}
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('Cluster')}>
                <Select
                  name="cluster"
                  placeholder={t('Please select a cluster')}
                  options={this.clusters}
                  onChange={this.handleClusterChange}
                  prefixIcon={<Icon name="cluster" size={16} />}
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item
                label={t('Project')}
                rules={[
                  { required: true, message: t('Please select a project') },
                ]}
              >
                <SearchSelect
                  name="namespace"
                  placeholder={t('Please select a project')}
                  options={this.namespaces}
                  page={this.projectStore.list.page}
                  total={this.projectStore.list.total}
                  isLoading={this.projectStore.list.isLoading}
                  currentLength={this.projectStore.list.data.length}
                  prefixIcon={<Icon name="project" size={16} />}
                  onFetch={this.fetchNamespaces}
                />
              </Form.Item>
            </Column>
          </Columns>
        </Form>
        <Confirm
          className={styles.confirm}
          onOk={this.handleSubmit}
          onCancel={this.hideForm}
        />
      </div>
    )
  }

  render() {
    const { showForm, formData, initializing } = this.state
    if (showForm) {
      return this.renderForm()
    }

    return (
      <div
        className={classNames(styles.wrapper, {
          [styles.expand]: showForm,
        })}
        onClick={this.showForm}
      >
        {!formData.namespace ? (
          <div className={styles.placeholder}>
            {initializing ? (
              <Loading className="text-center" />
            ) : (
              t('Please select a project to deploy')
            )}
          </div>
        ) : (
          this.renderPlacement()
        )}
      </div>
    )
  }
}
