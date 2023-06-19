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

import React from 'react'
import { get, unset, set, isEmpty } from 'lodash'
import { computed, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Form } from '@kube-design/components'
import { TypeSelect } from 'components/Base'
import { NETWORK_PLUGIN_ICONS, STORAGE_PLUGIN_ICONS } from '../constants'

import styles from './index.scss'

import Title from '../Title'
import KubernetesParams from './KubernetesParams'
import NetworkParams from './NetworkParams'
import StorageParams from './StorageParams'

@observer
export default class ClusterSettings extends React.Component {
  constructor(props) {
    super(props)

    const networkPlugin = get(props.formTemplate, 'spec.network.plugin')
    const network = this.networkPlugins.find(
      item => item.value === networkPlugin
    )

    const storagePlugin =
      get(props.formTemplate, 'spec.storagePlugin') ||
      get(this.storagePlugins, '[0].value')

    set(props.formTemplate, 'spec.storagePlugin', storagePlugin)

    const storage = this.storagePlugins.find(
      item => item.value === storagePlugin
    )
    if (
      storage &&
      storage.template &&
      isEmpty(get(props.formTemplate, 'spec.addons[0]'))
    ) {
      set(props.formTemplate, 'spec.addons[0]', toJS(storage.template))
    }

    this.state = {
      networkParams: get(network, 'params', []),
      storageParams: get(storage, 'params', []),
    }
  }

  @computed
  get versions() {
    return toJS(
      get(
        this.props.store.kubekey,
        'parameters.kubernetes.supportedVersions',
        []
      )
    ).map(value => ({
      icon: 'kubernetes',
      label: value,
      value,
      description: '-',
    }))
  }

  @computed
  get networkPlugins() {
    return get(
      this.props.store.kubekey,
      'parameters.kubernetes.supportedCNIs',
      []
    ).map(plugin => ({
      label: plugin.title,
      value: plugin.name,
      icon: NETWORK_PLUGIN_ICONS[plugin.name] || 'network',
      description: t(plugin.description),
      params: plugin.parameters,
    }))
  }

  @computed
  get storagePlugins() {
    return get(this.props.store.kubekey, 'parameters.storagePlugins', []).map(
      plugin => ({
        label: plugin.title,
        value: plugin.name,
        icon: STORAGE_PLUGIN_ICONS[plugin.name] || 'network',
        description: t(plugin.description),
        params: plugin.parameters,
        template: plugin.template,
      })
    )
  }

  handleNetworkPluginChange = networkPlugin => {
    const network = this.networkPlugins.find(
      item => item.value === networkPlugin
    )
    const { networkParams: oldParams } = this.state

    this.setState({ networkParams: get(network, 'params', []) }, () => {
      const { networkParams } = this.state
      const { formTemplate } = this.props
      // unset old network params.
      oldParams.forEach(param => {
        unset(formTemplate, `spec.network.${param.name}`)
      })
      // init network params default values.
      networkParams.forEach(param => {
        if ('default' in param) {
          set(formTemplate, `spec.network.${param.name}`, param.default)
        }
      })
    })
  }

  handleStoragePluginChange = storagePlugin => {
    const storage = this.storagePlugins.find(
      item => item.value === storagePlugin
    )

    if (storage) {
      storage.template = storage.template || {}
      set(this.props.formTemplate, 'spec.addons[0]', toJS(storage.template))
      this.setState({ storageParams: get(storage, 'params', []) })
    }
  }

  render() {
    const { formRef, formTemplate } = this.props
    const { networkParams, storageParams } = this.state

    return (
      <div className={styles.wrapper}>
        <Title
          title={t('CLUSTER_SETTINGS')}
          description={t('K8S_CLUSTER_SETTINGS_DESC')}
        />
        <Form className={styles.form} data={formTemplate} ref={formRef}>
          <Form.Item label={t('KUBERNETES_VERSION')}>
            <TypeSelect
              name="spec.kubernetes.version"
              options={this.versions}
              defaultValue={get(this.versions, '0.value')}
            />
          </Form.Item>
          <Form.Item>
            <KubernetesParams name="spec.kubernetes" />
          </Form.Item>
          <Form.Item label={t('NETWORK_PLUGIN')}>
            <TypeSelect
              name="spec.network.plugin"
              options={this.networkPlugins}
              onChange={this.handleNetworkPluginChange}
            />
          </Form.Item>
          <Form.Item>
            <NetworkParams name="spec.network" params={networkParams} />
          </Form.Item>
          <Form.Item label={t('DEFAULT_STORAGE_PLUGIN')}>
            <TypeSelect
              name="spec.storagePlugin"
              options={this.storagePlugins}
              onChange={this.handleStoragePluginChange}
            />
          </Form.Item>
          <Form.Item>
            <StorageParams name="spec.addons[0]" params={storageParams} />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
