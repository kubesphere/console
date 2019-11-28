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

class AlertRules extends React.Component {
  get module() {
    return this.props.module
  }

  get params() {
    return this.props.match.params
  }

  get namespace() {
    return this.params.namespace
  }

  get enabledActions() {
    return globals.app.getActions({
      module: this.module,
      project: this.namespace,
    })
  }

  get store() {
    return this.props.detailStore
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    const data = {
      limit: Infinity,
      ...this.params,
    }
    this.store.fetchRules(data)
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

export default inject('rootStore')(observer(AlertRules))
export const Component = AlertRules
