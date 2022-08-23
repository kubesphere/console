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
import { action, computed, observable, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { get, set, pick, cloneDeep } from 'lodash'
import classNames from 'classnames'
import {
  Icon,
  Columns,
  Column,
  Select,
  Tooltip,
  Loading,
  Form,
} from '@kube-design/components'

import { Text } from 'components/Base'
import Confirm from 'components/Forms/Base/Confirm'
import ProjectStore from 'stores/project'
import { inCluster2Default } from 'utils'

import styles from './index.scss'

@observer
export default class Placement extends Component {
  state = {
    showForm: false,
    initializing: true,
    oldFormDate: {},
  }

  @observable
  formData = {}

  formRef = React.createRef()

  cdStore = this.props.store

  projectStore = new ProjectStore()

  componentDidMount() {
    this.init()
  }

  get prefix() {
    return `${this.props.prefix}`
  }

  @computed
  get clusters() {
    return this.cdStore.clustersList.map(item => ({
      label: item.label,
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
        disabled: item.isFedManaged || item.isFedHostNamespace,
        isFedManaged: item.isFedManaged || item.isFedHostNamespace,
      }))
  }

  async init() {
    this.setState({ initializing: true })

    this.formData[`${this.prefix}`] = this.props.formData[`${this.prefix}`]
    const { cluster, server, namespace } = this.formData[`${this.prefix}`] || {}

    await this.fetchClusters()

    if (!cluster) {
      set(this.formData, `${this.prefix}.name`, get(this.clusters, '[0].value'))

      set(
        this.formData,
        `${this.prefix}.server`,
        get(this.clusters, '[0].server')
      )
    } else if (!server && cluster) {
      const clusterInfo = this.clusters.find(item => item.value === cluster)

      set(
        this.formData,
        `${this.prefix}.name`,
        get(this.clusters, clusterInfo.value)
      )

      set(
        this.formData,
        `${this.prefix}.server`,
        get(this.clusters, clusterInfo.server)
      )
    }

    await this.fetchNamespaces()

    if (!namespace) {
      const firstValidNamespace =
        this.namespaces.find(item => !item.disabled) || {}

      set(
        this.formData,
        `${this.prefix}.namespace`,
        firstValidNamespace.value || ''
      )
    }

    Object.assign(this.props.formData, this.formData)

    this.setState({
      initializing: false,
      oldFormDate: cloneDeep(toJS(this.formData)),
    })
  }

  async fetchClusters() {
    await this.cdStore.getClustersList()
  }

  fetchNamespaces = async (params = {}) => {
    const clusterData = get(this.formData, `${this.prefix}.name`, '')
    const cluster = inCluster2Default(clusterData)

    await this.projectStore.fetchList({
      ...params,
      cluster,
      type: 'user',
    })
  }

  handleClusterChange = value => {
    this.fetchNamespaces()
    const server = this.clusters.find(item => item.value === value).server
    set(this.formData, `${this.prefix}.server`, server)
    set(this.formData, `${this.prefix}.namespace`, '')
  }

  handleSubmit = () => {
    const form = this.formRef.current
    form &&
      form.validate(() => {
        Object.assign(this.props.formData, {
          ...this.formData,
        })

        this.setState({
          showForm: false,
          oldFormDate: toJS(this.formData),
        })
      })
  }

  showForm = () => {
    this.setState({ showForm: true })
  }

  @action
  hideForm = () => {
    this.setState({ showForm: false }, () => {
      this.formData = this.state.oldFormDate
      Object.assign(this.props.formData, {
        ...this.formData,
      })
    })
  }

  renderPlacement() {
    const { formData } = this.props
    const data = formData[`${this.prefix}`] || {}
    const cluster = inCluster2Default(data.name)
    return (
      <div className={styles.placement}>
        <Text icon="cluster" title={cluster} description={t('CLUSTER')} />
        <Text
          icon="project"
          title={data.namespace}
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

  renderForm() {
    return (
      <div className={styles.form}>
        <Form ref={this.formRef} type="inner" data={this.formData}>
          <Columns>
            <Column>
              <Form.Item label={t('CLUSTER')}>
                <Select
                  name={`${this.prefix}.name`}
                  placeholder=" "
                  options={this.clusters}
                  onChange={this.handleClusterChange}
                  prefixIcon={<Icon name="cluster" size={16} />}
                  disabled={!globals.app.isMultiCluster}
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
                  name={`${this.prefix}.namespace`}
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
                  searchable
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
    const { showForm, initializing } = this.state
    if (showForm) {
      return this.renderForm()
    }

    const namespace = get(this.formData, `${this.prefix}.namespace`, '')

    return (
      <div
        className={classNames(styles.wrapper, {
          [styles.expand]: showForm,
        })}
        onClick={this.showForm}
      >
        {!namespace ? (
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
