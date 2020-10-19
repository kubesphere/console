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
import { Button, Level, LevelRight, LevelItem } from '@kube-design/components'
import Table from 'components/Tables/Base'
import FilterInput from 'components/Tables/Base/FilterInput'

import styles from 'components/Tables/Base/index.scss'

export default class CICDTable extends Table {
  constructor(props) {
    super(props)
    this.refreshTimer = setInterval(this.refreshHandler, 4000)
  }

  componentDidUpdate() {
    clearInterval(this.refreshTimer)
    this.refreshTimer = setInterval(this.refreshHandler, 4000)
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer)
  }

  refreshHandler = () => {
    const { data } = this.props

    const hasRuning = data.some(
      item => item.state && item.state !== 'FINISHED' && item.state !== 'PAUSED'
    )
    if (hasRuning) {
      this.props.onFetch()
    } else {
      clearInterval(this.refreshTimer)
    }
  }

  renderActions() {
    const { onCreate, actions } = this.props

    if (actions) {
      return actions.map(action => (
        <Button
          key={action.key}
          type={action.type}
          className={styles.create}
          onClick={action.onClick}
        >
          {action.text}
        </Button>
      ))
    }

    if (!onCreate) {
      return null
    }

    return (
      <Button type="control" className={styles.create} onClick={onCreate}>
        {t('Create')}
      </Button>
    )
  }

  renderNormalTitle = () => (
    <Level>
      <LevelItem>
        {this.props.disableSearch ? null : (
          <FilterInput
            placeholder={t('Enter query conditions to filter')}
            tags={this.tags}
            suggestions={this.suggestions}
            onChange={this.handleFilterInput}
          />
        )}
      </LevelItem>
      <LevelRight>
        <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
        {this.renderActions()}
      </LevelRight>
    </Level>
  )
}
