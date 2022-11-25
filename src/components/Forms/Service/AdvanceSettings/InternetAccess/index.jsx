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

import { get, unset } from 'lodash'
import React from 'react'
import {
  Form,
  Select,
  Icon,
  Tooltip,
  Columns,
  Column,
} from '@kube-design/components'
import { AnnotationsInput } from 'components/Inputs'
import { CLUSTER_PROVIDERS_ANNOTATIONS } from 'pages/projects/components/Modals/GatewaySetting/contants'
import { updateFederatedAnnotations } from 'utils'
import { CLUSTER_PROVIDERS } from 'utils/constants'

import OpenELBStore from 'stores/openelb'
import styles from './index.scss'

const defaultProvider = 'QingCloud Kubernetes Engine'
export default class InternetAccess extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: get(this.formTemplate, 'spec.type', 'ClusterIP'),
      provider: defaultProvider,
      openELBOpened: true,
    }
  }

  openELBStore = new OpenELBStore()

  get fedPreifx() {
    return this.props.isFederated ? 'spec.template.' : ''
  }

  get formTemplate() {
    return this.props.formTemplate.Service
  }

  get accessModes() {
    return [
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

  get providerOptions() {
    const { provider } = this.state
    return provider === ''
      ? []
      : Object.keys(CLUSTER_PROVIDERS_ANNOTATIONS[provider])
  }

  async componentDidMount() {
    this.checkOpenELBStatus()
  }

  checkOpenELBStatus = async () => {
    const { clusters, namespace } = this.props
    const isOpened = await this.openELBStore.isActive({ clusters, namespace })
    if (!isOpened) {
      this.setState({
        openELBOpened: isOpened,
      })
    }
  }

  handleAccessModeChange = mode => {
    if (mode !== 'LoadBalancer') {
      Object.keys(globals.config.loadBalancerDefaultAnnotations).forEach(
        key => {
          unset(this.formTemplate, `metadata.annotations["${key}"]`)
        }
      )

      this.providerOptions.forEach(key => {
        unset(this.formTemplate, `metadata.annotations["${key}"]`)
      })
    }

    if (this.props.isFederated) {
      updateFederatedAnnotations(this.formTemplate)
    }

    this.setState({ mode })
  }

  handleAnnotationsChange = () => {
    if (this.props.isFederated) {
      updateFederatedAnnotations(this.formTemplate)
    }
  }

  optionRenderer = option => (
    <div className={styles.option}>
      <div>{option.label}</div>
      <p>{option.desc}</p>
    </div>
  )

  providerOptionRenderer = option => (
    <div className={styles.selectOption}>
      <Icon className="margin-r8" name={option.icon} type="light" size={20} />
      <span className={styles.text}>{option.label}</span>
      {option.disabled && (
        <Tooltip content={t('OPENELB_NOT_READY')}>
          <Icon name={'question'} size="16"></Icon>
        </Tooltip>
      )}
    </div>
  )

  handleProvideChange = provider => {
    this.setState({
      provider,
    })
  }

  render() {
    const { mode, provider, openELBOpened } = this.state
    const options = [
      ...CLUSTER_PROVIDERS,
      {
        label: 'OpenELB',
        value: 'OpenELB',
        icon: 'kubernetes',
        disabled: !openELBOpened,
        tip: '',
      },
    ]
    return (
      <>
        <Columns>
          <Column>
            <Form.Item label={t('ACCESS_MODE')}>
              <Select
                name={`Service.${this.fedPreifx}spec.type`}
                options={this.accessModes}
                onChange={this.handleAccessModeChange}
              ></Select>
            </Form.Item>
          </Column>
          {mode === 'LoadBalancer' && (
            <Column>
              <Form.Item label={t('LOAD_BALANCER_PROVIDER')}>
                <Select
                  options={options}
                  placeholder=" "
                  optionRenderer={this.providerOptionRenderer}
                  onChange={this.handleProvideChange}
                  value={provider}
                ></Select>
              </Form.Item>
            </Column>
          )}
        </Columns>
        {mode === 'LoadBalancer' && (
          <Columns>
            <Column>
              <Form.Item label={t('ANNOTATION_PL')}>
                <AnnotationsInput
                  name="Service.metadata.annotations"
                  options={this.providerOptions}
                  hiddenKeys={globals.config.preservedAnnotations}
                  onChange={this.handleAnnotationsChange}
                  addText={t('ADD')}
                />
              </Form.Item>
            </Column>
          </Columns>
        )}
      </>
    )
  }
}
