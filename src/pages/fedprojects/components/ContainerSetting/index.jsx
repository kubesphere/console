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
import { generateId, gpuLimitsArr } from 'utils'

import { PATTERN_NAME } from 'utils/constants'

import {
  Form,
  Alert,
  Input,
  Select,
  Columns,
  Column,
} from '@kube-design/components'
import { isEmpty, get } from 'lodash'
import { ResourceLimit } from 'components/Inputs'
import ToggleView from 'components/ToggleView'

import Base from 'components/Forms/Workload/ContainerSettings/ContainerForm/ContainerSetting'
import styles from './index.scss'

export default class ContainerSetting extends Base {
  get defaultResourceLimit() {
    const { limitRanges = {} } = this.props

    if (!limitRanges.limits && !limitRanges.requests) {
      return undefined
    }

    return {
      requests: limitRanges.requests || {},
      limits: limitRanges.limits || {},
    }
  }

  getGpuLimit() {
    return gpuLimitsArr(this.workspaceQuota)
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

  renderAdvancedSettings() {
    const { defaultContainerType, onContainerTypeChange, isEdit } = this.props
    const defaultResourceLimit = this.defaultResourceLimit

    return (
      <ToggleView defaultShow>
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
              isEdit={isEdit}
              supportGpuSelect={true}
              workspaceLimitProps={this.workspaceLimitProps}
            />
          </Form.Item>
        </>
      </ToggleView>
    )
  }
}
