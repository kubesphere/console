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
import { generateId, gpuLimitsArr } from 'utils'

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
  constructor(props) {
    super(props)
    this.state = {
      originName: props.data.name,
    }
  }

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

      const isSkipTLS = Boolean(
        get(item, 'annotations["secret.kubesphere.io/force-insecure"]', false)
      )

      const auth = get(auths[url], 'auth')

      return {
        url,
        username,
        label: item.name,
        value: item.name,
        cluster,
        isSkipTLS,
        auth,
      }
    })
  }

  getGpuLimit() {
    return gpuLimitsArr(this.props.workspaceQuota)
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

  getFormTemplate(data) {
    if (data && data.image) {
      if (!data.pullSecret) {
        const annotationOfImagePullSecrets = data.annotationOfImagePullSecrets

        if (
          !isEmpty(data.annotationOfImagePullSecrets) &&
          annotationOfImagePullSecrets[data.name]
        ) {
          data.pullSecret = annotationOfImagePullSecrets[data.name]
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
    const { data, namespace, cluster } = this.props
    const imageRegistries = this.imageRegistries
    const formTemplate = this.getFormTemplate(data, imageRegistries)

    return (
      <ImageInput
        className={styles.imageSearch}
        name="image"
        namespace={namespace}
        formTemplate={formTemplate}
        imageRegistries={imageRegistries}
        cluster={cluster}
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

  duplicatedNameValidator = (rule, value, callback) => {
    const containerNames = this.props.containers
      .map(({ name }) => name)
      .filter(i => i !== this.state.originName)
    if (containerNames.includes(value)) {
      callback({ message: t('NAME_EXIST_DESC') })
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
                  {
                    validator: this.duplicatedNameValidator,
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
