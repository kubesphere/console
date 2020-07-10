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
import { isEmpty, get } from 'lodash'

import { getLocalTime, getDisplayName } from 'utils'
import { getSuitableValue, getAreaChartOps } from 'utils/monitoring'
import ProjectStore from 'stores/project'
import WorkspaceStore from 'stores/workspace'
import ClusterMonitorStore from 'stores/monitoring/cluster'

import { Icon, Select, Table } from '@pitrix/lego-ui'
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
        cluster: get(props, 'cluster', ''),
        namespace: get(props.detail, 'namespace', 'all'),
      },
    }

    this.workspaceStore = new WorkspaceStore()

    this.projectStore = new ProjectStore()

    this.monitorStore = new ClusterMonitorStore()

    this.formRef = React.createRef()
  }

  get metrics() {
    return toJS(this.monitorStore.resourceMetrics.data)
  }

  get metricType() {
    return this.props.detail.metricType
  }

  get clusters() {
    return this.workspaceStore.clusters.data.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  get namespaces() {
    const data = toJS(this.projectStore.list.data)
    const result = data.map(namespace => ({
      label: getDisplayName(namespace),
      value: namespace.name,
      isFedManaged: namespace.isFedManaged,
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

  async componentDidUpdate(prevProps) {
    const { visible } = this.props
    if (visible && visible !== prevProps.visible) {
      await this.fetchClusters()
      this.fetchData()
    }
  }

  async fetchClusters(params = {}) {
    if (this.props.workspace) {
      await this.workspaceStore.fetchClusters({
        workspace: this.props.workspace,
        ...params,
      })
      const cluster =
        this.workspaceStore.clusters.data.find(item => item.isReady) || {}
      this.setState(
        ({ filter }) => ({
          filter: { ...filter, cluster: cluster.name },
        }),
        this.fetchNamespaces
      )
    } else {
      this.fetchNamespaces()
    }
  }

  fetchNamespaces(params = {}) {
    if (this.state.filter.cluster) {
      this.projectStore.fetchList({
        cluster: this.state.filter.cluster,
        workspace: this.props.workspace,
        ...params,
      })
    }
  }

  fetchData = (params = {}) => {
    this.monitorStore.fetchApplicationResourceMetrics({
      metrics: [this.metricType],
      workspace: this.props.workspace,
      ...this.state.filter,
      ...params,
    })
  }

  handleClusterChange = cluster => {
    this.setState(
      ({ filter }) => ({
        filter: { ...filter, cluster },
      }),
      this.fetchNamespaces
    )
  }

  hanldeClusterScrollBottom = () => {
    if (
      !this.workspaceStore.clusters.isLoading &&
      this.workspaceStore.clusters.data.length <
        this.workspaceStore.clusters.total
    ) {
      this.fetchClusters({
        page: this.workspaceStore.clusters.page + 1,
        more: true,
      })
    }
  }

  handleNamespaceChange = namespace => {
    this.setState(({ filter }) => ({
      filter: { ...filter, namespace },
    }))
  }

  hanldeNamespaceScrollBottom = () => {
    if (
      !this.projectStore.list.isLoading &&
      this.projectStore.list.data.length < this.projectStore.list.total
    ) {
      this.fetchNamespaces({
        page: this.projectStore.list.page + 1,
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

  projectOptionRenderer = option => (
    <span className={styles.option}>
      {option.isFedManaged ? (
        <img className={styles.indicator} src="/assets/cluster.svg" />
      ) : (
        <Icon name="project" />
      )}
      {option.label}
    </span>
  )

  clusterOptionRenderer = option => (
    <span className={styles.option}>
      <Icon name="cluster" type="light" />
      {option.label}
    </span>
  )

  clusterValueRenderer = option => (
    <span className={styles.option}>
      <Icon name="cluster" />
      {option.label}
    </span>
  )

  renderFilterForm() {
    const { cluster, namespace } = this.state.filter
    const formData = {
      ...this.state.filter,
    }

    return (
      <Form className={styles.form} ref={this.formRef} data={formData}>
        {this.props.workspace && (
          <Form.Item label={t('Cluster')}>
            <Select
              name="cluster"
              placeholder={t('Please select cluster')}
              defaultValue={cluster}
              options={this.clusters}
              onChange={this.handleClusterChange}
              onBlurResetsInput={false}
              onCloseResetsInput={false}
              openOnClick={true}
              isLoadingAtBottom
              valueRenderer={this.clusterValueRenderer}
              optionRenderer={this.clusterOptionRenderer}
              isLoading={this.workspaceStore.clusters.isLoading}
              onMenuScrollToBottom={this.hanldeClusterScrollBottom}
            />
          </Form.Item>
        )}
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
            valueRenderer={this.projectOptionRenderer}
            optionRenderer={this.projectOptionRenderer}
            isLoading={this.projectStore.list.isLoading}
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
