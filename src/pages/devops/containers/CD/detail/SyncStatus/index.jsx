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

import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

import PropTypes from 'prop-types'
import Table from 'components/Tables/List'
import { get } from 'lodash'
import { Icon } from '@kube-design/components'
import { ReactComponent as ForkIcon } from 'assets/fork.svg'
import styles from './index.scss'
import StatusText from '../../Components/StatusText'

@inject('detailStore')
@observer
class SyncStatus extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
  }

  get detail() {
    return toJS(this.props.detailStore.detail)
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  getColumns = () => {
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        width: '20%',
      },

      {
        title: t('TYPE'),
        dataIndex: 'kind',
        width: '20%',
      },
      {
        title: t('PROJECT_PL'),
        dataIndex: 'namespace',
        width: '20%',
      },
      {
        title: t('SYNC_STATUS'),
        dataIndex: 'status',
        width: '20%',
        render: syncStatus => {
          return <StatusText type={syncStatus} label={syncStatus} />
        },
      },
      {
        title: t('INFO'),
        dataIndex: 'message',
      },
    ]
  }

  renderTable = () => {
    const data = get(this.detail, 'status.resources', [])
    const pagination = { total: data.length, page: 1, limit: 10 }

    return (
      <Table
        hideHeader
        rowKey="name"
        data={data}
        searchType="name"
        columns={this.getColumns()}
        pagination={pagination}
        name="sync_result"
      />
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.sync_info}>
          <h3>{t('LATEST_SYNC_STATUS')}</h3>
          <div className={styles.info_card}>
            <div className={styles.wrapper}>
              <div className={styles.wrapper_icon}>
                <div className={styles.syncStatus}>
                  <Icon name="rocket" size={40} />
                  <span className={styles.syncStatus_icon}>
                    <StatusText
                      type={this.detail.syncStatus}
                      hasLabel={false}
                    />
                  </span>
                </div>

                <div>
                  <h4>{this.detail.syncStatus}</h4>
                  <p>{t('LATEST_SYNC_STATUS')}</p>
                </div>
              </div>
              <div>
                <div>
                  <h4>2022-02-28 15:00:00</h4>
                  <p>{t('START_TIME')}</p>
                </div>
              </div>
              <div>
                <div>
                  <h4>2022-02-28 15:00:03</h4>
                  <p>{t('END_TIME')}</p>
                </div>
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.wrapper_gray}>
                <Icon name="timed-task" size={40} />
                <div>
                  <h4>
                    {this.detail.syncType === 'automated'
                      ? t('AUTO_SYNC')
                      : t('MANUAL_SYNC')}
                  </h4>
                  <p>{t('SYNC_STRATEGY')}</p>
                </div>
              </div>
              <div className={styles.wrapper_gray}>
                <ForkIcon style={{ width: '40px', height: '40px' }} />
                <div>
                  <h4>{get(this.detail, 'repoSource.targetRevision', '-')}</h4>
                  <p>{t('REVISE')}</p>
                </div>
              </div>
              <div className={styles.wrapper_gray}>
                <Icon name="druration" size={40} />
                <div>
                  <h4>{t('00:03 min')}</h4>
                  <p>{t('DURATION')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sync_result}>
          <h3>{t('SYNC_RESULT')}</h3>
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

export default SyncStatus
