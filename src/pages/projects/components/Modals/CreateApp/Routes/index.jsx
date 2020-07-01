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

import { get, set, omit, uniq, isEmpty } from 'lodash'
import React from 'react'

import ServiceStore from 'stores/service'
import { generateId } from 'utils'
import ObjectMapper from 'utils/object.mapper'

import RuleList from './RuleList'
import RuleForm from './RuleForm'

import styles from './index.scss'

export default class Routes extends React.Component {
  constructor(props) {
    super(props)

    this.mapper = this.props.isFederated
      ? item => {
          const result = ObjectMapper.federated(ObjectMapper.services)(item)
          return {
            ...result,
            ports: result.resource.ports,
          }
        }
      : ObjectMapper.services

    this.serviceStore = new ServiceStore()

    this.state = {
      ingress: get(this.props.formData, 'ingress', {}),
      services: Object.values(
        omit(this.props.formData, ['application', 'ingress']) || {}
      ).map(item => this.mapper(item.service)),
      rulesError: '',
      showAdd: false,
    }
  }

  componentDidMount() {
    this.updateData()
  }

  componentDidUpdate(prevProps) {
    const { formData } = this.props
    if (formData !== prevProps.formData) {
      this.setState({
        ingress: get(this.props.formData, 'ingress', {}),
        services: Object.values(
          omit(this.props.formData, ['application', 'ingress']) || {}
        ).map(item => this.mapper(item.service)),
      })
      this.updateData()
    }
  }

  validate(callback) {
    const { gateway } = this.props
    const { ingress } = this.state
    if (get(ingress, 'spec.rules', []).length > 0 && isEmpty(gateway)) {
      return this.setState({
        rulesError: t('DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP'),
      })
    }

    callback && callback()
  }

  showAdd = data => {
    this.setState({
      showAdd: true,
      selectRule: data ? { ...data, _host: data.host } : {},
    })
  }

  hideAdd = () => {
    this.setState({ showAdd: false, selectRule: {} })
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

  updateData = () => {
    const { formData, isFederated } = this.props
    const { ingress } = this.state
    const applicationName = get(formData, 'application.metadata.name')
    const namespace = get(formData, 'application.metadata.namespace')

    const isServiceMeshEnable =
      get(
        formData,
        'application.metadata.annotations["servicemesh.kubesphere.io/enabled"]'
      ) === 'true'

    if (!get(ingress, 'metadata.name')) {
      set(
        ingress,
        'metadata.name',
        `${applicationName}-ingress-${generateId()}`
      )
    }

    if (isServiceMeshEnable) {
      if (isFederated) {
        const ods = get(ingress, 'spec.overrides', [])
        ods.forEach(od => {
          const ruleCod = od.clusterOverrides.find(
            item => item.path === '/spec/rules'
          )
          const serviceName = get(
            ruleCod,
            '[0].http.paths[0].backend.serviceName'
          )
          if (serviceName) {
            let annotationCod = od.clusterOverrides.find(
              item => item.path === '/metadata/annotations'
            )
            if (!annotationCod) {
              annotationCod = {
                path: '/metadata/annotations',
                value: {},
              }
            }
            annotationCod.value = annotationCod.value || {}
            annotationCod.value[
              'nginx.ingress.kubernetes.io/upstream-vhost'
            ] = `${serviceName}.${namespace}.svc.cluster.local`
          }
        })
      } else {
        const serviceName = get(
          ingress,
          'spec.rules[0].http.paths[0].backend.serviceName'
        )
        if (serviceName) {
          set(
            ingress,
            'metadata.annotations["nginx.ingress.kubernetes.io/upstream-vhost"]',
            `${serviceName}.${namespace}.svc.cluster.local`
          )
        }
      }
    }
  }

  handleAdd = data => {
    const { protocol, secretName, _host, ...newRule } = data

    if (this.props.isFederated) {
      return this.handleFederatedAdd(data)
    }

    const formTemplate = this.state.ingress

    const host = _host || newRule.host

    const rules = get(formTemplate, 'spec.rules')

    const existRule = rules.find(rule => rule.host === host)

    let newRules = []
    if (existRule) {
      newRules = rules.map(rule => (rule.host === host ? newRule : rule))
    } else {
      newRules = [...rules, newRule]
    }

    set(formTemplate, 'spec.rules', newRules)

    const tls = get(formTemplate, 'spec.tls[0]', {})
    if (tls.hosts && tls.hosts.includes(host)) {
      if (protocol === 'http') {
        tls.hosts = tls.hosts.filter(item => item !== host)
        if (isEmpty(tls.hosts)) {
          set(formTemplate, 'spec.tls', [])
        } else {
          set(formTemplate, 'spec.tl[0]', tls)
        }
      } else if (protocol === 'https') {
        tls.secretName = secretName
        set(formTemplate, 'spec.tls[0]', tls)
      }
    } else if (protocol === 'https') {
      tls.secretName = secretName
      tls.hosts = uniq([...(tls.hosts || []), host])

      set(formTemplate, 'spec.tls[0]', tls)
    }

    this.updateComponentKind()
    this.updateData()
    this.hideAdd()
  }

  handleDelete = rule => {
    if (this.props.isFederated) {
      return this.handleFederatedDelete(rule)
    }

    const { host } = rule
    const { ingress } = this.state
    const rules = get(ingress, 'spec.rules', [])
    const newRules = rules.filter(item => item.host !== host)
    set(ingress, 'spec.rules', newRules)

    const tls = get(ingress, 'spec.tls[0]')
    if (tls) {
      if (isEmpty(tls.hosts)) {
        set(ingress, 'spec.tls', [])
      } else {
        tls.hosts = tls.hosts.filter(item => item !== host)
        set(ingress, 'spec.tls[0]', tls)
      }
    }

    this.setState({ ingress: { ...ingress } })
    this.updateComponentKind()
  }

  handleFederatedAdd = data => {
    const { protocol, secretName, _host, clusters, ...newRule } = data

    const formTemplate = this.state.ingress
    const overrides = get(formTemplate, 'spec.overrides', [])

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

    set(formTemplate, 'spec.overrides', overrides)
    this.updateComponentKind()
    this.hideAdd()
  }

  handleFederatedDelete = rule => {
    const formTemplate = this.state.ingress
    const overrides = get(formTemplate, 'spec.overrides', [])
    const override = overrides.find(
      item => item.clusterName === rule.cluster.name
    )
    override.clusterOverrides = override.clusterOverrides.filter(
      item => !['/spec/rules', '/spec/tls'].includes(item.path)
    )

    this.setState({ ingress: { ...formTemplate } })
  }

  render() {
    const {
      cluster,
      namespace,
      gateway,
      isFederated,
      projectDetail,
    } = this.props
    const { showAdd, ingress, services, rulesError, selectRule } = this.state

    return (
      <div className={styles.wrapper}>
        <div className={styles.step}>
          <div>{t('Internet Access')}</div>
          <p>{t('INTERNET_ACCESS_DESC')}</p>
        </div>
        <div className={styles.title}>{t('Route Rules')}</div>
        <div className={styles.rules}>
          <RuleList
            error={rulesError}
            data={ingress}
            gateway={gateway}
            isFederated={isFederated}
            projectDetail={projectDetail}
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
          onCancel={this.hideAdd}
          gateway={gateway}
          services={services}
        />
      </div>
    )
  }
}
