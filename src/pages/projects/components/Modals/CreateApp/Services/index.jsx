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

import { get, set, omit } from 'lodash'
import React from 'react'

import { mergeLabels } from 'utils'
import ServiceStore from 'stores/service'

import CreateServiceModal from 'projects/components/Modals/ServiceCreate/InApp'
import ServiceList from './ServiceList'

import styles from './index.scss'

export default class Services extends React.Component {
  serviceStore = new ServiceStore()

  state = {
    components: omit(this.props.formData, ['application', 'ingress']) || {},
    componentsError: '',
    showAdd: false,
  }

  componentDidUpdate(prevProps) {
    const { formData } = this.props
    if (formData !== prevProps.formData) {
      this.setState({
        components: omit(formData, ['application', 'ingress']) || {},
      })
    }
  }

  validate(callback) {
    if (Object.keys(this.state.components).length <= 0) {
      return this.setState({
        componentsError: t('Service components should not be empty'),
      })
    }

    callback && callback()
  }

  showAdd = componentKey => {
    this.setState({
      showAdd: true,
      selectComponentKey: componentKey,
    })
  }

  hideAdd = () => {
    this.setState({ showAdd: false, selectComponentKey: '' })
  }

  updateAppLabels(formData) {
    const appLabels = get(
      this.props.formData,
      'application.spec.selector.matchLabels',
      []
    )
    mergeLabels(formData.workload, appLabels)
    mergeLabels(formData.service, appLabels)
  }

  updateGovernance(formData) {
    const { isGovernance } = this.props
    set(
      formData.workload,
      'metadata.annotations["servicemesh.kubesphere.io/enabled"]',
      String(isGovernance)
    )
    set(
      formData.service,
      'metadata.annotations["servicemesh.kubesphere.io/enabled"]',
      String(isGovernance)
    )

    set(
      formData.workload,
      'spec.template.metadata.annotations["sidecar.istio.io/inject"]',
      String(isGovernance)
    )
  }

  updateComponentKind = () => {
    const { application } = this.props.formData

    const componentKinds = [
      {
        group: '',
        kind: 'Service',
      },
      {
        group: 'apps',
        kind: 'Deployment',
      },
      {
        group: 'apps',
        kind: 'StatefulSet',
      },
      {
        group: 'extensions',
        kind: 'Ingress',
      },
      {
        group: 'servicemesh.kubesphere.io',
        kind: 'Strategy',
      },
      {
        group: 'servicemesh.kubesphere.io',
        kind: 'ServicePolicy',
      },
    ]

    set(application, 'spec.componentKinds', componentKinds)
  }

  handleAdd = data => {
    data.workload = data.Deployment || data.StatefulSet
    data.service = data.Service

    this.updateAppLabels(data)
    this.updateGovernance(data)

    const key = get(data, 'service.metadata.name')
    this.setState(
      ({ components }) => ({
        components: { ...components, [key]: data },
        componentsError: '',
      }),
      () => {
        this.props.formData[key] = data
        this.updateComponentKind()
        this.hideAdd()
      }
    )
  }

  handleDelete = key => {
    this.setState(
      ({ components }) => {
        delete components[key]
        return { components: { ...components } }
      },
      () => {
        delete this.props.formData[key]
        this.updateComponentKind()
      }
    )
  }

  render() {
    const { cluster, namespace, projectDetail } = this.props
    const {
      components,
      showAdd,
      selectComponentKey,
      componentsError,
    } = this.state

    return (
      <div className={styles.wrapper}>
        <div className={styles.step}>
          <div>{t('Service Components')}</div>
          <p>
            {t(
              '根据应用中服务类型的不同设置不同类型的服务组件，支持无状态服务和有状态服务'
            )}
          </p>
        </div>
        <div className={styles.title}>{t('组件列表')}</div>
        <div className={styles.components}>
          <ServiceList
            error={componentsError}
            data={components}
            onAdd={this.showAdd}
            onEdit={this.handleEdit}
            onDelete={this.handleDelete}
          />
        </div>
        <CreateServiceModal
          cluster={cluster}
          namespace={namespace}
          detail={components[selectComponentKey]}
          store={this.serviceStore}
          module="services"
          visible={showAdd}
          onCancel={this.hideAdd}
          onOk={this.handleAdd}
          projectDetail={projectDetail}
        />
      </div>
    )
  }
}
