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

import { get, set, isEmpty, has } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Button,
  RadioButton,
  RadioGroup,
  Select,
  Icon,
  Toggle,
} from '@kube-design/components'
import { Modal } from 'components/Base'
import { PropertiesInput, AnnotationsInput } from 'components/Inputs'

import { CLUSTER_PROVIDERS } from 'utils/constants'

import { observable, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { CLUSTER_PROVIDERS_ANNOTATIONS } from './contants'

import styles from './index.scss'

@observer
export default class GatewaySettingModal extends React.Component {
  static propTypes = {
    template: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    template: {},
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  @observable
  template = this.props.detail || {}

  @observable
  options = []

  constructor(props) {
    super(props)

    this.form = React.createRef()

    this.state = {
      isChecked: JSON.parse(
        get(
          this.template,
          'spec.deployment.annotations["servicemesh.kubesphere.io/enabled"]',
          false
        )
      ),
      configError: '',
    }
  }

  componentDidMount() {
    this.initAnnotations()
  }

  getTypeOptions = () => [
    { label: 'NodePort', value: 'NodePort' },
    { label: 'LoadBalancer', value: 'LoadBalancer' },
  ]

  initAnnotations = () => {
    const annotations = get(this.template, 'spec.service.annotations')
    const type = get(this.template, 'spec.service.type')
    const annotationType = get(
      this.template,
      "metadata.annotations['kubesphere.io/annotations']"
    )

    if (
      isEmpty(annotations) &&
      type === 'LoadBalancer' &&
      annotationType === 'QingCloud Kubernetes Engine'
    ) {
      set(
        this.template,
        'spec.service.annotations',
        globals.config.loadBalancerDefaultAnnotations
      )
    }
    if (annotationType) {
      this.options = Object.keys(CLUSTER_PROVIDERS_ANNOTATIONS[annotationType])
    }

    const config = get(this.template, 'spec.controller.config', {})

    if (!has(config, 'worker-processes')) {
      set(this.template, 'spec.controller.config', {
        ...config,
        'worker-processes': '4',
      })
    }
  }

  handleOk = () => {
    const { onOk } = this.props
    const { isChecked } = this.state

    set(
      this.template,
      'spec.deployment.annotations["servicemesh.kubesphere.io/enabled"]',
      isChecked ? 'true' : 'false'
    )

    this.form.current.validate(() => {
      onOk(this.template)
    })
  }

  handleTypeChange = type => {
    const annotations = get(this.template, 'spec.service.annotations', {})

    if (type === 'LoadBalancer') {
      set(
        this.template,
        'spec.service.annotations',
        isEmpty(annotations)
          ? globals.config.loadBalancerDefaultAnnotations
          : annotations
      )

      set(
        this.template,
        "metadata.annotations['kubesphere.io/annotations']",
        'QingCloud Kubernetes Engine'
      )
    } else {
      set(this.template, 'spec.service.annotations', {})

      set(
        this.template,
        "metadata.annotations['kubesphere.io/annotations']",
        ''
      )
    }

    this.setState({ type })
  }

  providerOptionRenderer = option => (
    <>
      <Icon className="margin-r8" name={option.icon} type="light" size={20} />
      {option.label}
    </>
  )

  handleAnnotations = value => {
    this.options = Object.keys(CLUSTER_PROVIDERS_ANNOTATIONS[value])
    if (value === 'QingCloud Kubernetes Engine') {
      this.setAnnotations(globals.config.loadBalancerDefaultAnnotations)
    } else {
      this.setAnnotations({})
    }
  }

  setAnnotations = value => {
    set(this.template, 'spec.service.annotations', value)
    this.forceUpdate()
  }

  renderLoadBalancerSupport = () => {
    const options = [
      ...CLUSTER_PROVIDERS,
      {
        label: 'OpenELB',
        value: 'OpenELB',
        icon: 'kubernetes',
      },
    ]

    return (
      <div className={styles.loadBalancer}>
        <Form.Item label={t('LOAD_BALANCER_PROVIDER')}>
          <Select
            options={options}
            placeholder=" "
            optionRenderer={this.providerOptionRenderer}
            onChange={this.handleAnnotations}
            name="metadata.annotations['kubesphere.io/annotations']"
          ></Select>
        </Form.Item>
      </div>
    )
  }

  handleToggleChange = value => {
    this.setState({ isChecked: value })
  }

  renderTitle = () => {
    return (
      <div className={styles.modalTitle}>
        <Icon name="loadbalancer" size={32} />
        <div className={styles.modalTitleContent}>
          <div>{t('ENABLE_GATEWAY')}</div>
          <p> {t('ENABLE_GATEWAY_DESC')}</p>
        </div>
      </div>
    )
  }

  handleConfigError = (err = '') => {
    this.setState({ configError: err })
  }

  render() {
    const { visible, onCancel, cluster, isSubmitting } = this.props
    const { isChecked, configError } = this.state

    return (
      <Modal
        width={960}
        title={this.renderTitle()}
        onCancel={onCancel}
        visible={visible}
        bodyClassName={styles.modalBody}
        headerClassName={styles.modalHead}
        closable={false}
        hideFooter
      >
        <div className={styles.body}>
          <div className={styles.wrapper}>
            <Form ref={this.form} data={this.template}>
              <Form.Item label={t('ACCESS_MODE')} className={styles.types}>
                <RadioGroup
                  name="spec.service.type"
                  mode="button"
                  buttonWidth={155}
                  onChange={this.handleTypeChange}
                  size="small"
                >
                  <RadioButton value="NodePort">NodePort</RadioButton>
                  <RadioButton value="LoadBalancer">LoadBalancer</RadioButton>
                </RadioGroup>
              </Form.Item>

              <div className={styles.content}>
                {globals.app.hasClusterModule(cluster, 'servicemesh') && (
                  <div className={styles.wrapperContent}>
                    <div className={styles.toggle}>
                      <Toggle
                        checked={isChecked}
                        onChange={this.handleToggleChange}
                      />
                      {t('TRACING')}
                    </div>
                    <div className={styles.toggleTip}>
                      {t.html('GATEWAY_TRACING_TIP')}
                    </div>
                  </div>
                )}
                {get(this.template, 'spec.service.type') === 'LoadBalancer' && (
                  <>
                    {this.renderLoadBalancerSupport()}
                    <div className={styles.wrapperContent}>
                      <Form.Item label={t('ANNOTATION_PL')}>
                        <AnnotationsInput
                          controlled
                          options={toJS(this.options)}
                          className={styles.objectBg}
                          name="spec.service.annotations"
                          addText={t('ADD')}
                        />
                      </Form.Item>
                    </div>
                  </>
                )}
                <div className={styles.wrapperContent}>
                  <Form.Item label={t('CONFIGURATION_OPTIONS')}>
                    <PropertiesInput
                      className={styles.objectBg}
                      name="spec.controller.config"
                      addText={t('ADD')}
                      onError={this.handleConfigError}
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <div className={styles.footer}>
          <Button
            onClick={onCancel}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {t('CANCEL')}
          </Button>
          <Button
            type="control"
            onClick={this.handleOk}
            loading={isSubmitting}
            disabled={isSubmitting || configError !== ''}
          >
            {t('OK')}
          </Button>
        </div>
      </Modal>
    )
  }
}
