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

import { get, set, unset, isFunction } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import PropTypes from 'prop-types'
import { Columns, Column } from '@pitrix/lego-ui'
import { Notify, Modal, Switch } from 'components/Base'
import { toPromise } from 'utils'
import FORM_TEMPLATES from 'utils/form.templates'

import ConfigMapStore from 'stores/configmap'
import SecretStore from 'stores/secret'
import ProjectStore from 'stores/project'
import RouterStore from 'stores/router'

import Code from './Code'
import BaseInfo from './BaseInfo'
import Resources from './Resources'

import styles from './index.scss'

export default class ServiceDeployAppModal extends React.Component {
  static propTypes = {
    namespace: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    sampleApp: PropTypes.string,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      formData: {
        application: FORM_TEMPLATES['applications']({
          namespace: props.namespace,
        }),
        ingress: FORM_TEMPLATES['ingresses']({
          namespace: props.namespace,
        }),
      },
      isCodeMode: false,
      isGovernance: this.serviceMeshEnable ? 'true' : 'false',
    }

    this.codeRef = React.createRef()
    this.baseInfoFormRef = React.createRef()
    this.resourcesFormRef = React.createRef()

    this.configMapStore = new ConfigMapStore()
    this.secretStore = new SecretStore()
    this.projectStore = new ProjectStore()
    this.routerStore = new RouterStore()
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    const { namespace, sampleApp } = this.props
    if (sampleApp !== prevProps.sampleApp) {
      sampleApp
        ? this.fecthSampleData(sampleApp)
        : this.setState({
            formData: {
              application: FORM_TEMPLATES['applications']({
                namespace,
              }),
              ingress: FORM_TEMPLATES['ingresses']({
                namespace,
              }),
            },
            isGovernance: this.serviceMeshEnable ? 'true' : 'false',
          })
    }
  }

  get serviceMeshEnable() {
    return (
      globals.app.hasKSModule('servicemesh') &&
      get(this.routerStore, 'gateway.data.serviceMeshEnable')
    )
  }

  fecthSampleData(app) {
    const { namespace, store } = this.props
    const { gateway } = this.state

    store.fetchSampleData(app).then(resp => {
      const formData = {}
      resp.forEach(item => {
        set(item, 'metadata.namespace', namespace)
        if (!this.serviceMeshEnable) {
          unset(
            item,
            'metadata.annotations["servicemesh.kubesphere.io/enabled"]'
          )
        }

        if (item.kind === 'Application') {
          formData.application = item
        } else if (item.kind === 'Service') {
          const componentName = get(item, 'metadata.labels.app')
          set(formData, `${componentName}.service`, item)
        } else if (item.kind === 'Ingress') {
          set(
            item,
            'metadata.annotations["nginx.ingress.kubernetes.io/upstream-vhost"]',
            `productpage.${namespace}.svc.cluster.local`
          )
          set(
            item,
            'spec.rules[0].host',
            `productpage.${namespace}.${gateway.loadBalancerIngress}.nip.io`
          )

          formData.ingress = item
        } else {
          const componentName = get(item, 'metadata.labels.app')
          set(formData, `${componentName}.workload`, item)
        }
      })

      this.setState({ formData })
    })
  }

  fetchData() {
    const { cluster, namespace } = this.props

    Promise.all([
      this.configMapStore.fetchListByK8s({ cluster, namespace }),
      this.secretStore.fetchListByK8s({ cluster, namespace }),
      this.secretStore.fetchListByK8s({
        cluster,
        namespace,
        fieldSelector: `type=kubernetes.io/dockerconfigjson`,
      }),
      this.projectStore.fetchLimitRanges({ cluster, namespace }),
      this.routerStore.getGateway({ cluster, namespace }),
    ]).then(([configMaps, secrets, imageRegistries, limitRanges]) => {
      const gateway = toJS(this.routerStore.gateway.data)
      this.setState({
        configMaps,
        secrets,
        imageRegistries,
        limitRange: get(limitRanges, '[0].limit'),
        gateway,
        isGovernance: this.serviceMeshEnable ? 'true' : 'false',
      })
    })
  }

  handleAppLabelsChange = value => {
    this.setState({ appLabels: value }, () => {
      set(this.state.formData.ingress, 'metadata.labels', value)
    })
  }

  handleGovernanceChange = value => {
    this.setState({ isGovernance: value })
  }

  handleOk = async () => {
    const { isCodeMode } = this.state

    if (isCodeMode && isFunction(get(this, 'codeRef.current.getData'))) {
      const data = this.codeRef.current.getData()
      this.props.onOk(data)
    } else {
      const baseForm = this.baseInfoFormRef.current
      const resourcesForm = this.resourcesFormRef.current

      if (baseForm) {
        await toPromise(baseForm.validate.bind(baseForm))
      }

      if (resourcesForm) {
        await toPromise(resourcesForm.validate.bind(resourcesForm))
      }

      this.props.onOk(this.state.formData)
    }
  }

  handleModeChange = () => {
    this.setState(({ isCodeMode, formData }) => {
      let newFormData = formData

      if (
        !isCodeMode &&
        isFunction(get(this, 'resourcesFormRef.current.hasSubRoute')) &&
        this.resourcesFormRef.current.hasSubRoute()
      ) {
        return Notify.warning(t('Please save the current form first'))
      }

      if (isCodeMode && isFunction(get(this, 'codeRef.current.getData'))) {
        newFormData = this.codeRef.current.getData()
      }

      return { isCodeMode: !isCodeMode, formData: newFormData }
    })
  }

  renderResources = () => {
    const { namespace } = this.props
    const {
      formData,
      limitRange,
      configMaps,
      secrets,
      imageRegistries,
      gateway,
      appLabels,
      isGovernance,
    } = this.state

    return (
      <Resources
        ref={this.resourcesFormRef}
        formData={formData}
        namespace={namespace}
        limitRange={limitRange}
        configMaps={configMaps}
        secrets={secrets}
        imageRegistries={imageRegistries}
        gateway={gateway}
        appLabels={appLabels}
        isGovernance={isGovernance}
      />
    )
  }

  renderTitle() {
    const { isCodeMode } = this.state
    return (
      <div>
        <div>{t('Create Application by Service')}</div>
        <Switch
          className={styles.switch}
          text={t('Edit Mode')}
          onChange={this.handleModeChange}
          checked={isCodeMode}
        />
      </div>
    )
  }

  renderCode() {
    const { onOk } = this.props
    const { formData } = this.state

    return <Code ref={this.codeRef} formTemplate={formData} onOk={onOk} />
  }

  renderForm() {
    return (
      <Columns className="height-full is-gapless">
        <Column className="is-narrow">
          <BaseInfo
            store={this.props.store}
            namespace={this.props.namespace}
            formData={this.state.formData.application}
            formRef={this.baseInfoFormRef}
            serviceMeshEnable={this.serviceMeshEnable}
            onLabelsChange={this.handleAppLabelsChange}
            onGovernanceChange={this.handleGovernanceChange}
          />
        </Column>
        <Column>{this.renderResources()}</Column>
      </Columns>
    )
  }

  render() {
    const { visible, isSubmitting, onCancel } = this.props

    return (
      <Modal
        className={styles.modal}
        bodyClassName={styles.body}
        headerClassName={styles.header}
        footerClassName={styles.footer}
        title={this.renderTitle()}
        onOk={this.handleOk}
        okText={t('Create')}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
        fullScreen
      >
        {this.state.isCodeMode ? this.renderCode() : this.renderForm()}
      </Modal>
    )
  }
}
