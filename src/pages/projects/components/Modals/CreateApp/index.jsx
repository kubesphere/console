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

import { get, set, unset } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import PropTypes from 'prop-types'
import { Icon } from '@pitrix/lego-ui'
import { Modal, Button } from 'components/Base'
import FORM_TEMPLATES from 'utils/form.templates'

import RouterStore from 'stores/router'

import Steps from './Steps'
import BaseInfo from './BaseInfo'
import Services from './Services'
import Routes from './Routes'

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

    this.formRef = React.createRef()

    this.routerStore = new RouterStore()
  }

  componentDidMount() {
    this.fetchData().then(() => {
      const { sampleApp } = this.props
      if (sampleApp) {
        this.fecthSampleData(sampleApp)
      }
    })
  }

  get serviceMeshEnable() {
    return (
      globals.app.hasKSModule('servicemesh') &&
      get(this.routerStore, 'gateway.data.serviceMeshEnable')
    )
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

  async fetchData() {
    const { cluster, namespace } = this.props
    await this.routerStore.getGateway({ cluster, namespace })
    const gateway = toJS(this.routerStore.gateway.data)
    this.setState({
      gateway,
      isGovernance: this.serviceMeshEnable ? 'true' : 'false',
    })
  }

  handleOk = () => {
    this.props.onOk(this.state.formData)
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

  renderForm() {
    const { cluster, namespace, store, projectDetail } = this.props
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
      projectDetail,
      serviceMeshEnable: this.serviceMeshEnable,
    }

    if (step.isForm) {
      props.formRef = this.formRef
    } else {
      props.ref = this.formRef
    }

    return (
      <div className={styles.formWrapper}>
        <div className={styles.wrapper}>
          <div className={styles.form}>
            <Component {...props} />
          </div>
        </div>
      </div>
    )
  }

  renderHeader() {
    const { onCancel } = this.props
    const { currentStep } = this.state
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          <Icon name="close" size={20} clickable onClick={onCancel} />
          <span />
          <Icon name="appcenter" size={20} />
          <span>{t('Create Application by Service')}</span>
        </div>
        <div className={styles.wrapper}>
          <Steps steps={this.steps} current={currentStep} />
        </div>
        <div className={styles.headerBottom} />
      </div>
    )
  }

  renderFooter() {
    const { onCancel } = this.props
    const { currentStep } = this.state

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
              <Button type="control" onClick={this.handleOk}>
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
        {this.renderForm()}
        {this.renderFooter()}
      </Modal>
    )
  }
}
