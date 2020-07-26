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
import { observer, inject } from 'mobx-react'
import { isEmpty } from 'lodash'

import { Icon } from '@pitrix/lego-ui'
import { Card } from 'components/Base'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class NotificationRules extends React.Component {
  get store() {
    return this.props.detailStore
  }

  get module() {
    return this.store.module
  }

  get params() {
    return this.props.match.params
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    this.store.fetchNotificationRule({
      addressListId: this.store.detail.addressListId,
      ...this.params,
    })
  }

  renderSendingRules() {
    const { availableStartTime, availableEndTime } = this.store.detail
    const { notifyType } = this.store.notification

    return (
      <Card
        className={styles.rules}
        title={t('Sending Rules')}
        loading={this.store.isLoading}
      >
        <div className={styles.item}>
          <Icon name="timed-task" size={24} />
          <div className={styles.details}>
            <strong>{t('SENT_RULE_TIME_TITLE')}</strong>
            <p>{`${availableStartTime} ${t('to')} ${availableEndTime}`}</p>
          </div>
        </div>
        <div className={styles.item}>
          <Icon name="loudspeaker" size={24} />
          <div className={styles.details}>
            <strong>{t('SENT_RULE_CHANNEL_TITLE')}</strong>
            <p>{t(notifyType)}</p>
          </div>
        </div>
      </Card>
    )
  }

  renderReceiver() {
    const { data, isLoading } = this.store.notification

    return (
      <Card
        title={t('Receiver')}
        loading={isLoading}
        isEmpty={isEmpty(data)}
        empty={t('NO_RESOURCE', { resource: t('receiver') })}
      >
        <div className={styles.receivers}>
          {data.map(item => (
            <div key={item.address_id} className={styles.item}>
              <img
                className={styles.avatar}
                src={item.avatar_url || '/assets/default-user.svg'}
                alt="avatar"
              />
              <div className={styles.details}>
                <strong>{item.username}</strong>
                <p>{item.address}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  render() {
    return (
      <div>
        {this.renderSendingRules()}
        {this.renderReceiver()}
      </div>
    )
  }
}
