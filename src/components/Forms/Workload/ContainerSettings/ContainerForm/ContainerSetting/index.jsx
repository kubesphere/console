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
import { get, isEmpty, omit } from 'lodash'
import { generateId, parseDockerImage, resourceLimitKey } from 'utils'

import { PATTERN_NAME } from 'utils/constants'

import {
  Form,
  Tag,
  Alert,
  Input,
  Select,
  Columns,
  Column,
} from '@kube-design/components'
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
      gpu: limitRange.gpu || {},
    }
  }

  get containerTypes() {
    return [
      { label: t('WORKER_CONTAINER'), value: 'worker' },
      { label: t('INIT_CONTAINER'), value: 'init' },
    ]
  }

  get imageRegistries() {
    const { imageRegistries = [] } = this.props
    return imageRegistries.map(item => {
      const auths = get(item, 'data[".dockerconfigjson"].auths', {})
      const url = Object.keys(auths)[0] || ''
      const username = get(auths[url], 'username')
      const cluster = item.isFedManaged
        ? get(item, 'clusters[0].name')
        : item.cluster

      return {
        url,
        username,
        label: item.name,
        value: item.name,
        cluster,
      }
    })
  }

  getGpuLimit() {
    const hard = this.props.workspaceQuota
    return !isEmpty(omit(hard, resourceLimitKey))
      ? {
          type: Object.keys(omit(hard, resourceLimitKey))[0]
            .split('.')
            .slice(1)
            .join('.'),
          value: Number(Object.values(omit(hard, resourceLimitKey))[0]),
        }
      : {
          type: '',
          value: '',
        }
  }

  get workspaceLimitProps() {
    const { workspaceQuota } = this.props
    return !isEmpty(workspaceQuota)
      ? {
          limits: {
            cpu: get(workspaceQuota, 'limits.cpu'),
            memory: get(workspaceQuota, 'limits.memory'),
          },
          requests: {
            cpu: get(workspaceQuota, 'requests.cpu'),
            memory: get(workspaceQuota, 'requests.memory'),
          },
          gpuLimit: this.getGpuLimit(),
        }
      : {}
  }

  limitError = ''

  getFormTemplate(data, imageRegistries) {
    if (data && data.image && !data.pullSecret) {
      const { registry } = parseDockerImage(data.image)
      if (registry) {
        const reg = imageRegistries.find(({ url }) => url.endsWith(registry))
        if (reg) {
          data.pullSecret = reg.value
        }
      }
    }
    return data
  }

  valueRenderer = option => (
    <Tag
      className={styles.type}
      type={option.value === 'init' ? 'warning' : 'default'}
    >
      {option.label}
    </Tag>
  )

  renderImageForm = () => {
    const { data, namespace } = this.props
    const imageRegistries = this.imageRegistries
    const formTemplate = this.getFormTemplate(data, imageRegistries)

    return (
      <ImageInput
        className={styles.imageSearch}
        name="image"
        namespace={namespace}
        formTemplate={formTemplate}
        imageRegistries={imageRegistries}
      />
    )
  }

  handleError = err => {
    this.limitError = err
  }

  limitValidator = (rule, value, callback) => {
    if (this.limitError !== '') {
      callback({ message: '' })
    }
    callback()
  }

  renderAdvancedSettings() {
    const {
      defaultContainerType,
      onContainerTypeChange,
      supportGpuSelect,
    } = this.props
    const defaultResourceLimit = this.defaultResourceLimit

    return (
      <ToggleView defaultShow={isEmpty(defaultResourceLimit)}>
        <>
          <Columns className={styles.columns}>
            <Column>
              <Form.Item
                label={t('CONTAINER_NAME')}
                desc={t('NAME_DESC')}
                rules={[
                  { required: true, message: t('NAME_EMPTY_DESC') },
                  {
                    pattern: PATTERN_NAME,
                    message: t('INVALID_NAME_DESC', {
                      message: t('NAME_DESC'),
                    }),
                  },
                ]}
              >
                <Input
                  name="name"
                  defaultValue={`container-${generateId()}`}
                  maxLength={63}
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('CONTAINER_TYPE')}>
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
          <Alert
            className="margin-b12"
            type="info"
            message={t('CONTAINER_RESOURCE_LIMIT_TIP')}
          />
          <Form.Item
            rules={[{ validator: this.limitValidator, checkOnSubmit: true }]}
          >
            <ResourceLimit
              name="resources"
              defaultValue={defaultResourceLimit}
              onError={this.handleError}
              workspaceLimitProps={this.workspaceLimitProps}
              supportGpuSelect={supportGpuSelect}
            />
          </Form.Item>
        </>
      </ToggleView>
    )
  }

  render() {
    const { className } = this.props
    return (
      <Form.Group
        className={className}
        label={t('CONTAINER_SETTINGS')}
        desc={t('CONTAINER_SETTINGS_DESC')}
        noWrapper
      >
        {this.renderImageForm()}
        {this.renderAdvancedSettings()}
      </Form.Group>
    )
  }
}
