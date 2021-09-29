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
import { PropertiesInput } from 'components/Inputs'
import Title from 'components/Forms/Base/Title'

import { CLUSTER_PROVIDERS } from 'utils/constants'

import { observable } from 'mobx'
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
    }

    const annotations = get(this.template, 'spec.service.annotations')

    if (isEmpty(annotations)) {
      set(
        this.template,
        'spec.service.annotations',
        globals.config.loadBalancerDefaultAnnotations
      )
    }
  }

  getTypeOptions = () => [
    { label: 'NodePort', value: 'NodePort' },
    { label: 'LoadBalancer', value: 'LoadBalancer' },
  ]

  handleOk = () => {
    const { onOk } = this.props
    const { isChecked } = this.state

    set(
      this.template,
      'spec.deployment.annotations["servicemesh.kubesphere.io/enabled"]',
      isChecked ? 'true' : 'false'
    )

    onOk(this.template)
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
    } else {
      set(this.template, 'spec.service.annotations', {})
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
    this.initAnnotations(CLUSTER_PROVIDERS_ANNOTATIONS[value])
  }

  initAnnotations = (value = globals.config.loadBalancerDefaultAnnotations) => {
    set(this.template, 'spec.service.annotations', value)
    this.forceUpdate()
  }

  renderLoadBalancerSupport = () => {
    return (
      <Form.Item label={t('LoadBalancer Support')}>
        <div className={styles.loadBalancer}>
          <Select
            options={CLUSTER_PROVIDERS}
            optionRenderer={this.providerOptionRenderer}
            onChange={this.handleAnnotations}
          ></Select>
          <Button onClick={() => this.initAnnotations()}>
            {t('Use default annotations')}
          </Button>
        </div>
      </Form.Item>
    )
  }

  handleToggleChange = value => {
    this.setState({ isChecked: value })
  }

  render() {
    const { visible, onCancel, cluster, isSubmitting } = this.props
    const { isChecked } = this.state

    return (
      <Modal
        width={1162}
        title={t('SET_GATEWAY')}
        onCancel={onCancel}
        visible={visible}
        bodyClassName={styles.modalBody}
        closable={false}
        hideFooter
      >
        <div className={styles.body}>
          <Title
            title={t('SET_GATEWAY')}
            desc={t('PROJECT_INTERNET_ACCESS_DESC')}
          />
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <Form ref={this.form} data={this.template}>
                <Form.Item label={t('ACCESS_METHOD')} className={styles.types}>
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

                {globals.app.hasClusterModule(cluster, 'servicemesh') && (
                  <>
                    <div className={styles.toggle}>
                      {t('APPLICATION_GOVERNANCE')}
                      <Toggle
                        checked={isChecked}
                        onChange={this.handleToggleChange}
                        onText={t('ENABLE')}
                        offText={t('DISABLE')}
                      />
                    </div>
                    <div className={styles.toggleTip}>
                      {t('GATEWAY_APPLICATION_GOVERNANCE_TIP')}
                    </div>
                  </>
                )}
                {get(this.template, 'spec.service.type') === 'LoadBalancer' && (
                  <>
                    {this.renderLoadBalancerSupport()}
                    <Form.Item label={t('ANNOTATION_PL')}>
                      <PropertiesInput
                        controlled
                        className={styles.objectBg}
                        name="spec.service.annotations"
                        addText={t('ADD')}
                      />
                    </Form.Item>
                  </>
                )}
                <Form.Item label={t('Gateway Config')}>
                  <PropertiesInput
                    className={styles.objectBg}
                    name="spec.controller.config"
                    addText={t('Add Gateway Config')}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Button
            onClick={onCancel}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {t('Cancel')}
          </Button>
          <Button
            type="control"
            onClick={this.handleOk}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {t('OK')}
          </Button>
        </div>
      </Modal>
    )
  }
}
