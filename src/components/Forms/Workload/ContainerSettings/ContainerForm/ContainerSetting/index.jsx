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
import { get } from 'lodash'
import { generateId, cpuFormat, memoryFormat } from 'utils'

import { PATTERN_NAME, PATTERN_LENGTH_63 } from 'utils/constants'

import { Input, Select, Columns, Column } from '@pitrix/lego-ui'
import { Form, Tag } from 'components/Base'
import { ResourceLimit } from 'components/Inputs'
import ToggleView from 'components/ToggleView'

import ImageInput from './ImageInput'

import styles from './index.scss'

export default class ContainerSetting extends React.Component {
  get defaultResourceLimit() {
    const { limitRange = {} } = this.props

    if (!limitRange.defaultRequest && !limitRange.default) {
      return undefined
    }

    return {
      requests: limitRange.defaultRequest || {},
      limits: limitRange.default || {},
    }
  }

  get containerTypes() {
    return [
      { label: t('Worker Container'), value: 'worker' },
      { label: t('Init Container'), value: 'init' },
    ]
  }

  get imageRegistries() {
    return this.props.imageRegistries.map(item => {
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

  valueRenderer = option => (
    <Tag type={option.value === 'init' ? 'warning' : 'default'}>
      {option.label}
    </Tag>
  )

  renderImageForm = () => {
    const { data, cluster, namespace } = this.props
    return (
      <ImageInput
        name="image"
        cluster={cluster}
        namespace={namespace}
        className={styles.imageSearch}
        formTemplate={data}
        imageRegistries={this.imageRegistries}
      />
    )
  }

  renderAdvancedSettings() {
    const { defaultContainerType, onContainerTypeChange, quota } = this.props

    const cpuRequestLeft = get(quota, 'left["requests.cpu"]')
    const memoryRequestLeft = get(quota, 'left["requests.memory"]')
    const cpuLimitLeft = get(quota, 'left["limits.cpu"]')
    const memoryLimitLeft = get(quota, 'left["limits.memory"]')

    const message = (
      <div className={styles.message}>
        {t('Left Quota')}:&nbsp;&nbsp;&nbsp;&nbsp;[{t('Resource Request')}: CPU{' '}
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

    return (
      <ToggleView>
        <>
          <Columns className={styles.columns}>
            <Column>
              <Form.Item
                label={t('Container Name')}
                desc={t('NAME_DESC')}
                rules={[
                  { required: true, message: t('Please input name') },
                  {
                    pattern: PATTERN_NAME,
                    message: `${t('Invalid name')}, ${t('NAME_DESC')}`,
                  },
                  {
                    pattern: PATTERN_LENGTH_63,
                    message: t('NAME_TOO_LONG'),
                  },
                ]}
              >
                <Input name="name" defaultValue={`container-${generateId()}`} />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('Container Type')}>
                <Select
                  name="type"
                  defaultValue={defaultContainerType}
                  options={this.containerTypes}
                  onChange={onContainerTypeChange}
                  valueRenderer={this.valueRenderer}
                />
              </Form.Item>
            </Column>
          </Columns>
          <Form.Item>
            <ResourceLimit
              name="resources"
              defaultValue={this.defaultResourceLimit}
            />
          </Form.Item>
          {message}
        </>
      </ToggleView>
    )
  }

  render() {
    const { className } = this.props
    return (
      <Form.Group
        className={className}
        label={t('Container Settings')}
        desc={t(
          'Setting for the name of the container and the computing resources of the container'
        )}
        noWrapper
      >
        {this.renderImageForm()}
        {this.renderAdvancedSettings()}
      </Form.Group>
    )
  }
}
