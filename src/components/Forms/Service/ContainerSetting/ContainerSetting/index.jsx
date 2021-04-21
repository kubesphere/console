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
import { get, isEmpty } from 'lodash'
import { toJS } from 'mobx'
import { generateId, cpuFormat, memoryFormat } from 'utils'

import { PATTERN_NAME } from 'utils/constants'

import { Input, Form, Alert } from '@kube-design/components'
import { ResourceLimit } from 'components/Inputs'
import ToggleView from 'components/ToggleView'

import QuotaStore from 'stores/quota'
import ProjectStore from 'stores/project'
import SecretStore from 'stores/secret'

import styles from './index.scss'

export default class ContainerSetting extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quota: {},
      limitRange: {},
      imageRegistries: [],
    }

    this.quotaStore = new QuotaStore()
    this.projectStore = new ProjectStore()
    this.secretStore = new SecretStore()
  }

  static defaultProps = {
    prefix: '',
  }

  get prefix() {
    const { prefix } = this.props

    return prefix ? `${prefix}.` : ''
  }

  get defaultResourceLimit() {
    const { limitRange = {} } = this.state

    if (!limitRange.defaultRequest && !limitRange.default) {
      return undefined
    }

    return {
      requests: limitRange.defaultRequest || {},
      limits: limitRange.default || {},
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const { cluster, namespace } = this.props

    Promise.all([
      this.quotaStore.fetch({ cluster, namespace }),
      this.projectStore.fetchLimitRanges({ cluster, namespace }),
      this.secretStore.fetchListByK8s({
        cluster,
        namespace,
        fieldSelector: `type=kubernetes.io/dockerconfigjson`,
      }),
    ]).then(() => {
      this.setState({
        quota: this.quotaStore.data,
        limitRange: get(toJS(this.projectStore.limitRanges), 'data[0].limit'),
        imageRegistries: this.secretStore.list.data,
      })
    })
  }

  get imageRegistries() {
    return this.state.imageRegistries.map(item => {
      const auths = get(item, 'data[".dockerconfigjson"].auths', {})
      const url = Object.keys(auths)[0] || ''
      const username = get(auths[url], 'username')

      return {
        url,
        username,
        label: item.name,
        value: item.name,
      }
    })
  }

  renderAdvancedSettings() {
    const { quota } = this.state

    const cpuRequestLeft = get(quota, 'left["requests.cpu"]')
    const memoryRequestLeft = get(quota, 'left["requests.memory"]')
    const cpuLimitLeft = get(quota, 'left["limits.cpu"]')
    const memoryLimitLeft = get(quota, 'left["limits.memory"]')

    const message = (
      <div className={styles.message}>
        {t('Remaining Quota')}:&nbsp;&nbsp;&nbsp;&nbsp;[{t('Resource Request')}:
        CPU{' '}
        {cpuRequestLeft ? `${cpuFormat(cpuRequestLeft)} Core` : t('No Limit')},{' '}
        {t('Memory')}{' '}
        {memoryRequestLeft
          ? `${memoryFormat(memoryRequestLeft)} Mi`
          : t('No Limit')}
        ]&nbsp;&nbsp;&nbsp;&nbsp;[{t('Resource Limit')}: CPU{' '}
        {cpuLimitLeft ? `${cpuFormat(cpuLimitLeft)} Core` : t('No Limit')},{' '}
        {t('Memory')}{' '}
        {memoryLimitLeft
          ? `${memoryFormat(memoryLimitLeft)} Mi`
          : t('No Limit')}
        ]
      </div>
    )

    const defaultResourceLimit = this.defaultResourceLimit

    return (
      <ToggleView defaultShow={isEmpty(defaultResourceLimit)}>
        <>
          <Alert
            className="margin-b12"
            type="warning"
            message={t('CONTAINER_RESOURCE_LIMIT_TIP')}
          />
          <Form.Item>
            <ResourceLimit
              name={`${this.prefix}resources`}
              defaultValue={defaultResourceLimit}
            />
          </Form.Item>
          {message}
        </>
      </ToggleView>
    )
  }

  render() {
    return (
      <Form.Group
        label={t('Container Settings')}
        desc={t('Please set the container name and computing resources.')}
        noWrapper
      >
        <Form.Item
          className="margin-t12"
          label={t('Container Name')}
          desc={t('NAME_DESC')}
          rules={[
            { required: true, message: t('Please input name') },
            {
              pattern: PATTERN_NAME,
              message: t('Invalid name', { message: t('NAME_DESC') }),
            },
          ]}
        >
          <Input
            name={`${this.prefix}name`}
            defaultValue={`container-${generateId()}`}
            maxLength={63}
          />
        </Form.Item>
        {this.renderAdvancedSettings()}
      </Form.Group>
    )
  }
}
