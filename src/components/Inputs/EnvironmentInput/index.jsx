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
import PropTypes from 'prop-types'

import { Button } from '@kube-design/components'

import ConfigMapStore from 'stores/configmap'
import SecretStore from 'stores/secret'
import FederatedStore from 'stores/federated'
import { get, isEmpty } from 'lodash'
import { trigger } from 'utils/action'

import Item from './Item'
import ArrayInput from '../ArrayInput'
import styles from './index.scss'

@trigger
export default class EnvironmentInput extends React.Component {
  constructor(props) {
    super(props)
    this.configMapStore = new ConfigMapStore()
    this.secretStore = new SecretStore()

    if (props.isFederated) {
      this.configMapStore = new FederatedStore({
        module: this.configMapStore.module,
      })
      this.secretStore = new FederatedStore({
        module: this.secretStore.module,
      })
    }

    this.state = { configMaps: [], secrets: [] }
  }

  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    onChange() {},
  }

  componentDidMount() {
    this.handleGetResource()
  }

  handleGetResource = () => {
    const { namespace, cluster } = this.props
    const params = { namespace, cluster }

    Promise.all([
      this.configMapStore.fetchListByK8s(params),
      this.secretStore.fetchListByK8s(params),
    ]).then(([configMaps, secrets]) => {
      this.setState({
        configMaps,
        secrets,
      })
    })
  }

  handleAddRef = () => {
    this.handleGetResource()
    const { value, onChange } = this.props
    if (isEmpty(value)) {
      return onChange([{ name: '', valueFrom: {} }])
    }

    if (value.length === 1 && value[0].name === '' && value[0].value === '') {
      return onChange([{ name: '', valueFrom: {} }])
    }

    if (value.every(this.checkItemValid)) {
      return onChange([...value, { name: '', valueFrom: {} }])
    }
  }

  handleResourceData = (data, type) => {
    const { value, onChange } = this.props
    const resourceType =
      type === 'configmaps' ? 'configMapKeyRef' : 'secretKeyRef'

    const resourceName = get(data, 'metadata.name')
    const subResource = get(data, 'data')
    const key = !isEmpty(subResource) ? Object.keys(get(data, 'data'))[0] : ''

    const newValue = { name: key, valueFrom: {} }

    newValue.valueFrom[resourceType] = {
      name: resourceName,
      key,
    }

    if (Array.isArray(value)) {
      value.push(newValue)
      onChange([...value])
    } else {
      onChange([{ ...newValue }])
    }
  }

  handleCreateSecrets = () => {
    const { namespace, cluster, isFederated, projectDetail } = this.props

    this.trigger('secret.create', {
      module: 'secrets',
      namespace,
      cluster,
      isFederated,
      projectDetail,
      store: this.secretStore,
      success: async data => {
        const secrets = await this.secretStore.fetchListByK8s({
          namespace,
          cluster,
        })
        this.setState(
          {
            secrets,
          },
          () => {
            this.handleResourceData(data, 'secrets')
          }
        )
      },
    })
  }

  handleCreateConfig = () => {
    const { namespace, cluster, isFederated, projectDetail } = this.props

    this.trigger('configmap.create', {
      module: 'configmaps',
      namespace,
      cluster,
      isFederated,
      projectDetail,
      store: this.configMapStore,
      success: async data => {
        const configMaps = await this.configMapStore.fetchListByK8s({
          namespace,
          cluster,
        })
        this.setState(
          {
            configMaps,
          },
          () => {
            this.handleResourceData(data, 'configmaps')
          }
        )
      },
    })
  }

  checkItemValid = item =>
    !isEmpty(item) &&
    !isEmpty(item.name) &&
    (!isEmpty(item.value) || !isEmpty(item.valueFrom))

  render() {
    const { ...rest } = this.props
    const { configMaps, secrets } = this.state

    return (
      <ArrayInput
        className={styles.wrapper}
        itemType="object"
        checkItemValid={this.checkItemValid}
        addText={t('ADD_ENVIRONMENT_VARIABLE')}
        extraAdd={
          <>
            <span className={styles.desc}>
              {t.html('DESC_CREATE_CONFIGMAP_SECRET')}
              <a onClick={this.handleCreateConfig}>{t('CREATE_CONFIG')}</a>
              {t('or')}
              <a onClick={this.handleCreateSecrets}>{t('CREATE_SECRET')}</a>
            </span>
            <Button
              className={styles.extraBtn}
              onClick={this.handleAddRef}
              data-test="add-env-configmap"
            >
              {t('USE_CONFIGMAP_OR_SECRET')}
            </Button>
          </>
        }
        {...rest}
      >
        <Item configMaps={configMaps} secrets={secrets} />
      </ArrayInput>
    )
  }
}
