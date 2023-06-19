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
import { get, isEmpty, set } from 'lodash'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Menu, Icon } from '@kube-design/components'
import { Text, Panel, Switch } from 'components/Base'
import Banner from 'components/Cards/Banner'
import EditBasicInfoModal from 'workspaces/components/Modals/EditBasicInfo'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import ManageButton from 'pages/clusters/containers/BaseInfo/ManageButton'

import { getLocalTime, showNameAndAlias } from 'utils'
import { trigger } from 'utils/action'

import WorkspaceMonitorStore from 'stores/monitoring/workspace'

import styles from './index.scss'

@inject('rootStore', 'workspaceStore')
@observer
@trigger
class BaseInfo extends React.Component {
  monitorStore = new WorkspaceMonitorStore()

  componentDidMount() {
    this.canViewWorkspaceProjects && this.fetchMetrics()
  }

  get store() {
    return this.props.workspaceStore
  }

  get module() {
    return 'BaseInfo'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get isMultiCluster() {
    return !isEmpty(this.store.detail.clusters)
  }

  get tips() {
    return [
      {
        title: t('WORKSPACE_BASE_INFO_Q1'),
        description: t('WORKSPACE_BASE_INFO_A1'),
      },
    ]
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'workspace-settings',
      workspace: this.workspace,
    })
  }

  get canViewWorkspaceProjects() {
    return globals.app.hasPermission({
      module: 'projects',
      action: 'view',
      workspace: this.workspace,
    })
  }

  getMetrics = () => {
    const data = toJS(this.monitorStore.statistics.data)
    const metrics = {}

    Object.entries(data).forEach(([key, value]) => {
      metrics[key] = get(value, 'data.result[0].value[1]', 0)
    })

    return metrics
  }

  fetchMetrics = () => {
    this.monitorStore.fetchStatistics(this.workspace)
  }

  fetchDetail = () => {
    this.store.fetchDetail({ workspace: this.workspace })
  }

  showEdit = () => {
    this.trigger('resource.baseinfo.edit', {
      detail: toJS(this.store.detail),
      modal: EditBasicInfoModal,
      success: this.fetchDetail,
    })
  }

  handleNetworkChange = cluster => () => {
    const detail = toJS(this.store.detail)
    const _originData = toJS(this.store.detail._originData)
    const _overrides = get(_originData, 'overrides', [])

    const { overrides } = detail
    let override = overrides.find(od => od.clusterName === cluster)
    if (!override) {
      override = {
        clusterName: cluster,
        clusterOverrides: [],
      }
      overrides.push(override)
    }

    let cod = override.clusterOverrides.find(
      item => item.path === '/spec/networkIsolation'
    )
    if (!cod) {
      cod = {
        path: '/spec/networkIsolation',
      }
      override.clusterOverrides.push(cod)
    }

    cod.value = !get(
      detail,
      `clusterTemplates[${cluster}].spec.networkIsolation`
    )

    const OtherOrd = _overrides.filter(item => item.clusterName !== cluster)

    this.store
      .patch(detail, [
        {
          op: 'replace',
          path: '/metadata/name',
          value: detail.name,
        },
        {
          op: 'add',
          path: '/spec/overrides',
          value: [...OtherOrd, ...overrides],
        },
      ])
      .then(() => this.fetchDetail())
  }

  handleSingleClusterNetworkChange = () => {
    const detail = toJS(this.store.detail)
    const _templateSpec = get(detail._originData, 'spec.template.spec', {})
    set(_templateSpec, 'networkIsolation', !detail.networkIsolation)

    this.store
      .patch(detail, [
        {
          op: 'add',
          path: '/spec/template/spec',
          value: _templateSpec,
        },
      ])
      .then(() => this.fetchDetail())
  }

  handleDelete = () => {
    const { detail } = this.store
    this.trigger('workspace.delete', {
      type: 'WORKSPACE',
      resource: detail.name,
      detail,
      success: () => this.props.rootStore.routing.push('/'),
    })
  }

  getResourceOptions = () => {
    const metrics = this.getMetrics()

    return [
      {
        name:
          metrics.workspace_namespace_count === '1'
            ? t('PROJECT')
            : t('PROJECTS'),
        icon: 'project',
        value: metrics.workspace_namespace_count,
      },
      {
        name:
          metrics.workspace_devops_project_count === '1'
            ? t('DEVOPS_PROJECT_LOW')
            : t('DEVOPS_PROJECT_LOW_PL'),
        icon: 'strategy-group',
        value: metrics.workspace_devops_project_count,
        hidden: !globals.app.hasKSModule('devops'),
      },
      {
        name:
          metrics.workspace_member_count === '1'
            ? t('WS_MEMBER_SCAP')
            : t('WS_MEMBER_SCAP_PL'),
        icon: 'human',
        value: metrics.workspace_member_count,
      },
    ]
  }

  get enableManageAction() {
    const actions = this.enabledActions
    const option = []
    if (actions.includes('manage')) {
      option.push({
        actionName: 'resource.baseinfo.edit',
        onClick: this.showEdit,
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
      })
    }

    if (actions.includes('manage') && globals.clusterRole !== 'member') {
      option.push({
        actionName: 'workspace.delete',
        onClick: this.handleDelete,
        icon: 'trash',
        text: t('DELETE_WORKSPACE'),
      })
    }

    return option
  }

  manageButtonClick = (e, actionName) => {
    const clickItem = this.enableManageAction.filter(
      item => item.actionName === actionName
    )[0]
    clickItem && clickItem.onClick()
  }

  renderManageButton = () => {
    const action = this.enableManageAction
    const content = (
      <Menu onClick={this.manageButtonClick}>
        {action.map(option => (
          <Menu.MenuItem key={option.actionName}>
            <Icon name={option.icon} type="light"></Icon>
            {option.text}
          </Menu.MenuItem>
        ))}
      </Menu>
    )

    return (
      action.length > 0 && (
        <ManageButton
          className={styles.manage}
          content={content}
        ></ManageButton>
      )
    )
  }

  renderBaseInfo() {
    const { detail } = this.store
    const options = this.getResourceOptions()
    return (
      <Panel title={t('WORKSPACE_INFO')}>
        <div className={styles.header}>
          <Text
            className={styles.title}
            icon="enterprise"
            title={showNameAndAlias(detail)}
            description={detail.description || t('WORKSPACE')}
            ellipsis
          />
          <Text
            title={getLocalTime(detail.createTime).format(
              'YYYY-MM-DD HH:mm:ss'
            )}
            description={t('CREATION_TIME')}
          />
          {this.renderManageButton()}
        </div>
        {this.canViewWorkspaceProjects && (
          <div className={styles.content}>
            {options
              .filter(option => !option.hidden)
              .map(option => (
                <Text
                  key={option.name}
                  icon={option.icon}
                  title={option.value}
                  description={t(option.name)}
                />
              ))}
          </div>
        )}
      </Panel>
    )
  }

  renderNetwork() {
    const workspace = this.store.detail
    if (!globals.app.isMultiCluster) {
      if (!globals.app.hasKSModule('network')) {
        return null
      }

      const networkIsolation = workspace.networkIsolation || false

      return (
        <Panel className={styles.network} title={t('NETWORK_ISOLATION')}>
          <div className={styles.item}>
            <Text
              icon="firewall"
              title={t(networkIsolation ? 'ON' : 'OFF')}
              description={t('WS_NETWORK_ISOLATION')}
            />
            {this.enabledActions.includes('manage') && (
              <Switch
                className={styles.switch}
                text={t(networkIsolation ? 'ON' : 'OFF')}
                onChange={this.handleSingleClusterNetworkChange}
                checked={networkIsolation}
              />
            )}
          </div>
        </Panel>
      )
    }

    const { data, isLoading } = toJS(this.store.clusters)

    return (
      <Panel className={styles.network} title={t('NETWORK_ISOLATION')}>
        {isEmpty(data) && !isLoading && (
          <div className={styles.empty}>{t('NO_CLUSTER_AVAILABLE')}</div>
        )}
        {data.map(cluster => {
          const clusterTemp =
            get(workspace, `clusterTemplates[${cluster.name}]`) || {}
          const networkIsolation =
            get(
              clusterTemp,
              'spec.networkIsolation',
              workspace.networkIsolation
            ) || false

          return (
            <div className={styles.item} key={cluster.name}>
              <ClusterTitle cluster={cluster} className={styles.clusterTitle} />
              <Text
                icon="firewall"
                title={t(networkIsolation ? 'ON' : 'OFF')}
                description={t('WS_NETWORK_ISOLATION')}
              />
              {this.enabledActions.includes('manage') &&
                (get(cluster, 'configz.network') ? (
                  <Switch
                    className={styles.switch}
                    text={t(networkIsolation ? 'ON' : 'OFF')}
                    onChange={this.handleNetworkChange(cluster.name)}
                    checked={networkIsolation}
                  />
                ) : (
                  <span className={styles.noModule}>
                    {t('NETWORK_POLICY_UNINSATLLED_DESC')}
                  </span>
                ))}
            </div>
          )
        })}
      </Panel>
    )
  }

  render() {
    return (
      <div>
        <Banner
          title={t('BASIC_INFORMATION')}
          icon="cdn"
          description={t('WORKSPACE_BASIC_INFO_DESC')}
          tips={this.tips}
          module={this.module}
        />
        {this.renderBaseInfo()}
        {this.renderNetwork()}
      </div>
    )
  }
}

export default BaseInfo
