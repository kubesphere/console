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

import { get, set, uniq, isEmpty } from 'lodash'
import React from 'react'
import { toJS, computed } from 'mobx'
import { observer } from 'mobx-react'
import { Alert } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
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
      selectRule: {},
    }

    this.secretStore = new SecretStore()
    this.serviceStore = new ServiceStore()
    this.routerStore = new RouterStore()

    if (props.isFederated) {
      this.secretStore = new FederatedStore(this.secretStore)
      this.serviceStore = new FederatedStore(this.serviceStore)
    }
  }

  componentDidMount() {
    this.secretStore.fetchList({
      namespace: this.namespace,
      cluster: this.cluster,
      limit: 9999,
    })
    this.serviceStore.fetchList({
      namespace: this.namespace,
      cluster: this.cluster,
      limit: 9999,
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

  get cluster() {
    return this.props.cluster
  }

  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  @computed
  get services() {
    return this.serviceStore.list.data.map(item => ({
      ...item,
      ports: item.resource.ports,
    }))
  }

  showRule = (data = {}) => {
    this.setState({
      showRule: true,
      selectRule: { ...data, _host: data.host },
    })
  }

  hideRule = () => {
    this.setState({
      showRule: false,
      selectRule: {},
    })
  }

  handleRule = data => {
    const { protocol, secretName, _host, ...newRule } = data

    if (this.props.isFederated) {
      return this.handleFederatedRule(data)
    }

    const host = _host || newRule.host

    const rules = get(this.formTemplate, 'spec.rules')

    const existRule = rules.find(rule => rule.host === host)

    let newRules = []
    if (existRule) {
      newRules = rules.map(rule => (rule.host === host ? newRule : rule))
    } else {
      newRules = [...rules, newRule]
    }

    set(this.formTemplate, 'spec.rules', newRules)

    const tls = get(this.formTemplate, 'spec.tls[0]', {})
    if (tls.hosts && tls.hosts.includes(host)) {
      if (protocol === 'http') {
        tls.hosts = tls.hosts.filter(item => item !== host)
        if (isEmpty(tls.hosts)) {
          set(this.formTemplate, 'spec.tls', [])
        } else {
          set(this.formTemplate, 'spec.tl[0]', tls)
        }
      } else if (protocol === 'https') {
        tls.secretName = secretName
        set(this.formTemplate, 'spec.tls[0]', tls)
      }
    } else if (protocol === 'https') {
      tls.secretName = secretName
      tls.hosts = uniq([...(tls.hosts || []), host])

      set(this.formTemplate, 'spec.tls[0]', tls)
    }

    this.hideRule()
  }

  handleFederatedRule = data => {
    const { protocol, secretName, _host, clusters, ...newRule } = data

    const overrides = get(this.formTemplate, 'spec.overrides', [])

    clusters.forEach(cluster => {
      let override = overrides.find(item => item.clusterName === cluster)
      if (!override) {
        override = {
          clusterName: cluster,
          clusterOverrides: [],
        }
        overrides.push(override)
      }

      override.clusterOverrides = override.clusterOverrides || []

      let rulesCod = override.clusterOverrides.find(
        item => item.path === '/spec/rules'
      )
      if (!rulesCod) {
        rulesCod = {
          path: '/spec/rules',
          value: [],
        }
        override.clusterOverrides.push(rulesCod)
      }
      rulesCod.value = [newRule]

      if (protocol === 'https') {
        const tls = [{ secretName, hosts: [newRule.host] }]
        let tlsCod = override.clusterOverrides.find(
          item => item.path === '/spec/tls'
        )
        if (!tlsCod) {
          tlsCod = {
            path: '/spec/tls',
            value: [],
          }
          override.clusterOverrides.push(tlsCod)
        }
        tlsCod.value = tls
      } else {
        override.clusterOverrides = override.clusterOverrides.filter(
          cod => cod.path !== '/spec/tls'
        )
      }
    })

    set(this.formTemplate, 'spec.overrides', overrides)
    this.hideRule()
  }

  rulesValidator = (_, value, callback) => {
    const { isFederated } = this.props
    const { data, isLoading } = toJS(this.routerStore.gateway)
    const noGateway = isEmpty(data) && !isLoading

    if (isFederated) {
      const overrides = JSON.stringify(get(this.formTemplate, 'spec.overrides'))
      if (overrides.indexOf('/spec/rules') === -1) {
        return callback({ message: t('Please add at least one routing rule') })
      }
      return callback()
    }

    if (noGateway) {
      return callback({ message: t('UNABLE_CREATE_ROUTE_TIP') })
    }

    if (isEmpty(value)) {
      return callback({ message: t('Please add at least one routing rule') })
    }

    callback()
  }

  renderRuleForm(data) {
    const { isFederated, projectDetail } = this.props
    const { data: secrets } = toJS(this.secretStore.list)
    const { data: gateway } = toJS(this.routerStore.gateway)

    return (
      <RuleForm
        data={data}
        gateway={gateway}
        secrets={secrets}
        services={this.services}
        isFederated={isFederated}
        projectDetail={projectDetail}
        onSave={this.handleRule}
        onCancel={this.hideRule}
      />
    )
  }

  render() {
    const { formRef, isFederated, projectDetail } = this.props
    const { showRule, selectRule } = this.state
    const { data, isLoading } = toJS(this.routerStore.gateway)

    if (showRule) {
      return this.renderRuleForm(selectRule)
    }

    const noGateway = isEmpty(data) && !isLoading

    return (
      <Form data={this.formTemplate} ref={formRef}>
        {noGateway && (
          <Alert
            className="margin-b12"
            description={t.html('NO_INTERNET_ACCESS_TIP')}
            type="warning"
          />
        )}
        <Form.Item rules={[{ validator: this.rulesValidator }]}>
          <RuleList
            name="spec.rules"
            onShow={this.showRule}
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
