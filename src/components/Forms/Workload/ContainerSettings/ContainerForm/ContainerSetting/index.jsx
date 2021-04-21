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
import { generateId, parseDockerImage } from 'utils'

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

  renderAdvancedSettings() {
    const { defaultContainerType, onContainerTypeChange } = this.props
    const defaultResourceLimit = this.defaultResourceLimit
    return (
      <ToggleView defaultShow={isEmpty(defaultResourceLimit)}>
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
                    message: t('Invalid name', { message: t('NAME_DESC') }),
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
          <Alert
            className="margin-b12"
            type="warning"
            message={t('CONTAINER_RESOURCE_LIMIT_TIP')}
          />
          <Form.Item>
            <ResourceLimit
              name="resources"
              defaultValue={defaultResourceLimit}
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
        label={t('Container Settings')}
        desc={t('Please set the container name and computing resources.')}
        noWrapper
      >
        {this.renderImageForm()}
        {this.renderAdvancedSettings()}
      </Form.Group>
    )
  }
}
