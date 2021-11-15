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
import { get, omit, mergeWith, isUndefined } from 'lodash'
import { toJS } from 'mobx'

import { observer } from 'mobx-react'
import WorkspaceQuotaStore from 'stores/workspace.quota'
import { resourceLimitKey } from 'utils'
import { getLeftQuota } from 'utils/workload'
import SecretStore from 'stores/secret'
import QuotaStore from 'stores/quota'
import LimitRangeStore from 'stores/limitrange'

import EditForm from '../EditForm'
import ContainerSetting from '../../ContainerSettings/ContainerForm/ContainerSetting'

@observer
export default class ContainerImages extends Component {
  state = {
    quota: {},
    limitRange: {},
    imageRegistries: [],
    availableQuota: {},
  }

  quotaStore = new QuotaStore()

  workspaceQuotaStore = new WorkspaceQuotaStore()

  limitRangeStore = new LimitRangeStore()

  imageRegistryStore = new SecretStore()

  componentDidMount() {
    this.fetchData()
    this.fetchQuota()
  }

  fetchData() {
    const { cluster, namespace } = this.props

    Promise.all([
      this.quotaStore.fetch({ cluster, namespace }),
      this.limitRangeStore.fetchListByK8s({ cluster, namespace }),
      this.imageRegistryStore.fetchListByK8s({
        cluster,
        namespace,
        fieldSelector: `type=kubernetes.io/dockerconfigjson`,
      }),
    ]).then(([quota, limitRanges, imageRegistries]) => {
      this.setState({
        quota,
        limitRange: get(limitRanges, '[0].limit'),
        imageRegistries,
      })
    })
  }

  handleSubmit = data => {
    const { index, containerType, onEdit } = this.props
    onEdit({ index, containerType, data: omit(data, 'type') })
  }

  fetchQuota() {
    const { cluster, workspace, namespace } = this.props

    if (workspace && namespace) {
      Promise.all([
        this.quotaStore.fetch({
          cluster,
          namespace,
        }),
        this.workspaceQuotaStore.fetchDetail({
          name: workspace,
          workspace,
          cluster,
        }),
      ]).then(() => {
        const hard = toJS(this.quotaStore.data.hard)
        const {
          namespace: namespaceQuota,
          workspace: workspaceQuota,
        } = getLeftQuota(
          get(this.workspaceQuotaStore.detail, 'status.total'),
          this.quotaStore.data
        )
        this.setState({
          availableQuota: {
            workspace: workspaceQuota,
            namespace: { ...namespaceQuota, ...omit(hard, resourceLimitKey) },
          },
        })
      })
    }
  }

  get workspaceQuota() {
    const nsQuota = get(this.state.availableQuota, 'namespace', {})
    const wsQuota = get(this.state.availableQuota, 'workspace', {})
    return mergeWith(nsQuota, wsQuota, (ns, ws) => {
      if (!ns && !ws) {
        return undefined
      }
      if (!isUndefined(ns)) {
        return ns < ws ? ns : ws
      }
      return ws
    })
  }

  render() {
    const {
      cluster,
      namespace,
      formData,
      containerType,
      supportGpuSelect,
    } = this.props
    const { quota, limitRanges, imageRegistries } = this.state

    return (
      <EditForm
        {...this.props}
        title={<span>{`${t('IMAGE')}: ${formData.image}`}</span>}
        onOk={this.handleSubmit}
      >
        <ContainerSetting
          data={formData}
          cluster={cluster}
          namespace={namespace}
          quota={quota}
          limitRanges={limitRanges}
          imageRegistries={imageRegistries}
          defaultContainerType={containerType}
          supportGpuSelect={supportGpuSelect}
          workspaceQuota={this.workspaceQuota}
        />
      </EditForm>
    )
  }
}
