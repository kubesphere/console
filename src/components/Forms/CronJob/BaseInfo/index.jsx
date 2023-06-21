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

import {
  Column,
  Columns,
  Form,
  Input,
  Select,
  TextArea,
} from '@kube-design/components'
import { NumberInput, ProjectSelect } from 'components/Inputs'
import ToggleView from 'components/ToggleView'
import { debounce, get, set } from 'lodash'
import React from 'react'
import {
  MODULE_KIND_MAP,
  PATTERN_ALIAS_NAME,
  PATTERN_NAME,
} from 'utils/constants'

export default class BaseInfo extends React.Component {
  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  getCronOptions() {
    return [
      { label: t('EVERY_HOUR'), value: '0 * * * *' },
      { label: t('EVERY_DAY'), value: '0 0 * * *' },
      { label: t('EVERY_WEEK'), value: '0 0 * * 0' },
      { label: t('EVERY_MONTH'), value: '0 0 1 * *' },
    ]
  }

  handleNameChange = debounce(value => {
    const labels = get(this.formTemplate, 'metadata.labels', {})
    labels.app = value.slice(0, 63)

    set(this.formTemplate, 'spec.jobTemplate.metadata.labels', labels)
  }, 200)

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.props.store
      .checkName({
        name: value,
        namespace: this.namespace,
        cluster: this.props.cluster,
      })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('NAME_EXIST_DESC'), field: rule.field })
        }
        callback()
      })
  }

  getConcurrencyPolicyOptions = () => [
    { label: t('RUN_JOBS_CONCURRENTLY'), value: 'Allow' },
    { label: t('SKIP_NEW_JOB'), value: 'Forbid' },
    { label: t('SKIP_OLD_JOB'), value: 'Replace' },
  ]

  render() {
    const { formRef } = this.props

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Columns>
          <Column>
            <Form.Item
              label={t('NAME')}
              desc={t('NAME_DESC')}
              rules={[
                { required: true, message: t('NAME_EMPTY_DESC') },
                {
                  pattern: PATTERN_NAME,
                  message: t('INVALID_NAME_DESC', {
                    message: t('NAME_DESC'),
                  }),
                },
                { validator: this.nameValidator },
              ]}
            >
              <Input
                name="metadata.name"
                onChange={this.handleNameChange}
                autoFocus={true}
                maxLength={52}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('ALIAS')}
              desc={t('ALIAS_NAME_DESC')}
              rules={[
                {
                  pattern: PATTERN_ALIAS_NAME,
                  message: t('INVALID_ALIAS_NAME_DESC'),
                },
              ]}
            >
              <Input
                name="metadata.annotations['kubesphere.io/alias-name']"
                maxLength={63}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Columns className="is-multiline">
          {!this.props.namespace && (
            <Column className="is-6">
              <Form.Item
                label={t('PROJECT')}
                desc={t('PROJECT_DESC')}
                rules={[
                  { required: true, message: t('PROJECT_NOT_SELECT_DESC') },
                ]}
              >
                <ProjectSelect
                  name="metadata.namespace"
                  cluster={this.props.cluster}
                  defaultValue={this.namespace}
                />
              </Form.Item>
            </Column>
          )}
          <Column className="is-6">
            <Form.Item
              label={t('SCHEDULE')}
              desc={t.html('CRONJOB_CRON_DESC')}
              rules={[{ required: true, message: t('ENTER_SCHEDULE_TIP') }]}
            >
              <Select
                name="spec.schedule"
                options={this.getCronOptions()}
                searchable
                placeholder=" "
              />
            </Form.Item>
          </Column>
          <Column className="is-6">
            <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
              <TextArea
                name="metadata.annotations['kubesphere.io/description']"
                maxLength={256}
              />
            </Form.Item>
          </Column>
        </Columns>

        <ToggleView>
          <Columns className="margin-t8">
            <Column>
              <Form.Item
                label={t('MAXIMUM_DELAY')}
                desc={t('MAXIMUM_DELAY_DESC')}
              >
                <NumberInput
                  min={0}
                  name="spec.startingDeadlineSeconds"
                  integer
                />
              </Form.Item>
              <Form.Item
                label={t('FAILED_JOBS_RETAINED')}
                desc={t('FAILED_JOBS_RETAINED_DESC')}
              >
                <NumberInput
                  min={0}
                  name="spec.failedJobsHistoryLimit"
                  integer
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item
                label={t('SUCCESSFUL_JOBS_RETAINED')}
                desc={t('SUCCESSFUL_JOBS_RETAINED_DESC')}
              >
                <NumberInput
                  min={0}
                  name="spec.successfulJobsHistoryLimit"
                  integer
                />
              </Form.Item>
              <Form.Item
                label={t('CONCURRENCY_POLICY')}
                desc={t('CONCURRENCY_POLICY_DESC')}
              >
                <Select
                  name="spec.concurrencyPolicy"
                  options={this.getConcurrencyPolicyOptions()}
                />
              </Form.Item>
            </Column>
          </Columns>
        </ToggleView>
      </Form>
    )
  }
}
