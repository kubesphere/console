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
import { Form, Input, Column, Columns, Checkbox } from '@kube-design/components'

import { TypeSelect } from 'components/Base'
import { SYNC_STRATEGY } from 'utils/constants'
import { set } from 'lodash'
import Placement from './Placement'
import styles from './index.scss'

export default class Advance extends React.Component {
  get syncPolicyType() {
    const { formTemplate } = this.props
    return formTemplate?.syncPolicy?.type ?? 'automated'
  }

  get syncOptions() {
    return SYNC_STRATEGY.map(({ label, value, description }) => ({
      label: t(label),
      description: t(description),
      icon: 'timed-task',
      value,
    }))
  }

  handleChange = value => {
    const { formTemplate } = this.props
    set(formTemplate, 'syncPolicy.type', value)
    this.forceUpdate()
  }

  render() {
    const { formRef, formTemplate } = this.props

    return (
      <Form data={formTemplate} ref={formRef}>
        <div className={styles.wrapper}>
          <h6>{t('DEPLOY_LOCATION')}</h6>
          <div className={styles.wrapper_item}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: t('PROJECT_NOT_SELECT_DESC'),
                },
              ]}
            >
              <Placement
                name="destination"
                prefix="destination"
                formData={formTemplate}
                {...this.props}
              />
            </Form.Item>
          </div>
        </div>
        <div className={styles.wrapper}>
          <h6>{t('CODE_REPOSITORY_SETTINGS')}</h6>
          <div className={styles.wrapper_item}>
            <Columns>
              <Column>
                <Form.Item label={t('Revision')} desc={t('REVISE_DESC')}>
                  <Input name="source.targetRevision" defaultValue="Header" />
                </Form.Item>
              </Column>
              <Column>
                <Form.Item
                  label={t('RESOURCE_FILE_PATH')}
                  desc={t('SET_THE_RESOURCE_FILE_PATH')}
                >
                  <Input name="source.path" defaultValue="" />
                </Form.Item>
              </Column>
            </Columns>
          </div>
        </div>
        <div className={styles.wrapper}>
          <h6>{t('SYNC_STRATEGY')}</h6>
          <div className={styles.wrapper_item}>
            <div className={styles.wrapper_item_com}>
              <Form.Item>
                <TypeSelect
                  name="syncPolicy.type"
                  defaultValue="automated"
                  options={this.syncOptions}
                  onChange={this.handleChange}
                />
              </Form.Item>
            </div>
            {this.syncPolicyType === 'automated' && (
              <div className={styles.columns}>
                <div className={styles.column}>
                  <Form.Item>
                    <Checkbox name="syncPolicy.prune">Prune Resources</Checkbox>
                  </Form.Item>
                </div>

                <div className={styles.column}>
                  <Form.Item>
                    <Checkbox name="syncPolicy.selfHeal">Self Heal</Checkbox>
                  </Form.Item>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.wrapper}>
          <h6>{t('SYNC_SETTINGS')}</h6>
          <div className={styles.wrapper_item}>
            <div className={`${styles.columns} ${styles.wrapper_item_com}`}>
              <div className={styles.column}>
                <Form.Item>
                  <Checkbox name="syncOptions.Validate">
                    Skip Schema Validation
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.column}>
                <Form.Item>
                  <Checkbox name="syncOptions.CreateNamespace">
                    Auto-Create Namespace
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.column}>
                <Form.Item>
                  <Checkbox name="syncOptions.PruneLast">Prune Last</Checkbox>
                </Form.Item>
              </div>
              <div className={styles.column}>
                <Form.Item>
                  <Checkbox name="syncOptions.ApplyOutOfSyncOnly">
                    Apply Out Of Sync Only
                  </Checkbox>
                </Form.Item>
              </div>
            </div>
            <Form.Item label={t('Prune Propagation Policy')}>
              <Input name="syncOptions.PrunePropagationPolicy" />
            </Form.Item>
            <Form.Item>
              <div className={styles.checkbox_item}>
                <Checkbox name="syncOptions.Replace"></Checkbox>
                <div className={styles.checkbox_item_info}>
                  <p>{t('ABANDON_KUBECTL_APPLY')}</p>
                  <span>{t('ABANDON_KUBECTL_APPLY_DESC')}</span>
                </div>
              </div>
            </Form.Item>
          </div>
        </div>
      </Form>
    )
  }
}
