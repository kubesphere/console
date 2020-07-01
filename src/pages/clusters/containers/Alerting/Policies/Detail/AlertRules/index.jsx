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

import { Card } from 'components/Base'
import RuleItem from './item'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class AlertRules extends React.Component {
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
    this.store.fetchRules({
      limit: Infinity,
      ...this.params,
    })
  }

  render() {
    const { policyConfig } = this.store.detail
    const { data, isLoading } = this.store.rules

    return (
      <Card
        title={t('Alerting Rules')}
        loading={isLoading}
        isEmpty={isEmpty(data)}
        empty={t('NOT_AVAILABLE', { resource: t('alerting rule') })}
      >
        <div className={styles.main}>
          {data.map(item => (
            <RuleItem
              key={item.rule_id}
              data={item}
              policyConfig={policyConfig}
            />
          ))}
        </div>
      </Card>
    )
  }
}
