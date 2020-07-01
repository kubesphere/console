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
import { observer } from 'mobx-react'
import { get, set } from 'lodash'

import { MODULE_KIND_MAP } from 'utils/constants'

import {
  Columns,
  Column,
  Checkbox,
  Input,
  Alert,
  DatePicker,
} from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import NotificationList from './NotificationList'
import RepeatRule from './RepeatRule'

import styles from './index.scss'

@observer
export default class NotificationRule extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notifyTypes: ['email'],
    }
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  getEffectiveTime = () => {
    const { available_start_time = '00:00', available_end_time = '23:59' } =
      get(this.formTemplate, 'policy') || {}
    const start_time = available_start_time.split(':')
    const end_time = available_end_time.split(':')

    return {
      start_time: this.getTime(start_time[0], start_time[1]),
      end_time: this.getTime(end_time[0], end_time[1]),
    }
  }

  getTime = (hours = 0, minutes = 0) => {
    const date = new Date()
    date.setHours(hours, minutes)
    return date.getTime()
  }

  getTimeStr = time => {
    const date = new Date(time)
    let hours = date.getHours()
    let minutes = date.getMinutes()

    if (hours < 10) {
      hours = `0${hours}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }

    return `${hours}:${minutes}:00`
  }

  handleStartTimeChange = ([time]) => {
    set(this.formTemplate, 'policy.available_start_time', this.getTimeStr(time))
  }

  handleEndTimeChange = ([time]) => {
    set(this.formTemplate, 'policy.available_end_time', this.getTimeStr(time))
  }

  renderNotificationMethod() {
    const { notifyTypes } = this.state
    const effectiveTime = this.getEffectiveTime()

    return (
      <div className={styles.method}>
        <Columns>
          <Column>
            <Form.Item
              label={t('NOTIFY_TIME_LABEL')}
              desc={t('NOTIFY_TIME_TIP')}
            >
              <div className={styles.timeRange}>
                <DatePicker
                  className={styles.time}
                  enableTime
                  noCalendar
                  dateFormat="H:i"
                  defaultValue={effectiveTime.start_time}
                  onChange={this.handleStartTimeChange}
                />
                <span>{t('To')}</span>
                <DatePicker
                  className={styles.time}
                  enableTime
                  noCalendar
                  dateFormat="H:i"
                  defaultValue={effectiveTime.end_time}
                  onChange={this.handleEndTimeChange}
                />
              </div>
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('Notification Channel')}>
              <Checkbox checked={notifyTypes.indexOf('email') !== -1} disabled>
                {t('Email')}
              </Checkbox>
            </Form.Item>
          </Column>
        </Columns>
      </div>
    )
  }

  renderNotificationList() {
    return (
      <NotificationList
        cluster={this.props.cluster}
        formTemplate={this.props.formTemplate}
        notifyTypes={this.state.notifyTypes}
      />
    )
  }

  renderWebhook() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h3>Webhook</h3>
        </div>
        <div className={styles.content}>
          <Columns>
            <Column>
              <Form.Item
                label={t('Url')}
                desc={t(
                  '填写公网可访问到的url作为回调接口地址(域名或IP[:端口][/path])，云监控将及时把告警信息推送到该地址'
                )}
              >
                <Input
                  name="url"
                  placeholder={t('http://console.kubesphere.com:8080/callback')}
                />
              </Form.Item>
            </Column>
            <Column />
          </Columns>
          <Alert
            type="warning"
            message={t(
              '回调域名通过验证后生效，请于Response Body中返回以下code。 ntixqhr8'
            )}
          />
        </div>
      </div>
    )
  }

  renderRepeatRule() {
    return <RepeatRule formTemplate={this.formTemplate} />
  }

  render() {
    const { formRef } = this.props

    return (
      <Form className={styles.form} ref={formRef}>
        {this.renderNotificationMethod()}
        {this.renderNotificationList()}
        {this.renderRepeatRule()}
      </Form>
    )
  }
}
