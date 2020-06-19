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

import { getLocalTime } from 'utils'

import { Card } from 'components/Base'

import styles from './index.scss'

class NotificationRules extends React.Component {
  get module() {
    return this.props.module
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get params() {
    return this.props.match.params
  }

  get store() {
    return this.props.detailStore
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    this.store.fetchComments(this.params)
  }

  render() {
    const { data, isLoading } = this.store.comments

    return (
      <Card
        title={t('ALERT_COMMENT')}
        loading={isLoading}
        isEmpty={isEmpty(data)}
        empty={t('No Relevant Data')}
      >
        <div className={styles.main}>
          {data.map(item => (
            <div key={item.comment_id} className={styles.item}>
              <div className={styles.info}>
                <img
                  className={styles.avatar}
                  src={item.avatar_url || '/assets/default-user.svg'}
                  alt="avatar"
                />
                <div className={styles.desc}>
                  <strong>{`${t('Email')}: ${item.addresser || '-'}`}</strong>
                  <p>
                    <span>
                      {`${t('Time')}: ${getLocalTime(item.createTime).format(
                        `YYYY-MM-DD HH:mm:ss`
                      )}`}
                    </span>
                  </p>
                </div>
              </div>
              <div className={styles.record}>
                <label>{t('ALERT_COMMENT')}:</label>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }
}

export default inject('rootStore', 'detailStore')(observer(NotificationRules))
export const Component = NotificationRules
