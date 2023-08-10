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

import {
  Column,
  Columns,
  Form,
  Icon,
  Loading,
  Select,
  Tooltip,
} from '@kube-design/components'
import classNames from 'classnames'
import StatusReason from 'clusters/components/StatusReason'

import { Text } from 'components/Base'
import Confirm from 'components/Forms/Base/Confirm'
import { get, pick, set } from 'lodash'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import React, { Component } from 'react'
import ProjectStore from 'stores/project'
import WorkspaceStore from 'stores/workspace'
import { showNameAndAlias } from 'utils'

import styles from './index.scss'

@observer
export default class Placement extends Component {
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
        label: showNameAndAlias(item),
        value: item.name,
      }))
  }

  @computed
  get clusters() {
    return this.workspaceStore.clusters.data.map(item => ({
      label: showNameAndAlias(item),
      value: item.name,
      disabled: !item.isReady,
      cluster: item,
    }))
  }

  @computed
  get namespaces() {
    return this.projectStore.list.data
      .filter(item => item.status !== 'Terminating')
      .map(item => ({
        label: showNameAndAlias(item),
        value: item.name,
        disabled: item.isFedManaged,
        isFedManaged: item.isFedManaged,
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
      const firstValidNamepsace =
        this.namespaces.find(item => !item.disabled) || {}
      set(this.state.formData, 'namespace', firstValidNamepsace.value || '')
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
    set(this.state.formData, 'cluster', '')
    set(this.state.formData, 'namespace', '')
  }

  handleClusterChange = () => {
    this.fetchNamespaces()
    set(this.state.formData, 'namespace', '')
  }

  handleSubmit = () => {
    const form = this.formRef.current
    form &&
      form.validate(() => {
        Object.assign(this.props.formData, {
          ...this.state.formData,
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
        <Text
          title={showNameAndAlias(workspace, 'workspace')}
          description={t('WORKSPACE')}
        />
        <Text
          title={showNameAndAlias(cluster, 'cluster')}
          description={t('CLUSTER')}
        />
        <Text
          icon="project"
          title={showNameAndAlias(namespace, 'project', { cluster })}
          description={t('PROJECT')}
        />
        <Icon className={styles.icon} name="chevron-down" size={20} />
      </div>
    )
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

  clusterOptionRenderer = option => (
    <div>
      <div>{option.label}</div>
      {!option.cluster.isReady && (
        <div>
          <StatusReason data={option.cluster} noTip />
        </div>
      )}
    </div>
  )

  renderForm() {
    const { workspace } = this.props
    return (
      <div className={styles.form}>
        <Form ref={this.formRef} type="inner" data={this.state.formData}>
          <Columns>
            <Column>
              <Form.Item label={t('WORKSPACE')}>
                <Select
                  name="workspace"
                  placeholder={t('WORKSPACE_EMPTY_DESC')}
                  options={this.workspaces}
                  onChange={this.handleWorkspaceChange}
                  prefixIcon={<Icon name="enterprise" size={16} />}
                  disabled={!!workspace}
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('CLUSTER')}>
                <Select
                  name="cluster"
                  placeholder=" "
                  options={this.clusters}
                  onChange={this.handleClusterChange}
                  optionRenderer={this.clusterOptionRenderer}
                  prefixIcon={<Icon name="cluster" size={16} />}
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item
                label={t('PROJECT')}
                rules={[
                  { required: true, message: t('PROJECT_NOT_SELECT_DESC') },
                ]}
              >
                <Select
                  name="namespace"
                  placeholder=" "
                  options={this.namespaces}
                  pagination={pick(this.projectStore.list, [
                    'page',
                    'limit',
                    'total',
                  ])}
                  isLoading={this.projectStore.list.isLoading}
                  onFetch={this.fetchNamespaces}
                  valueRenderer={this.projectOptionRenderer}
                  optionRenderer={this.projectOptionRenderer}
                  clearable
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
              t('PROJECT_NOT_SELECT_DESC')
            )}
          </div>
        ) : (
          this.renderPlacement()
        )}
      </div>
    )
  }
}
