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
import { get, isEmpty } from 'lodash'

import { Panel } from 'components/Base'
import Notification from './Notification'
import Monitoring from './Monitoring'
import RuleItem from './RuleItem'
import Query from './Query'

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

  render() {
    const { detail } = this.store
    const summary = get(detail, 'annotations.summary')
    const message = get(detail, 'annotations.message')
    const kind = get(detail, 'annotations.kind')
    const resources = toJS(detail.resources)
    return (
      <>
        {!isEmpty(detail.rules) && (
          <Panel title={t('Alerting Rules')}>
            {detail.rules.map((item, index) => (
              <RuleItem
                key={index}
                data={item}
                resources={resources}
                kind={kind || 'Node'}
              />
            ))}
          </Panel>
        )}
        {detail.query && (
          <Panel title={t('Rule Expression')}>
            <Query query={detail.query} />
          </Panel>
        )}
        <Panel title={t('Monitoring')}>
          <Monitoring detail={detail} store={this.store} />
        </Panel>
        <Panel title={t('Notification Settings')}>
          <Notification summary={summary} message={message} />
        </Panel>
      </>
    )
  }
}
