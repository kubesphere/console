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
import { get, capitalize, isEmpty } from 'lodash'
import { Tag } from '@kube-design/components'

import { getLocalTime } from 'utils'
import AlertMessageStore from 'stores/alerting/message'
import { Panel, Text } from 'components/Base'
import BaseTable from 'components/Tables/Base'

import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'

import styles from './index.scss'

@observer
export default class AlertHistory extends React.Component {
  constructor(props) {
    super(props)

    this.store = new AlertMessageStore()
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = params => {
    const { cluster, namespace, name } = this.props.match.params
    const data = {
      ...params,
      cluster,
      namespace,
      ruleName: name,
    }
    this.store.fetchList(data)
  }

  getResourceType = type => {
    const str = capitalize(type)
    return t('ALERT_TYPE', { type: t(str) })
  }

  getColumns = () => [
    {
      title: t('Alerting Message'),
      dataIndex: 'value',
      width: '30%',
      render: (value, record) => (
        <Text
          icon="loudspeaker"
          title={get(record, 'annotations.summary')}
          description={get(record, 'annotations.message', '-')}
        />
      ),
    },
    {
      title: t('Level'),
      dataIndex: 'labels.severity',
      width: '15%',
      render: severity => {
        const level = SEVERITY_LEVEL.find(item => item.value === severity)
        if (level) {
          return <Tag type={level.type}>{t(level.label)}</Tag>
        }
        return <Tag>{severity}</Tag>
      },
    },
    {
      title: t('Time'),
      dataIndex: 'createTime',
      isHideable: true,
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  render() {
    const { data, isLoading, filters } = this.store.list

    return (
      <Panel title={t('Alerting History')}>
        {!isLoading && isEmpty(data) ? (
          <div>{t('No Data')}</div>
        ) : (
          <BaseTable
            className={styles.table}
            filters={filters}
            data={data}
            name="Alerting Message"
            rowKey="value"
            columns={this.getColumns()}
            loading={isLoading}
            selectedRowKeys={[]}
            selectActions={[]}
            hideHeader
            hideFooter
          />
        )}
      </Panel>
    )
  }
}
