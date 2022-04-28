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
import {
  Form,
  Input,
  Column,
  Columns,
  Checkbox,
  Select,
} from '@kube-design/components'

import { TypeSelect } from 'components/Base'
import {
  SYNC_STRATEGY,
  PRUNE_PROPAGATION_POLICY_OPTIONS,
} from 'utils/constants'
import { get, set } from 'lodash'
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

  get getReplace() {
    const { formTemplate } = this.props
    return get(formTemplate, 'syncOptions.Replace', false)
  }

  handleChange = value => {
    const { formTemplate } = this.props
    set(formTemplate, 'syncPolicy.type', value)
    this.forceUpdate()
  }

  handleReplace = value => {
    const { formTemplate } = this.props
    set(formTemplate, 'syncOptions.Replace', value)
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
                <Form.Item label={t('REVISION')} desc={t('REVISION_DESC')}>
                  <Input name="source.targetRevision" defaultValue="HEAD" />
                </Form.Item>
              </Column>
              <Column>
                <Form.Item
                  label={t('MANIFEST_FILE_PATH')}
                  desc={t('MANIFEST_FILE_PATH_DESC')}
                >
                  <Input name="source.path" defaultValue="." />
                </Form.Item>
              </Column>
            </Columns>
          </div>
        </div>
        <div className={styles.wrapper}>
          <h6>{t('SYNC_STRATEGY_TCAP')}</h6>
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
                    <Checkbox name="syncPolicy.prune">
                      {t('PRUNE_RESOURCES')}
                    </Checkbox>
                  </Form.Item>
                </div>

                <div className={styles.column}>
                  <Form.Item>
                    <Checkbox name="syncPolicy.selfHeal">
                      {t('SELF_HEAL')}
                    </Checkbox>
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
                    {t('SKIP_SCHEMA_VALIDATION')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.column}>
                <Form.Item>
                  <Checkbox name="syncOptions.CreateNamespace">
                    {t('AUTO_CREATE_PROJECT')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.column}>
                <Form.Item>
                  <Checkbox name="syncOptions.PruneLast">
                    {t('PRUNE_LAST')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.column}>
                <Form.Item>
                  <Checkbox name="syncOptions.ApplyOutOfSyncOnly">
                    {t('APPLY_OUT_OF_SYNC_ONLY')}
                  </Checkbox>
                </Form.Item>
              </div>
            </div>
            <Form.Item label={t('PRUNE_PROPAGATION_POLICY')}>
              <Select
                name="syncOptions.PrunePropagationPolicy"
                options={PRUNE_PROPAGATION_POLICY_OPTIONS}
              />
            </Form.Item>
            <Form.Item>
              <div className={styles.checkbox_item}>
                <Checkbox
                  name="syncOptions.Replace"
                  checked={this.getReplace}
                  onChange={this.handleReplace}
                ></Checkbox>
                <div className={styles.checkbox_item_info}>
                  <p>{t('REPLACE_RESOURCE')}</p>
                  <span>{t('REPLACE_RESOURCE_DESC')}</span>
                </div>
              </div>
            </Form.Item>
          </div>
        </div>
      </Form>
    )
  }
}
