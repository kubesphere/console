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

import { get, set, isFunction } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import PropTypes from 'prop-types'
import { Icon, Button, Notify } from '@kube-design/components'
import { Modal, Switch } from 'components/Base'
import { mergeLabels, updateFederatedAnnotations } from 'utils'
import FORM_TEMPLATES from 'utils/form.templates'

import RouterStore from 'stores/router'

import Steps from './Steps'
import BaseInfo from './BaseInfo'
import Services from './Services'
import Routes from './Routes'
import Code from './Code'

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
      currentStep: 0,
      formData: this.federatedWrapper({
        application: FORM_TEMPLATES['applications']({
          namespace: props.namespace,
        }),
        ingress: FORM_TEMPLATES['ingresses']({
          namespace: props.namespace,
        }),
      }),
      isCodeMode: false,
      isGovernance: false,
    }

    this.formRef = React.createRef()
    this.codeRef = React.createRef()

    this.routerStore = new RouterStore()
  }

  componentDidMount() {
    if (!this.props.isFederated) {
      this.fetchData().then(() => {
        const { sampleApp } = this.props
        if (sampleApp) {
          this.fecthSampleData(sampleApp)
        }
      })
    }
  }

  federatedWrapper(formTemplate) {
    const { isFederated, projectDetail } = this.props
    if (isFederated) {
      Object.keys(formTemplate).forEach(key => {
        formTemplate[key] = FORM_TEMPLATES.federated({
          data: formTemplate[key],
          clusters: projectDetail.clusters.map(item => item.name),
          kind: formTemplate[key].kind,
        })
      })
      const labels = get(
        formTemplate.application,
        'spec.template.metadata.labels',
        {}
      )
      set(formTemplate.application, 'metadata.labels', labels)
    }
    return formTemplate
  }

  get serviceMeshEnable() {
    if (this.props.isFederated) {
      return true
    }

    return globals.app.hasClusterModule(this.props.cluster, 'servicemesh')
  }

  get steps() {
    return [
      {
        title: 'Basic Info',
        component: BaseInfo,
        required: true,
        isForm: true,
      },
      {
        title: 'Service Components',
        component: Services,
        required: true,
      },
      {
        title: 'Internet Access',
        component: Routes,
        required: true,
      },
    ]
  }

  fecthSampleData(app) {
    const { namespace, store } = this.props
    const { gateway } = this.state

    store.fetchSampleData(app).then(resp => {
      const formData = this.getFormDataFromCode(resp)

      set(
        formData.ingress,
        'metadata.annotations["nginx.ingress.kubernetes.io/upstream-vhost"]',
        `productpage.${namespace}.svc.cluster.local`
      )
      if (!gateway.defaultIngress) {
        set(formData.ingress, 'spec.rules', [])
      } else {
        set(
          formData.ingress,
          'spec.rules[0].host',
          gateway.isHostName
            ? gateway.defaultIngress
            : `productpage.${namespace}.${gateway.defaultIngress}.nip.io`
        )
      }

      this.setState({ formData })
    })
  }

  getFormDataFromCode(resources) {
    const { namespace } = this.props
    const formData = {}
    resources.forEach(item => {
      set(item, 'metadata.namespace', namespace)

      if (item.kind.indexOf('Application') !== -1) {
        formData.application = item
      } else if (item.kind.indexOf('Service') !== -1) {
        const componentName = get(item, 'metadata.labels.app')
        set(formData, `${componentName}.service`, item)
      } else if (item.kind.indexOf('Ingress') !== -1) {
        formData.ingress = item
      } else {
        const componentName = get(item, 'metadata.labels.app')
        set(formData, `${componentName}.workload`, item)
      }
    })
    return formData
  }

  async fetchData() {
    const { cluster, namespace } = this.props
    await this.routerStore.getGateway({ cluster, namespace })
    const gateway = toJS(this.routerStore.gateway.data)
    const isGovernance = !!(this.serviceMeshEnable && gateway.serviceMeshEnable)
    set(
      this.state.formData.application,
      'metadata.annotations["servicemesh.kubesphere.io/enabled"]',
      String(isGovernance)
    )
    this.setState({ gateway, isGovernance })
  }

  handleOk = () => {
    const { isFederated } = this.props
    const { isCodeMode } = this.state

    let data
    if (isCodeMode && isFunction(get(this, 'codeRef.current.getData'))) {
      data = this.getFormDataFromCode(this.codeRef.current.getData())
    } else {
      data = this.state.formData
    }

    if (isFederated) {
      const newData = {}
      const { application, ingress, ...components } = data
      newData.Application = application
      newData.Ingress = ingress
      Object.keys(components).forEach(key => {
        const component = components[key]
        newData[`${key}-workload`] = component.workload
        newData[`${key}-service`] = component.service
      })
      data = newData
    }

    this.props.onOk(data)
  }

  handlePrev = () => {
    this.setState(({ currentStep }) => ({
      currentStep: Math.max(0, currentStep - 1),
    }))
  }

  handleNext = () => {
    const form = this.formRef.current
    form &&
      form.validate(() => {
        this.setState(({ currentStep }) => ({
          currentStep: Math.min(this.steps.length - 1, currentStep + 1),
        }))
      })
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
        newFormData = this.getFormDataFromCode(this.codeRef.current.getData())
      }

      return { isCodeMode: !isCodeMode, formData: newFormData }
    })
  }

  handleAppLabelsChange = value => {
    const { application, ingress, ...components } = this.state.formData
    mergeLabels(ingress, value)
    Object.values(components).forEach(component => {
      mergeLabels(component.service, value)
      mergeLabels(component.workload, value)
    })
  }

  handleGovernanceChange = value => {
    const { isFederated } = this.props
    const { application, ingress, ...components } = this.state.formData
    this.setState({ isGovernance: value === 'true' })
    Object.values(components).forEach(component => {
      set(
        component.workload,
        'metadata.annotations["servicemesh.kubesphere.io/enabled"]',
        value
      )
      set(
        component.service,
        'metadata.annotations["servicemesh.kubesphere.io/enabled"]',
        value
      )
      set(
        component.workload,
        'spec.template.metadata.annotations["sidecar.istio.io/inject"]',
        value
      )
      if (isFederated) {
        updateFederatedAnnotations(component.workload)
        updateFederatedAnnotations(component.service)
      }
    })
  }

  renderHeader() {
    const { onCancel } = this.props
    const { currentStep, isCodeMode } = this.state
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          <Icon name="close" size={20} clickable onClick={onCancel} />
          <span />
          <Icon name="appcenter" size={20} />
          <span>{t('Create Application by Service')}</span>
        </div>
        {!isCodeMode && (
          <div className={styles.steps}>
            <div />
            <Steps steps={this.steps} current={currentStep} />
          </div>
        )}
        <Switch
          className={styles.switch}
          text={t('Edit Mode')}
          onChange={this.handleModeChange}
          checked={isCodeMode}
        />
        <div className={styles.headerBottom} />
      </div>
    )
  }

  renderForm() {
    const { cluster, namespace, store, isFederated, projectDetail } = this.props
    const { formData, gateway, currentStep, isGovernance } = this.state

    const step = this.steps[currentStep]
    const Component = step.component

    const props = {
      store,
      cluster,
      namespace,
      formData,
      gateway,
      isGovernance,
      isFederated,
      projectDetail,
      serviceMeshEnable: this.serviceMeshEnable,
      onLabelsChange: this.handleAppLabelsChange,
      onGovernanceChange: this.handleGovernanceChange,
    }

    if (step.isForm) {
      props.formRef = this.formRef
    } else {
      props.ref = this.formRef
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <Component {...props} />
        </div>
      </div>
    )
  }

  renderCode() {
    const { formData } = this.state

    return <Code ref={this.codeRef} formTemplate={formData} />
  }

  renderFooter() {
    const { onCancel, store } = this.props
    const { currentStep, isCodeMode } = this.state

    if (isCodeMode) {
      return (
        <div className={styles.footer}>
          <div className={styles.wrapper}>
            <div className="text-right">
              <Button onClick={onCancel}>{t('Cancel')}</Button>
              <Button
                type="control"
                onClick={this.handleOk}
                loading={store.isSubmitting}
              >
                {t('Create')}
              </Button>
            </div>
          </div>
        </div>
      )
    }

    const total = this.steps.length - 1
    return (
      <div className={styles.footer}>
        <div className={styles.wrapper}>
          <div className="text-right">
            <Button onClick={onCancel}>{t('Cancel')}</Button>
            {currentStep > 0 && (
              <Button type="control" onClick={this.handlePrev}>
                {t('Previous')}
              </Button>
            )}
            {currentStep < total ? (
              <Button type="control" onClick={this.handleNext}>
                {t('Next')}
              </Button>
            ) : (
              <Button
                type="control"
                onClick={this.handleOk}
                loading={store.isSubmitting}
              >
                {t('Create')}
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { visible } = this.props
    const { isCodeMode } = this.state

    return (
      <Modal
        className={styles.modal}
        bodyClassName={styles.body}
        visible={visible}
        hideHeader
        hideFooter
        fullScreen
      >
        {this.renderHeader()}
        <div className={styles.content}>
          {isCodeMode ? this.renderCode() : this.renderForm()}
        </div>
        {this.renderFooter()}
      </Modal>
    )
  }
}
