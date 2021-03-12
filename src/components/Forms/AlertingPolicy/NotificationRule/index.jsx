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
import { get, isEmpty, set } from 'lodash'

import { Form, Input, TextArea } from '@kube-design/components'

import { ALL_METRICS_CONFIG } from 'configs/alerting/metrics'

import styles from './index.scss'

export default class NotificationRule extends React.Component {
  constructor(props) {
    super(props)

    const { formTemplate } = this.props
    const { kind = 'Node', resources, rules } = formTemplate
    if (!isEmpty(resources) && !isEmpty(rules)) {
      const summary = `${t(kind)} ${resources.join(', ')} ${rules
        .map(item => {
          const { _metricType, condition_type, thresholds, unit } = item || {}
          const metricConfig = get(ALL_METRICS_CONFIG, _metricType) || {}
          return `${t(
            metricConfig.label
          )} ${condition_type} ${thresholds}${unit}`
        })
        .join(` ${t('or')} `)}`

      set(formTemplate, 'annotations.summary', summary)
    }
  }

  render() {
    const { formRef, formTemplate } = this.props

    return (
      <Form className={styles.wrapper} data={formTemplate} ref={formRef}>
        <div className={styles.title}>{t('Notification Content')}</div>
        <div className={styles.content}>
          <div className={styles.contentWrapper}>
            <Form.Item label={t('Summary')}>
              <Input name="annotations.summary" maxLength={253} />
            </Form.Item>
            <Form.Item label={t('Message')}>
              <TextArea name="annotations.message" rows={8} />
            </Form.Item>
          </div>
        </div>
      </Form>
    )
  }
}
