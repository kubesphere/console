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

import { get, set, unset, omit, cloneDeep } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { toJS } from 'mobx'
import {
  Form,
  Select,
  Columns,
  Column,
  Tooltip,
  Icon,
} from '@kube-design/components'
import { Modal } from 'components/Base'
import { AnnotationsInput } from 'components/Inputs'
import Title from 'components/Forms/Base/Title'
import OpenELBStore from 'stores/openelb'
import { CLUSTER_PROVIDERS_ANNOTATIONS } from 'pages/projects/components/Modals/GatewaySetting/contants'
import { CLUSTER_PROVIDERS } from 'utils/constants'
import styles from './index.scss'

const defaultProvider = 'QingCloud Kubernetes Engine'
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
      type: get(toJS(props.detail._originData), 'spec.type'),
      formTemplate: cloneDeep(toJS(props.detail._originData)),
      openELBOpened: true,
      provider: defaultProvider,
    }
  }

  openELBStore = new OpenELBStore()

  get accessModes() {
    return [
      { label: t('NONE'), desc: t('ACCESS_NONE_TIP'), value: 'ClusterIP' },
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
    const { cluster, namespace } = this.props.detail
    const isOpened = await this.openELBStore.isActive({
      clusters: [cluster],
      namespace,
    })
    if (!isOpened) {
      this.setState({
        openELBOpened: isOpened,
      })
    }
  }

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

  handleTypeChange = type => {
    if (type !== 'LoadBalancer') {
      Object.keys(globals.config.loadBalancerDefaultAnnotations).forEach(
        key => {
          unset(this.state.formTemplate, `metadata.annotations["${key}"]`)
        }
      )

      this.providerOptions.forEach(key => {
        unset(this.formTemplate, `metadata.annotations["${key}"]`)
      })

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
    const { onOk, store, detail } = this.props
    const list = store.list
    const selectedRowKeys = toJS(list.selectedRowKeys)
    const newSelectedRowKeys = selectedRowKeys.filter(
      item => item !== detail.uid
    )
    onOk(data)
    list.setSelectRowKeys(newSelectedRowKeys)
  }

  render() {
    const { visible, onCancel, isSubmitting } = this.props
    const { type, formTemplate, provider, openELBOpened } = this.state
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
      <Modal.Form
        width={1162}
        title={t('EDIT_EXTERNAL_ACCESS')}
        data={formTemplate}
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <div>
          <Title
            title={t('EXTERNAL_ACCESS')}
            desc={t('SERVICE_EXTERNAL_ACCESS_DESC')}
          />
          <div className={styles.wrapper}>
            <div className={styles.contentWrapper}>
              <Columns>
                <Column>
                  <Form.Item label={t('ACCESS_MODE')} className={styles.types}>
                    <Select
                      name="spec.type"
                      options={this.accessModes}
                      onChange={this.handleTypeChange}
                      optionRenderer={this.optionRenderer}
                    />
                  </Form.Item>
                </Column>
                {type === 'LoadBalancer' && (
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
              {type === 'LoadBalancer' && (
                <Form.Item label={t('ANNOTATION_PL')}>
                  <AnnotationsInput
                    name="metadata.annotations"
                    options={this.providerOptions}
                    hiddenKeys={[/^kubesphere.io\//, 'openpitrix_runtime']}
                    addText={t('ADD')}
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
