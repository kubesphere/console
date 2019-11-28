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

import { omit, get, set, uniq, isEmpty, isFunction } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'

import { Notify } from 'components/Base'
import Confirm from 'components/Forms/Base/Confirm'

import { mergeLabels } from 'utils'
import ObjectMapper from 'utils/object.mapper'

import ComponentList from '../Components/ComponentList'
import ComponentForm from '../Components/ComponentForm'
import RuleList from '../Route/RuleList'
import RuleForm from '../Route/RuleForm'

import styles from './index.scss'

export default class Resources extends React.Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  getChildContext() {
    return {
      registerSubRoute: this.registerSubRoute,
      resetSubRoute: this.resetSubRoute,
    }
  }

  state = {
    state: 'list',
    subRoute: {},
    components: omit(this.props.formData, ['application', 'ingress']) || {},
    ingress: get(this.props.formData, 'ingress', {}),
    selectComponentKey: '',
    selectRule: {},
    componentsError: '',
    rulesError: '',
  }

  hasSubRoute = () => !isEmpty(this.state.subRoute)

  componentWillReceiveProps(nextProps) {
    if (nextProps.formData !== this.props.formData) {
      this.setState({
        components: omit(nextProps.formData, ['application', 'ingress']) || {},
        ingress: get(nextProps.formData, 'ingress', {}),
      })
    }

    if (!isEqual(nextProps.appLabels, this.props.appLabels)) {
      Object.values(this.state.components).forEach(component => {
        this.updateAppLabels(component, nextProps.appLabels)
      })
    }

    if (nextProps.isGovernance !== this.props.isGovernance) {
      Object.values(this.state.components).forEach(component => {
        this.updateGovernance(component, nextProps.isGovernance)
      })
    }
  }

  updateAppLabels(formData, appLabels) {
    mergeLabels(formData.workload, appLabels)
    mergeLabels(formData.service, appLabels)
  }

  updateGovernance(formData, isGovernance) {
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

  handleSubFormSave = () => {
    const { subRoute } = this.state
    if (subRoute && isFunction(subRoute.onSave)) {
      subRoute.onSave()
    }
  }

  handleSubFormCancel = () => {
    const { subRoute } = this.state
    if (subRoute && isFunction(subRoute.onCancel)) {
      subRoute.onCancel()
    }
  }

  registerSubRoute = (onSave, onCancel) => {
    this.setState({ subRoute: { onSave, onCancel } })
  }

  resetSubRoute = () => {
    this.setState({ subRoute: {} })
  }

  validate(callback) {
    if (this.state.state !== 'list') {
      return Notify.warning(t('Please finish the sub form first'))
    }

    if (Object.keys(this.state.components).length <= 0) {
      Notify.warning(t('Application components should not be empty'))
      return this.setState({
        componentsError: t('Application components should not be empty'),
      })
    }

    const { gateway } = this.props
    const { ingress } = this.state
    if (get(ingress, 'spec.rules', []).length > 0 && isEmpty(gateway)) {
      Notify.warning(t('DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP'))
      return this.setState({
        rulesError: t('DEPLOY_SAMPLE_NO_INTERNET_ACCESS_TIP'),
      })
    }

    callback && callback()
  }

  updateComponentKind = () => {
    const { application } = this.props.formData

    const componentKinds = [
      {
        group: '',
        kind: 'Service',
      },
      {
        group: 'extensions',
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

  showAddComponent = componentKey => {
    this.setState({ state: 'new-component', selectComponentKey: componentKey })
  }

  showAddRule = data => {
    this.setState({
      state: 'new-rule',
      selectRule: data ? { ...data, _host: data.host } : {},
    })
  }

  hideAddComponent = () => {
    this.setState({ state: 'list', selectComponentKey: '', subRoute: {} })
  }

  hideAddRule = () => {
    this.setState({ state: 'list', selectRule: {}, subRoute: {} })
  }

  handleAddComponent = (key, data) => {
    this.updateAppLabels(data, this.props.appLabels)
    this.updateGovernance(data, this.props.isGovernance)

    this.setState(
      ({ components }) => ({
        components: { ...components, [key]: data },
        componentsError: '',
      }),
      () => {
        this.props.formData[key] = data
        this.updateComponentKind()
        this.hideAddComponent()
      }
    )
  }

  handleAddRule = data => {
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
    this.hideAddRule()
  }

  handleDeleteComponent = key => {
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

  handleDeleteRule = host => {
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

  renderFooter() {
    const { subRoute } = this.state

    if (isEmpty(subRoute)) {
      return null
    }

    return (
      <Confirm
        className={styles.footer}
        onOk={this.handleSubFormSave}
        onCancel={this.handleSubFormCancel}
      />
    )
  }

  renderContent() {
    const {
      limitRange,
      configMaps,
      secrets,
      imageRegistries,
      gateway,
      namespace,
      appLabels = {},
      isGovernance,
    } = this.props
    const {
      components,
      ingress,
      componentsError,
      rulesError,
      selectComponentKey,
      selectRule,
      state,
    } = this.state
    let content

    switch (state) {
      case 'list':
        content = (
          <>
            <ComponentList
              error={componentsError}
              data={components}
              onAdd={this.showAddComponent}
              onDelete={this.handleDeleteComponent}
            />
            <RuleList
              error={rulesError}
              data={ingress}
              gateway={gateway}
              onAdd={this.showAddRule}
              onDelete={this.handleDeleteRule}
            />
          </>
        )
        break
      case 'new-component':
        content = (
          <ComponentForm
            appName={appLabels['app.kubernetes.io/name']}
            detail={components[selectComponentKey] || {}}
            componentKey={selectComponentKey}
            namespace={namespace}
            onOk={this.handleAddComponent}
            onCancel={this.hideAddComponent}
            limitRange={limitRange}
            configMaps={configMaps}
            secrets={secrets}
            imageRegistries={imageRegistries}
            isGovernance={isGovernance}
          />
        )
        break
      case 'new-rule': {
        const services = Object.values(components).map(item =>
          ObjectMapper.services(item.service)
        )
        content = (
          <RuleForm
            className={styles.formWrapper}
            data={selectRule}
            namespace={namespace}
            onSave={this.handleAddRule}
            onCancel={this.hideAddRule}
            gateway={gateway}
            services={services}
            secrets={secrets}
          />
        )
        break
      }
      default:
    }

    return content
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderContent()}
        {this.renderFooter()}
      </div>
    )
  }
}
