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
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get, set } from 'lodash'

import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'

import { Form, Icon, Select } from '@kube-design/components'

import styles from './index.scss'

export default class RepeatRule extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
  }

  static defaultProps = {
    formTemplate: {},
  }

  get prefix() {
    return 'policy.policy_config'
  }

  get config() {
    return get(this.props.formTemplate, 'policy.policy_config') || {}
  }

  get repeatIntervalOptions() {
    return [
      {
        label: t('REPEAT_INTERVAL_NOT_REPEAT'),
        value: 0,
      },
      {
        label: t('REPEAT_INTERVAL_MINUTE', { num: 5 }),
        value: 5,
      },
      {
        label: t('REPEAT_INTERVAL_MINUTE', { num: 10 }),
        value: 10,
      },
      {
        label: t('REPEAT_INTERVAL_MINUTE', { num: 15 }),
        value: 15,
      },
      {
        label: t('REPEAT_INTERVAL_MINUTE', { num: 30 }),
        value: 30,
      },
      {
        label: t('REPEAT_INTERVAL_HOUR', { num: 1 }),
        value: 60,
      },
      {
        label: t('REPEAT_INTERVAL_HOUR', { num: 2 }),
        value: 120,
      },
      {
        label: t('REPEAT_INTERVAL_HOUR', { num: 3 }),
        value: 180,
      },
      {
        label: t('REPEAT_INTERVAL_HOUR', { num: 6 }),
        value: 360,
      },
      {
        label: t('REPEAT_INTERVAL_HOUR', { num: 12 }),
        value: 720,
      },
      {
        label: t('REPEAT_INTERVAL_DAY', { num: 1 }),
        value: 1440,
      },
      // {
      //   label: t('REPEAT_INTERVAL_EXP'),
      //   value: -1,
      // },
    ]
  }

  get maxSendOptions() {
    return [
      {
        label: t('MAX_SEND_NOT_LIMIT'),
        value: 2147483648,
      },
      {
        label: t('MAX_SEND_COUNT', { count: 1 }),
        value: 1,
      },
      {
        label: t('MAX_SEND_COUNT', { count: 3 }),
        value: 3,
      },
      {
        label: t('MAX_SEND_COUNT', { count: 5 }),
        value: 5,
      },
      {
        label: t('MAX_SEND_COUNT', { count: 7 }),
        value: 7,
      },
      {
        label: t('MAX_SEND_COUNT', { count: 10 }),
        value: 10,
      },
    ]
  }

  handleIntervalChange = type => value => {
    const { formTemplate } = this.props
    const prefix = `${this.prefix}[${type}]`

    set(this.props.formTemplate, `${prefix}.repeat_interval_initvalue`, value)

    if (value === 0) {
      set(formTemplate, `${prefix}.max_send_count`, 1)
    }

    if (value === -1) {
      set(formTemplate, `${prefix}.repeat_interval_initvalue`, 5)
    }

    // set repeat type
    const repeat_type =
      value === 0
        ? 'not-repeat'
        : value === -1
        ? 'exp-minutes'
        : 'fixed-minutes'
    set(formTemplate, `${prefix}.repeat_type`, repeat_type)

    this.forceUpdate()
  }

  handleMaxSendChange = type => value => {
    const prefix = `${this.prefix}[${type}]`

    set(this.props.formTemplate, `${prefix}.max_send_count`, value)

    this.forceUpdate()
  }

  render() {
    return (
      <Form.Group
        label={t('REPEAT_CUSTOM_TITLE')}
        desc={t('REPEAT_CUSTOM_DESC')}
        checkable
      >
        <div className={styles.content}>
          {SEVERITY_LEVEL.map(({ type, label, prefixIcon, color, value }) => {
            const intervalValue = get(
              this.config,
              `[${value}].repeat_interval_initvalue`
            )
            const maxSendValue = get(this.config, `[${value}].max_send_count`)

            return (
              <div key={type} className={styles.level}>
                <div className={classnames(styles.label, styles[type])}>
                  <Icon name={prefixIcon} size={20} color={color} />
                  {t(label)}
                </div>
                <Select
                  className={styles.select}
                  options={this.repeatIntervalOptions}
                  value={intervalValue}
                  onChange={this.handleIntervalChange(type)}
                />
                <Select
                  className={styles.select}
                  options={this.maxSendOptions}
                  value={maxSendValue}
                  onChange={this.handleMaxSendChange(type)}
                  disabled={!intervalValue}
                />
              </div>
            )
          })}
        </div>
      </Form.Group>
    )
  }
}
