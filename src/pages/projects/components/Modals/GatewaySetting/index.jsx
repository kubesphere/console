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

import { set, isEmpty, pick } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { RadioButton, RadioGroup, Alert, Toggle } from '@pitrix/lego-ui'
import { Modal, Form, Button } from 'components/Base'
import { PropertiesInput } from 'components/Inputs'
import Title from 'components/Forms/Base/Title'

import styles from './index.scss'

export default class GatewaySettingModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    detail: {},
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.form = React.createRef()

    this.state = {
      type: props.detail.type || 'NodePort',
      annotations: props.detail.annotations || {},
      isChecked: props.detail.serviceMeshEnable || false,
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, detail } = this.props
    if (visible && visible !== prevProps.visible) {
      this.setState({
        type: detail.type || 'NodePort',
        isChecked: detail.serviceMeshEnable || false,
        annotations: detail.annotations || {},
      })
    }
  }

  getTypeOptions = () => [
    { label: 'NodePort', value: 'NodePort' },
    { label: 'LoadBalancer', value: 'LoadBalancer' },
  ]

  get anonotationsDefault() {
    return isEmpty(this.state.annotations)
      ? globals.config.loadBalancerDefaultAnnotations
      : this.state.annotations
  }

  handleOk = () => {
    const { onOk } = this.props
    const { isChecked } = this.state
    const form = this.form.current
    const data = pick(form.getData(), ['type', 'annotations'])

    set(
      data,
      'annotations["servicemesh.kubesphere.io/enabled"]',
      isChecked ? 'true' : 'false'
    )

    onOk({ ...data })
  }

  handleTypeChange = type => {
    const form = this.form.current
    const data = form.getData()

    if (type === 'LoadBalancer' && isEmpty(data.annotations)) {
      set(data, 'annotations', this.anonotationsDefault)
    } else if (data.annotations) {
      this.setState({ annotations: data.annotations })
      delete data.annotations
    }

    this.setState({ type })
  }

  handleToggleChange = value => {
    this.setState({ isChecked: value })
  }

  render() {
    const { visible, onCancel, detail = {}, cluster, isSubmitting } = this.props
    const { type, isChecked } = this.state

    return (
      <Modal
        width={1162}
        title={t('Set Gateway')}
        onCancel={onCancel}
        visible={visible}
        bodyClassName={styles.modalBody}
        closable={false}
        hideFooter
      >
        <div className={styles.body}>
          <Title
            title={t('Set Gateway')}
            desc={t('PROJECT_INTERNET_ACCESS_DESC')}
          />
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <Form ref={this.form} data={detail}>
                <Form.Item label={t('Access Method')} className={styles.types}>
                  <RadioGroup
                    name="type"
                    wrapClassName="radio-default"
                    buttonWidth={155}
                    defaultValue={type}
                    onChange={this.handleTypeChange}
                    size="small"
                  >
                    <RadioButton value="NodePort">NodePort</RadioButton>
                    <RadioButton value="LoadBalancer">LoadBalancer</RadioButton>
                  </RadioGroup>
                </Form.Item>
                <Alert
                  className="margin-t12"
                  type="info"
                  description={t(
                    `INGRESS_CONTROLLER_${type.toUpperCase()}_DESC`
                  )}
                />
                {globals.app.hasClusterModule(cluster, 'servicemesh') && (
                  <>
                    <div className={styles.toggle}>
                      {t('Application Governance')}
                      <Toggle
                        checked={isChecked}
                        onChange={this.handleToggleChange}
                        onText={t('On')}
                        offText={t('Off')}
                      />
                    </div>
                    <div className={styles.toggleTip}>
                      {t('GATEWAY_APPLICATION_GOVERNANCE_TIP')}
                    </div>
                  </>
                )}
                {type === 'LoadBalancer' && (
                  <Form.Item label={t('Annotations')}>
                    <PropertiesInput
                      name="annotations"
                      addText={t('Add Annotation')}
                      defaultValue={this.anonotationsDefault}
                    />
                  </Form.Item>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Button
            type="control"
            onClick={this.handleOk}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {t('Save')}
          </Button>
        </div>
      </Modal>
    )
  }
}
