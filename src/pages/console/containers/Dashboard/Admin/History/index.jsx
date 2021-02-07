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

import React, { Component } from 'react'
import { isEmpty, isArray } from 'lodash'
import classNames from 'classnames'

import { Text } from 'components/Base'

import { safeParseJSON } from 'utils'

import Card from './Card'

import styles from './index.scss'

export default class History extends Component {
  get histories() {
    const caches = safeParseJSON(localStorage.getItem('history-cache'), {})
    return caches[globals.user.username] || []
  }

  render() {
    const { className } = this.props
    const histories = this.histories

    if (isEmpty(histories) || !isArray(histories)) {
      return (
        <div className={styles.empty}>
          <Text
            title={t('NO_HISTORY_TITLE')}
            description={t('NO_HISTORY_DESC')}
          />
        </div>
      )
    }

    return (
      <div className={classNames(styles.histories, className)}>
        {histories.map(item => (
          <Card key={item.url} data={item} />
        ))}
      </div>
    )
  }
}
