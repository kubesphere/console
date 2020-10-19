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

import { get, set, unset, merge, omit, cloneDeep } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select } from '@kube-design/components'
import { Modal } from 'components/Base'
import { PropertiesInput } from 'components/Inputs'
import Title from 'components/Forms/Base/Title'

import styles from './index.scss'

export default class GatewaySettingModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    detail: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    detail: {},
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      type: get(props.detail, 'spec.type'),
      formTemplate: cloneDeep(props.detail),
    }
  }

  get accessModes() {
    return [
      { label: 'None', desc: t('ACCESS_NONE_TIP'), value: 'ClusterIP' },
      {
        label: 'NodePort',
        desc: t('ACCESS_NODEPORT_TIP'),
        value: 'NodePort',
      },
      {
        label: 'LoadBalancer',
        desc: t('ACCESS_LOADBALANCER_TIP'),
        value: 'LoadBalancer',
      },
    ]
  }

  handleTypeChange = type => {
    const { detail } = this.props
    if (type === 'LoadBalancer') {
      let annotations = get(detail._originData, 'metadata.annotations', {})
      annotations = merge(
        globals.config.loadBalancerDefaultAnnotations,
        annotations
      )
      set(this.state.formTemplate, 'metadata.annotations', annotations)
    } else {
      Object.keys(globals.config.loadBalancerDefaultAnnotations).forEach(
        key => {
          unset(this.state.formTemplate, `metadata.annotations["${key}"]`)
        }
      )

      if (type === 'ClusterIP') {
        const ports = get(this.state.formTemplate, 'spec.ports', []).map(port =>
          omit(port, ['nodePort'])
        )
        set(this.state.formTemplate, 'spec.ports', ports)
      }
    }

    this.setState({ type })
  }

  optionRenderer = option => (
    <div className={styles.option}>
      <div>{option.label}</div>
      <p>{option.desc}</p>
    </div>
  )

  handleOk = data => {
    const { onOk } = this.props
    onOk(data)
  }

  render() {
    const { visible, onCancel, isSubmitting } = this.props
    const { type, formTemplate } = this.state

    return (
      <Modal.Form
        width={1162}
        title={t('Edit Internet Access')}
        data={formTemplate}
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <div>
          <Title
            title={t('Internet Access')}
            desc={t('SERVICES_INTERNET_ACCESS_DESC')}
          />
          <div className={styles.wrapper}>
            <div className={styles.contentWrapper}>
              <Form.Item label={t('Access Method')} className={styles.types}>
                <Select
                  name="spec.type"
                  options={this.accessModes}
                  onChange={this.handleTypeChange}
                  optionRenderer={this.optionRenderer}
                />
              </Form.Item>
              {type === 'LoadBalancer' && (
                <Form.Item label={t('Annotations')}>
                  <PropertiesInput
                    name="metadata.annotations"
                    hiddenKeys={globals.config.preservedAnnotations}
                    addText={t('Add Annotation')}
                  />
                </Form.Item>
              )}
            </div>
          </div>
        </div>
      </Modal.Form>
    )
  }
}
