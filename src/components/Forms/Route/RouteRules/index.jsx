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

import { get, set, isEmpty } from 'lodash'
import React from 'react'
import { toJS, computed } from 'mobx'
import { observer } from 'mobx-react'
import { Form } from '@kube-design/components'
import { joinSelector } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'
import SecretStore from 'stores/secret'
import ServiceStore from 'stores/service'
import RouterStore from 'stores/router'
import FederatedStore from 'stores/federated'

import RuleList from './RuleList'
import RuleForm from './RuleForm'

class RouteRules extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showRule: false,
      selectRuleIndex: -1,
    }

    this.secretStore = new SecretStore()
    this.serviceStore = new ServiceStore()
    this.routerStore = new RouterStore()

    if (props.isFederated) {
      this.secretStore = new FederatedStore({ module: this.secretStore.module })
      this.serviceStore = new FederatedStore({
        module: this.serviceStore.module,
      })
    }
  }

  componentDidMount() {
    this.secretStore.fetchList({
      namespace: this.namespace,
      cluster: this.cluster,
      limit: -1,
    })
    this.serviceStore.fetchList({
      namespace: this.namespace,
      cluster: this.cluster,
      limit: -1,
      labelSelector: joinSelector(this.props.selector),
    })
    !this.props.isFederated &&
      this.routerStore
        .getGateway({ namespace: this.namespace, cluster: this.cluster })
        .then(() => {
          const { data } = toJS(this.routerStore.gateway)
          if (data.serviceMeshEnable) {
            set(
              this.formTemplate,
              'metadata.annotations["nginx.ingress.kubernetes.io/service-upstream"]',
              'true'
            )
          }
        })
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get fedFormTemplate() {
    return this.props.isFederated
      ? get(this.formTemplate, 'spec.template')
      : this.formTemplate
  }

  get cluster() {
    return this.props.cluster
  }

  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  @computed
  get services() {
    return this.serviceStore.list.data
  }

  showRule = index => {
    this.setState({ showRule: true, selectRuleIndex: index })
  }

  hideRule = () => {
    this.setState({ showRule: false, selectRuleIndex: -1 })
  }

  handleRule = data => {
    const { isFederated } = this.props
    const { selectRuleIndex } = this.state
    const template = this.fedFormTemplate

    const rules = get(template, 'spec.rules', [])

    if (selectRuleIndex >= 0) {
      rules[selectRuleIndex] = data
    } else {
      rules.push(data)
    }

    set(template, 'spec.rules', rules)

    this.updateTLS(template)

    isFederated && this.updateOverrides()

    this.hideRule()
  }

  handleDelete = index => {
    const { isFederated } = this.props
    const template = this.fedFormTemplate

    const rules = get(template, 'spec.rules', [])

    rules.splice(index, 1)

    set(template, 'spec.rules', rules)

    this.updateTLS(template)

    isFederated && this.updateOverrides()

    this.hideRule()
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
    const rules = get(this.fedFormTemplate, 'spec.rules', [])
    const tls = get(this.fedFormTemplate, 'spec.tls', [])
    const clusters = get(this.props.projectDetail, 'clusters', [])

    clusters.forEach(cluster => {
      overrides.push({
        clusterName: cluster.name,
        clusterOverrides: [
          {
            path: '/spec/rules',
            value: rules.filter(rule => rule.clusters.includes(cluster.name)),
          },
          {
            path: '/spec/tls',
            value: tls.filter(item => item.clusters.includes(cluster.name)),
          },
        ],
      })
    })

    set(this.formTemplate, 'spec.overrides', overrides)
  }

  rulesValidator = (_, value, callback) => {
    if (isEmpty(value)) {
      return callback({ message: t('Please add at least one routing rule.') })
    }

    callback()
  }

  renderRuleForm(index) {
    const { isFederated, projectDetail } = this.props
    const services = toJS(this.services)
    const { data: secrets } = toJS(this.secretStore.list)
    const { data: gateway } = toJS(this.routerStore.gateway)

    const data = get(this.fedFormTemplate, `spec.rules[${index}]`, {})

    return (
      <RuleForm
        data={data}
        gateway={gateway}
        secrets={secrets}
        services={services}
        isFederated={isFederated}
        projectDetail={projectDetail}
        onSave={this.handleRule}
        onCancel={this.hideRule}
      />
    )
  }

  render() {
    const { formRef, isFederated, projectDetail } = this.props
    const { showRule, selectRuleIndex } = this.state
    const { data, isLoading } = toJS(this.routerStore.gateway)

    if (showRule) {
      return this.renderRuleForm(selectRuleIndex)
    }

    const noGateway = isEmpty(data) && !isLoading

    return (
      <Form data={this.fedFormTemplate} ref={formRef}>
        <Form.Item rules={[{ validator: this.rulesValidator }]}>
          <RuleList
            name="spec.rules"
            onShow={this.showRule}
            onDelete={this.handleDelete}
            disabled={noGateway}
            isFederated={isFederated}
            projectDetail={projectDetail}
          />
        </Form.Item>
      </Form>
    )
  }
}

export default observer(RouteRules)
export const Component = RouteRules
