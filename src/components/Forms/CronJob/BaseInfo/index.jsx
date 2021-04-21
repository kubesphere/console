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

import { get, set, debounce } from 'lodash'
import React from 'react'
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
import { MODULE_KIND_MAP, PATTERN_NAME } from 'utils/constants'

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
      { label: `0 * * * * (${t('Every Hour')})`, value: '0 * * * *' },
      { label: `0 0 * * * (${t('Every Day')})`, value: '0 0 * * *' },
      { label: `0 0 * * 0 (${t('Every Week')})`, value: '0 0 * * 0' },
      { label: `0 0 1 * * (${t('Every Month')})`, value: '0 0 1 * *' },
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
          return callback({ message: t('Name exists'), field: rule.field })
        }
        callback()
      })
  }

  getConcurrencyPolicyOptions = () => [
    { label: 'Allow', value: 'Allow' },
    { label: 'Forbid', value: 'Forbid' },
    { label: 'Replace', value: 'Replace' },
  ]

  render() {
    const { formRef } = this.props

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Columns>
          <Column>
            <Form.Item
              label={t('Name')}
              desc={t('CRONJOB_NAME_DESC')}
              rules={[
                { required: true, message: t('Please input name') },
                {
                  pattern: PATTERN_NAME,
                  message: t('Invalid name', {
                    message: t('CRONJOB_NAME_DESC'),
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
            <Form.Item label={t('Alias')} desc={t('ALIAS_DESC')}>
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
                label={t('Project')}
                desc={t('PROJECT_DESC')}
                rules={[
                  { required: true, message: t('Please select a project') },
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
              label={t('Schedule')}
              desc={t.html('CRONJOB_CRON_DESC')}
              rules={[
                { required: true, message: t('Please input a schedule.') },
              ]}
            >
              <Select
                name="spec.schedule"
                options={this.getCronOptions()}
                searchable
              />
            </Form.Item>
          </Column>
          <Column className="is-6">
            <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
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
                label={t('startingDeadlineSeconds(s)')}
                desc={t('START_DEADLINE_SECONDS_DESC')}
              >
                <NumberInput
                  min={0}
                  name="spec.startingDeadlineSeconds"
                  integer
                />
              </Form.Item>
              <Form.Item
                label={t('failedJobsHistoryLimit')}
                desc={t('The number of failed jobs allowed to be retained.')}
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
                label={t('successfulJobsHistoryLimit')}
                desc={t(
                  'The number of successful jobs allowed to be retained.'
                )}
              >
                <NumberInput
                  min={0}
                  name="spec.successfulJobsHistoryLimit"
                  integer
                />
              </Form.Item>
              <Form.Item
                label={t('concurrencyPolicy')}
                desc={t('The concurrency policy setting.')}
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
