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
import { Form, Checkbox } from '@kube-design/components'

import { TypeSelect } from 'components/Base'
import { SYNC_STRATEGY } from 'utils/constants'
import { get, set } from 'lodash'

import styles from './index.scss'

export default class SyncSetting extends React.Component {
  get syncPolicyTypeOptions() {
    return [
      {
        title: 'PRUNE_RESOURCES',
        desc: 'PRUNE_RESOURCES_DESC',
        name: 'syncPolicy.prune',
      },
      {
        title: 'SELF_HEAL',
        desc: 'SELF_HEAL_DESC',
        name: 'syncPolicy.selfHeal',
      },
    ]
  }

  get syncOptionsOptions() {
    return [
      {
        title: 'SKIP_SCHEMA_VALIDATION',
        desc: 'SKIP_SCHEMA_VALIDATION_DESC',
        name: 'syncOptions.Validate',
      },
      {
        title: 'AUTO_CREATE_PROJECT',
        desc: 'AUTO_CREATE_PROJECT_DESC',
        name: 'syncOptions.CreateNamespace',
      },
      {
        title: 'PRUNE_LAST',
        desc: 'PRUNE_LAST_DESC',
        name: 'syncOptions.PruneLast',
      },
      {
        title: 'APPLY_OUT_OF_SYNC_ONLY',
        desc: 'APPLY_OUT_OF_SYNC_ONLY_DESC',
        name: 'syncOptions.ApplyOutOfSyncOnly',
      },
    ]
  }

  get prunePropagationPolicyOptions() {
    return [
      {
        label: 'foreground',
        value: 'foreground',
        description: t('FOREGROUND_DESC'),
      },
      {
        label: 'background',
        value: 'background',
        description: t('BACKGROUND_DESC'),
      },
      {
        label: 'orphan',
        value: 'orphan',
        description: t('ORPHAN_DESC'),
      },
    ]
  }

  get syncPolicyType() {
    const { formTemplate } = this.props
    return formTemplate?.syncPolicy?.type ?? 'manual'
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

  handleCheckboxChange = key => value => {
    const { formTemplate } = this.props
    set(formTemplate, key, value)
    this.forceUpdate()
  }

  handleChange = value => {
    const { formTemplate } = this.props
    set(formTemplate, 'syncPolicy.type', value)
    this.forceUpdate()
  }

  handlePruneChange = value => {
    const { formTemplate } = this.props
    set(formTemplate, 'syncOptions.PrunePropagationPolicy', value)
    this.forceUpdate()
  }

  handleReplace = value => {
    const { formTemplate } = this.props
    set(formTemplate, 'syncOptions.Replace', value)
    this.forceUpdate()
  }

  renderCheckboxItem = props => {
    const { title, desc, name, displayTitle, displayDesc, ...rest } = props
    return (
      <Form.Item key={name}>
        <div className={styles.checkbox_item}>
          <Checkbox
            name={name}
            checked={get(this.props.formTemplate, name, false)}
            onChange={this.handleCheckboxChange(name)}
            {...rest}
          ></Checkbox>
          <div className={styles.checkbox_item_info}>
            <p>{displayTitle ?? t(title)}</p>
            <span>{displayDesc ?? t(desc)}</span>
          </div>
        </div>
      </Form.Item>
    )
  }

  render() {
    const { formRef, formTemplate } = this.props
    // TODO: v3.4 PARAMETER SETTINGS
    return (
      <Form data={formTemplate} ref={formRef}>
        <div className={styles.wrapper}>
          <h6>{t('SYNC_STRATEGY_TCAP')}</h6>
          <div className={styles.wrapper_item}>
            <div className={styles.wrapper_item_com}>
              <Form.Item>
                <TypeSelect
                  name="syncPolicy.type"
                  defaultValue="manual"
                  options={this.syncOptions}
                  onChange={this.handleChange}
                />
              </Form.Item>
            </div>
            {this.syncPolicyType === 'automated' && (
              <div className={styles.columns}>
                {this.syncPolicyTypeOptions.map(this.renderCheckboxItem)}
              </div>
            )}
          </div>
        </div>
        <div className={styles.wrapper}>
          <h6>{t('SYNC_SETTINGS')}</h6>
          <div className={styles.wrapper_item}>
            <div className={`${styles.columns} ${styles.wrapper_item_com}`}>
              {this.syncOptionsOptions.map(this.renderCheckboxItem)}
            </div>
            <Form.Item label={t('PRUNE_PROPAGATION_POLICY')}>
              <TypeSelect
                name="syncOptions.PrunePropagationPolicy"
                defaultValue="foreground"
                options={this.prunePropagationPolicyOptions}
                onChange={this.handlePruneChange}
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
