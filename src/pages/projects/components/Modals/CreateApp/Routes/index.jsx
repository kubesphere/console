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
import ObjectMapper from 'utils/object.mapper'

import RuleList from './RuleList'
import RuleForm from './RuleForm'

import styles from './index.scss'

export default class Routes extends React.Component {
  serviceStore = new ServiceStore()

  state = {
    ingress: get(this.props.formData, 'ingress', {}),
    services: Object.values(
      omit(this.props.formData, ['application', 'ingress']) || {}
    ).map(item => ObjectMapper.services(item.service)),
    rulesError: '',
    showAdd: false,
  }

  componentDidUpdate(prevProps) {
    const { formData } = this.props
    if (formData !== prevProps.formData) {
      this.setState({
        ingress: get(this.props.formData, 'ingress', {}),
        services: Object.values(
          omit(this.props.formData, ['application', 'ingress']) || {}
        ).map(item => ObjectMapper.services(item.service)),
      })
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

  handleAdd = data => {
    const { protocol, secretName, _host, ...newRule } = data
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
    this.hideAdd()
  }

  handleDelete = host => {
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

  render() {
    const { cluster, namespace, gateway, projectDetail } = this.props
    const { showAdd, ingress, services, rulesError, selectRule } = this.state

    return (
      <div className={styles.wrapper}>
        <div className={styles.step}>
          <div>{t('Internet Access')}</div>
          <p>{t('可以设置应用的外网访问规则(Ingress)')}</p>
        </div>
        <div className={styles.title}>{t('Route Rules')}</div>
        <div className={styles.rules}>
          <RuleList
            error={rulesError}
            data={ingress}
            gateway={gateway}
            onAdd={this.showAdd}
            onDelete={this.handleDelete}
          />
        </div>
        <RuleForm
          visible={showAdd}
          data={selectRule}
          cluster={cluster}
          namespace={namespace}
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
