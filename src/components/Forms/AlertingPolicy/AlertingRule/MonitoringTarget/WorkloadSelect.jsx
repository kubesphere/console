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
import { pick, get, set } from 'lodash'
import { Select, Form } from '@kube-design/components'

import WorkloadStore from 'stores/workload'

export default class WorkloadSelect extends Component {
  store = new WorkloadStore(
    this.kindModules[get(this.props.formTemplate, 'kind', '')] || 'deployments'
  )

  state = {
    workloads: [],
    isLoading: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = params => {
    const { cluster, namespace } = this.props
    this.setState({ isLoading: true })
    this.store
      .fetchList({
        cluster,
        namespace,
        ...params,
      })
      .then(() => {
        this.setState({
          workloads: this.store.list.data.map(item => ({
            label: item.name,
            value: item.name,
          })),
          isLoading: false,
        })
      })
  }

  get kindModules() {
    return {
      Deployment: 'deployments',
      StatefulSet: 'statefulsets',
      DaemonSet: 'daemonsets',
    }
  }

  get kinds() {
    return [
      {
        label: t('Deployment'),
        value: 'Deployment',
      },
      {
        label: t('StatefulSet'),
        value: 'StatefulSet',
      },
      {
        label: t('DaemonSet'),
        value: 'DaemonSet',
      },
    ]
  }

  handleKindChange = kind => {
    if (this.kindModules[kind] !== this.store.module) {
      this.store.setModule(this.kindModules[kind])
      this.fetchData()
      set(this.props.formTemplate, 'resources', [])
    }
  }

  render() {
    const pagination = pick(this.store.list, ['page', 'limit', 'total'])
    return (
      <>
        <Form.Item label={t('Resource Type')}>
          <Select
            name="kind"
            defaultValue="Deployment"
            options={this.kinds}
            onChange={this.handleKindChange}
          />
        </Form.Item>
        <Form.Item
          label={t('Monitoring Target')}
          rules={[{ required: true, message: t('RESOURCE_WORKLOAD_FORM_TIP') }]}
        >
          <Select
            name="resources"
            options={this.state.workloads}
            pagination={pagination}
            isLoading={this.state.isLoading}
            onFetch={this.fetchData}
            searchable
            multi
          />
        </Form.Item>
      </>
    )
  }
}
