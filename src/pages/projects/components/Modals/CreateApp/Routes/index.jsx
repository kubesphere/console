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

import { get, set, omit, isEmpty, isEqual, cloneDeep } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'

import SecretStore from 'stores/secret'
import FederatedStore from 'stores/federated'
import { generateId } from 'utils'
import ObjectMapper from 'utils/object.mapper'

import RuleList from './RuleList'
import RuleForm from './RuleForm'

import styles from './index.scss'

export default class Routes extends React.Component {
  constructor(props) {
    super(props)

    this.mapper = props.isFederated
      ? ObjectMapper.federated(ObjectMapper.services)
      : ObjectMapper.services

    this.secretStore = new SecretStore()

    if (props.isFederated) {
      this.secretStore = new FederatedStore({ module: this.secretStore.module })
    }

    const ingress = get(this.props.formData, 'ingress', {})

    this.state = {
      ingress,
      old: cloneDeep(ingress),
      services: Object.values(
        omit(this.props.formData, ['application', 'ingress']) || {}
      ).map(item => this.mapper(item.service)),
      showAdd: false,
      selectRuleIndex: -1,
      operation: '',
    }
  }

  componentDidMount() {
    const { cluster, namespace } = this.props
    this.secretStore.fetchList({ namespace, cluster, limit: -1 })
    this.updateName()
  }

  componentDidUpdate(prevProps) {
    const { formData } = this.props

    if (!isEqual(formData, prevProps.formData)) {
      this.setState({
        ingress: get(formData, 'ingress', {}),
        services: Object.values(
          omit(this.props.formData, ['application', 'ingress']) || {}
        ).map(item => this.mapper(item.service)),
      })
      this.updateName()
    }
  }

  showAdd = index => {
    this.setState({ showAdd: true, selectRuleIndex: index, operation: 'add' })
  }

  showEdit = index => {
    const { ingress } = this.state
    this.setState({
      showAdd: true,
      selectRuleIndex: index,
      operation: 'edit',
      old: cloneDeep(ingress),
    })
  }

  closeEditModal = () => {
    if (this.state.operation === 'edit') {
      const { formData } = this.props
      const ingress = this.state.old
      this.setState({ ingress }, () => {
        set(formData, 'ingress', ingress)
      })
    }
    this.closeModal()
  }

  closeModal = () => {
    this.setState({ showAdd: false, selectRuleIndex: -1, operation: '' })
  }

  updateName = () => {
    const { formData } = this.props
    const { ingress } = this.state
    const applicationName = get(formData, 'application.metadata.name')

    if (!get(ingress, 'metadata.name')) {
      set(
        ingress,
        'metadata.name',
        `${applicationName}-ingress-${generateId()}`
      )
    }
  }

  updateAnnotations = () => {
    const { formData, isFederated, isGovernance } = this.props
    const { ingress } = this.state
    const namespace = get(formData, 'application.metadata.namespace')

    if (isGovernance) {
      const template = isFederated ? get(ingress, 'spec.template') : ingress
      const serviceName = get(
        template,
        'spec.rules[0].http.paths[0].backend.service.name'
      )
      if (serviceName) {
        set(
          template,
          'metadata.annotations["nginx.ingress.kubernetes.io/upstream-vhost"]',
          `${serviceName}.${namespace}.svc.cluster.local`
        )
      }
    }
  }

  handleAdd = data => {
    const { isFederated } = this.props
    const { ingress, selectRuleIndex } = this.state

    const template = isFederated ? get(ingress, 'spec.template') : ingress

    const rules = get(template, 'spec.rules', [])

    if (selectRuleIndex >= 0) {
      rules[selectRuleIndex] = data
    } else {
      rules.push(data)
    }

    set(template, 'spec.rules', rules)

    this.updateTLS(template)

    this.updateAnnotations()

    isFederated && this.updateOverrides()

    this.closeModal()
  }

  handleDelete = index => {
    const { isFederated } = this.props
    const { ingress } = this.state
    const template = isFederated ? get(ingress, 'spec.template') : ingress

    const rules = get(template, 'spec.rules', [])

    rules.splice(index, 1)

    set(template, 'spec.rules', rules)

    this.updateTLS(template)

    this.updateAnnotations()

    isFederated && this.updateOverrides()

    this.closeModal()
  }

  updateTLS(formTemplate) {
    const rules = get(formTemplate, 'spec.rules', [])
    const tls = rules
      .filter(item => item.protocol === 'https' && item.secretName)
      .reduce((prev, cur) => {
        const { secretName, host, clusters } = cur
        const item = prev.find(_item => _item.secretName === secretName)
        if (item) {
          item.hosts = item.hosts || []
          if (item.hosts.indexOf(host) === -1) {
            item.hosts.push(host)
          }
        } else {
          prev.push({ hosts: [host], secretName, clusters })
        }

        return prev
      }, [])

    set(formTemplate, 'spec.tls', tls)
  }

  updateOverrides() {
    const overrides = []
    const { isFederated, projectDetail } = this.props
    const { ingress } = this.state
    const template = isFederated ? get(ingress, 'spec.template') : ingress

    const annotations = get(template, 'metadata.annotations', [])
    const rules = get(template, 'spec.rules', [])
    const tls = get(template, 'spec.tls', [])
    const clusters = get(projectDetail, 'clusters', [])

    clusters.forEach(cluster => {
      const overrideData = data =>
        data
          .filter(item => item.clusters.includes(cluster.name))
          .map(item => omit(item, 'clusters'))

      const clusterOverrides = [
        {
          path: '/spec/rules',
          value: overrideData(rules),
        },
        {
          path: '/spec/tls',
          value: overrideData(tls),
        },
      ]

      if (!isEmpty(annotations)) {
        clusterOverrides.unshift({
          path: '/metadata/annotations',
          value: annotations,
        })
      }

      overrides.push({
        clusterName: cluster.name,
        clusterOverrides,
      })
    })

    set(ingress, 'spec.overrides', overrides)
  }

  render() {
    const {
      cluster,
      namespace,
      gateway,
      isFederated,
      projectDetail,
    } = this.props

    const { showAdd, ingress, services, selectRuleIndex } = this.state

    const template = isFederated ? get(ingress, 'spec.template') : ingress

    const selectRule = get(template, `spec.rules[${selectRuleIndex}]`, {})

    const secrets = toJS(this.secretStore.list.data)

    return (
      <div className={styles.wrapper}>
        <div className={styles.step}>
          <div>{t('ROUTE_SETTINGS')}</div>
          <p>{t('ROUTE_SETTINGS_DESC')}</p>
        </div>
        <div className={styles.title}>{t('ROUTING_RULES')}</div>
        <div className={styles.rules}>
          <RuleList
            data={template}
            gateway={gateway}
            isFederated={isFederated}
            projectDetail={projectDetail}
            onEdit={this.showEdit}
            onAdd={this.showAdd}
            onDelete={this.handleDelete}
          />
        </div>
        <RuleForm
          visible={showAdd}
          data={selectRule}
          cluster={cluster}
          namespace={namespace}
          isFederated={isFederated}
          projectDetail={projectDetail}
          onOk={this.handleAdd}
          onCancel={this.closeEditModal}
          gateway={gateway}
          services={services}
          secrets={secrets}
        />
      </div>
    )
  }
}
