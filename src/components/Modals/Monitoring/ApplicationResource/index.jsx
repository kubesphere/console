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

import React from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { isEmpty, get, set } from 'lodash'

import { getLocalTime, getDisplayName } from 'utils'
import { getSuitableValue, getAreaChartOps } from 'utils/monitoring'
import WorkspaceStore from 'stores/workspace'
import ClusterMonitorStore from 'stores/monitoring/cluster'

import { Select, Table } from '@pitrix/lego-ui'
import { Form, Button } from 'components/Base'
import { SimpleArea } from 'components/Charts'
import ControllerModal from 'components/Modals/Monitoring/Controller'

import styles from './index.scss'

const MonitorOptions = {
  times: 100,
  step: '5m',
}

@observer
export default class ResourceMonitorModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    detail: PropTypes.object,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    detail: {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      filter: {
        workspace: get(props.detail, 'workspace', 'all'),
        namespace: get(props.detail, 'namespace', 'all'),
      },
    }

    this.workspaceStore = new WorkspaceStore()
    this.monitorStore = new ClusterMonitorStore()

    this.formRef = React.createRef()
  }

  get metrics() {
    return toJS(this.monitorStore.resourceMetrics.data)
  }

  get metricType() {
    return this.props.detail.metricType
  }

  get workspaces() {
    const defaultWs = this.state.filter.workspace
    const data = toJS(this.workspaceStore.list.data)
    const result = data.map(workspace => ({
      label: getDisplayName(workspace),
      value: workspace.name,
    }))

    const defaultValue =
      isEmpty(result) && defaultWs
        ? { label: defaultWs, value: defaultWs }
        : {
            label: t('All'),
            value: 'all',
          }
    result.unshift(defaultValue)

    return result
  }

  get namespaces() {
    const data = toJS(this.workspaceStore.namespaces.data)
    const result = data.map(namespace => ({
      label: getDisplayName(namespace),
      value: namespace.name,
    }))

    result.unshift({
      label: t('All'),
      value: 'all',
    })

    return result
  }

  get monitoringData() {
    return toJS(this.monitorStore.resourceMetrics.data)
  }

  componentDidUpdate(prevProps) {
    const { visible, detail } = this.props
    if (visible && visible !== prevProps.visible && !detail.workspace) {
      this.fetchWorkspaces()
    }

    if (detail !== prevProps.detail) {
      this.setState(
        {
          filter: {
            workspace: get(detail, 'workspace', 'all'),
            namespace: get(detail, 'namespace', 'all'),
          },
        },
        () => {
          const { workspace } = this.state.filter

          if (workspace && workspace !== 'all') {
            this.fetchNamespaces({
              workspace,
            })
            this.workspaceStore.list.isLoading = false
            this.fetchData()
          } else {
            this.workspaceStore.namespaces.isLoading = false
          }
        }
      )
    }
  }

  fetchWorkspaces(params = {}) {
    this.workspaceStore.fetchList(params)
  }

  fetchNamespaces(params = {}) {
    this.workspaceStore.fetchNamespaces(params)
  }

  fetchData = (params = {}) => {
    this.monitorStore.fetchApplicationResourceMetrics({
      metrics: [this.metricType],
      ...this.state.filter,
      ...params,
    })
  }

  handleWorkspaceChange = value => {
    set(this.state.filter, 'workspace', value)

    if (value === 'all') {
      set(this.state.filter, 'namespace', 'all')
    }

    this.fetchNamespaces({
      workspace: value,
    })
  }

  handleNamespaceChange = value => {
    set(this.state.filter, 'namespace', value)
  }

  handleWorkspaceScrollBottom = () => {
    if (
      !this.workspaceStore.list.isLoading &&
      this.workspaceStore.list.data.length < this.workspaceStore.list.total
    ) {
      this.fetchWorkspaces({
        page: this.workspaceStore.list.page + 1,
        more: true,
      })
    }
  }

  hanldeNamespaceScrollBottom = () => {
    if (
      !this.workspaceStore.namespaces.isLoading &&
      this.workspaceStore.namespaces.data.length <
        this.workspaceStore.namespaces.total
    ) {
      this.fetchNamespaces({
        workspace: this.state.filter.workspace,
        page: this.workspaceStore.namespaces.page + 1,
        more: true,
      })
    }
  }

  handleSubmit = () => {
    const formData = this.formRef.current && this.formRef.current.getData()
    const filter = {
      ...formData,
    }
    this.setState({ filter }, () => {
      this.fetchData({
        ...filter,
        ...MonitorOptions,
      })
    })
  }

  renderFilterForm() {
    const { workspace, namespace } = this.state.filter
    const formData = {
      ...this.state.filter,
    }

    return (
      <Form className={styles.form} ref={this.formRef} data={formData}>
        <Form.Item label={t('Workspace')}>
          <Select
            name="workspace"
            placeholder={t('Please select workspace')}
            defaultValue={workspace}
            options={this.workspaces}
            onChange={this.handleWorkspaceChange}
            disabled={!!this.props.detail.workspace}
            onBlurResetsInput={false}
            onCloseResetsInput={false}
            openOnClick={true}
            isLoadingAtBottom
            isLoading={this.workspaceStore.list.isLoading}
            onMenuScrollToBottom={this.handleWorkspaceScrollBottom}
          />
        </Form.Item>
        <Form.Item label={t('Project')}>
          <Select
            name="namespace"
            placeholder={t('Please select project')}
            defaultValue={namespace}
            options={this.namespaces}
            onChange={this.handleNamespaceChange}
            onBlurResetsInput={false}
            onCloseResetsInput={false}
            openOnClick={true}
            isLoadingAtBottom
            isLoading={this.workspaceStore.namespaces.isLoading}
            onMenuScrollToBottom={this.hanldeNamespaceScrollBottom}
          />
        </Form.Item>
        <Form.Item>
          <Button type="control" onClick={this.handleSubmit}>
            {t('OK')}
          </Button>
        </Form.Item>
      </Form>
    )
  }

  renderChart() {
    const data = {
      ...this.props.detail,
      data: this.monitoringData,
    }
    const config = getAreaChartOps(data)

    return (
      <div className={styles.chart}>
        {isEmpty(config.data) ? (
          <div className={styles.empty}>
            <img src="/assets/empty-card.svg" />
          </div>
        ) : (
          <SimpleArea width="100%" height="100%" {...config} />
        )}
      </div>
    )
  }

  renderTable() {
    const { title } = this.props.detail
    const detail = {
      ...this.props.detail,
    }
    const { unitType, unit } = detail

    const data = get(this.monitoringData, '[0].values') || []
    const records = data.reverse().map(record => ({
      time: get(record, '[0]', 0) * 1000,
      value: getSuitableValue(get(record, '[1]', 0), unitType || unit),
    }))
    const columns = [
      {
        key: 'time',
        title: t('Time'),
        dataIndex: 'time',
        width: '30%',
        render: time =>
          `${getLocalTime(time).format(t('MMMM Do YYYY'))} ${getLocalTime(
            time
          ).format('HH:mm')}`,
      },
      {
        key: 'usage',
        title: t('Usage'),
        dataIndex: 'value',
      },
    ]

    return (
      <div className={styles.table}>
        <div className={styles.box}>
          <div className={styles.title}>{t(title) || t('Resources Usage')}</div>
          <Table
            columns={columns}
            dataSource={records}
            scroll={{ y: 200 }}
            expandIconAsCell={false}
          />
        </div>
      </div>
    )
  }

  render() {
    const { visible, onCancel } = this.props
    const { isLoading, isRefreshing } = this.monitorStore.resourceMetrics

    if (!visible) return null

    return (
      <ControllerModal
        visible={visible}
        onFetch={this.fetchData}
        onCancel={onCancel}
        loading={isLoading}
        refreshing={isRefreshing}
        {...MonitorOptions}
      >
        <div className={styles.content}>
          {this.renderFilterForm()}
          {this.renderChart()}
          {this.renderTable()}
        </div>
      </ControllerModal>
    )
  }
}
