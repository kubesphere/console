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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { get } from 'lodash'

import AlertingRuleList from './RuleList'

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

  get type() {
    return this.props.match.url.indexOf('alert-rules/builtin') > 0
      ? 'builtin'
      : ''
  }

  get rules() {
    const _rule = toJS(
      get(this.store, 'detail._originDataWithStatus.spec.rules', [])
    )
    return _rule
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = params => {
    const { cluster, namespace, name } = this.props.match.params

    if (this.store.fetchDetail) {
      this.store.fetchDetail({
        cluster,
        namespace,
        name,
        type: this.type,
        ...params,
      })
    }
  }

  render() {
    const { cluster, namespace } = this.props.match.params

    return (
      <AlertingRuleList
        store={this.store}
        cluster={cluster}
        namespace={namespace}
        rules={this.rules}
        handleRefresh={this.fetchData}
      />
    )
  }
}
