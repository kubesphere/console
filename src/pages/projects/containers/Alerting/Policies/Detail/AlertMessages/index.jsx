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
import { Link } from 'react-router-dom'
import {
  Level,
  LevelLeft,
  LevelRight,
  Dropdown,
  Menu,
  Pagination,
  Icon,
} from '@kube-design/components'

import { getLocalTime } from 'utils'
import { MODULE_KIND_MAP, PAGESIZE_OPTION } from 'utils/constants'
import { getAlertingResource } from 'utils/alerting'
import AlertMessageStore from 'stores/alerting/message'
import { Panel, Text } from 'components/Base'
import BaseTable from 'components/Tables/Base'

import { severityOptions } from 'components/Forms/AlertingPolicy/AlertingRules'

import classnames from 'classnames'
import styles from './index.scss'

@observer
export default class AlertHistory extends React.Component {
  constructor(props) {
    super(props)

    this.store = new AlertMessageStore()
    this.state = {
      page: 1,
      limit: 10,
      sortBy: 'activeAt',
      ascending: false,
    }
  }

  get type() {
    return this.props.match.url.indexOf('alert-rules/builtin') > 0
      ? 'builtin'
      : ''
  }

  get pagination() {
    const { page, limit } = this.state
    const pagination = {
      page,
      limit,
      total: this.store.list.total,
    }
    return pagination
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = params => {
    const { cluster, namespace, name } = this.props.match.params
    const { limit, page, sortBy, ascending } = this.state

    const data = {
      ...params,
      cluster,
      namespace,
      ruleName: name,
      type: this.type,
      limit,
      page,
      sortBy,
      ascending,
      label_filters: `rule_group=${name}`,
    }
    this.store.fetchList(data)
  }

  getResourceType = type => {
    const str = capitalize(type)
    return t('ALERT_TYPE', { type: t(str) })
  }

  getPrefix({ cluster, namespace } = {}) {
    const {
      cluster: _cluster,
      namespace: _namespace,
      workspace,
    } = this.props.match.params
    cluster = cluster || _cluster
    namespace = namespace || _namespace
    return `${workspace ? `/${workspace}` : ''}/clusters/${cluster}${
      namespace ? `/projects/${namespace}` : ''
    }`
  }

  getColumns = () => [
    {
      title: t('MESSAGE'),
      dataIndex: 'value',
      render: (value, record) => (
        <Text
          icon="loudspeaker"
          title={get(record, 'annotations.summary')}
          description={
            get(record, 'annotations.message') ||
            get(record, 'annotations.description', '-')
          }
        />
      ),
    },
    {
      title: t('SEVERITY'),
      dataIndex: 'labels.severity',
      width: '15%',
      render: severity => {
        const level = severityOptions.find(item => item.value === severity)

        if (level) {
          return (
            <span
              style={{
                backgroundColor: level.bgColor,
                color: level.color,
                fontWeight: 600,
                padding: '0px 4px',
              }}
            >
              {t(level.label)}
            </span>
          )
        }

        return '-'
      },
    },
    {
      title: t('MONITORING_TARGET'),
      dataIndex: 'labels',
      isHideable: true,
      width: '20%',
      render: labels => {
        const { rule_type } = labels
        if (rule_type !== 'template') {
          return '-'
        }

        const { module, name, namespace } = getAlertingResource(labels)
        if (!module) {
          return '-'
        }

        if (module === 'hpas') {
          return (
            <span>
              {t(MODULE_KIND_MAP[module])}: {name}
            </span>
          )
        }
        return (
          <Link to={`${this.getPrefix({ namespace })}/${module}/${name}`}>
            {t(MODULE_KIND_MAP[module])}: {name}
          </Link>
        )
      },
    },
    {
      title: t('TRIGGER_TIME'),
      dataIndex: 'activeAt',
      isHideable: true,
      width: 200,
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  handlePage = page => {
    this.setState({ page }, () => {
      this.fetchData()
    })
  }

  handlePageSizeClick = (e, limit) => {
    this.setState({ limit }, () => {
      this.fetchData()
    })
  }

  renderFooter = () => {
    const pagination = this.pagination
    const { total, limit } = pagination

    return (
      <Level className={styles.footer}>
        <LevelLeft>
          <div className={styles.pageSizeBox}>
            <Dropdown
              placement={'top'}
              trigger={'hover'}
              content={
                <Menu
                  className={styles.pageSizeMenu}
                  onClick={this.handlePageSizeClick}
                >
                  {PAGESIZE_OPTION.map(item => (
                    <Menu.MenuItem
                      className={classnames(styles.pageSizeMenuitem)}
                      key={item}
                    >
                      <span>{item}</span>
                    </Menu.MenuItem>
                  ))}
                </Menu>
              }
            >
              <div className={styles.pagesize}>
                <span className={styles.text}>
                  {t('SHOW_NUM', { num: limit })}
                </span>
                <Icon name="caret-down" size={16} />
              </div>
            </Dropdown>
            <div className={styles.gap}></div>
            <span>{t('TOTAL_ITEMS', { num: total })}</span>
          </div>
        </LevelLeft>
        <LevelRight>
          <Pagination {...pagination} onChange={this.handlePage} />
        </LevelRight>
      </Level>
    )
  }

  render() {
    const { data, isLoading, filters } = this.store.list

    return (
      <Panel title={t('ALERTING_MESSAGE_PL')} loading={isLoading}>
        {isEmpty(data) ? (
          <div>{t('NO_DATA_DESC')}</div>
        ) : (
          <>
            <BaseTable
              className={styles.table}
              filters={filters}
              data={data}
              name="Alerting Message"
              rowKey="value"
              columns={this.getColumns()}
              selectedRowKeys={[]}
              selectActions={[]}
              hideHeader
              hideFooter
            />
            {this.renderFooter()}
          </>
        )}
      </Panel>
    )
  }
}
