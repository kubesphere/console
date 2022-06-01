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
import { get, isEmpty } from 'lodash'
import { Icon, Tooltip } from '@kube-design/components'
import { ReactComponent as ForkIcon } from 'assets/fork.svg'
import { getLocalTime, formatUsedTime } from 'utils'
import styles from './index.scss'
import StatusText from '../../Components/StatusText'

@inject('detailStore')
@observer
class SyncStatus extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
  }

  refreshTimer = setInterval(() => this.getDetail(), 4000)

  getDetail = () => {
    const { params } = this.props.match
    this.props.detailStore.fetchDetail({
      name: params.cd,
      devops: params.devops,
      cluster: params.cluster,
    })
  }

  componentWillUnmount() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
      this.refreshTimer = null
    }
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
        width: '15%',
      },
      {
        title: t('SYNC_STATUS'),
        dataIndex: 'status',
        width: '10%',
        render: syncStatus => {
          return <StatusText type={syncStatus} label={syncStatus} />
        },
      },
      {
        title: t('MESSAGE'),
        dataIndex: 'message',
      },
    ]
  }

  renderTable = () => {
    const data = get(
      this.detail,
      'status.operationState.syncResult.resources',
      []
    )

    return (
      <Table
        hideHeader
        hideFooter
        rowKey="name"
        data={data}
        showEmpty={data.length === 0}
        columns={this.getColumns()}
        name="sync_result"
      />
    )
  }

  renderSyncTip = () => {
    const syncTip = get(this.detail, 'status.conditions[0]', {})

    const content = (
      <div className={styles.statusTip}>
        <strong>{syncTip.type}</strong>
        <p>
          Last Transition Time: &nbsp;
          {getLocalTime(syncTip.lastTransitionTime).format(
            'YYYY-MM-DD HH:mm:ss'
          )}
        </p>
        <p>{syncTip.message}</p>
      </div>
    )

    return isEmpty(syncTip) ? (
      <div className={styles.syncStatus}>
        <Icon name="rocket" size={40} />
        <span className={styles.syncStatus_icon}>
          <StatusText type={this.detail.syncStatus} hasLabel={false} />
        </span>
      </div>
    ) : (
      <Tooltip content={content}>
        <div className={styles.syncStatus}>
          <Icon name="rocket" size={40} />
          <span className={styles.syncStatus_icon}>
            <StatusText type={this.detail.syncStatus} hasLabel={false} />
          </span>
        </div>
      </Tooltip>
    )
  }

  render() {
    let revision = get(this.detail, 'status.sync.revision')
    revision = revision ? revision.slice(0, 6) : '-'
    const startTime = get(this.detail, 'status.operationState.startedAt')
    const endTime = get(this.detail, 'status.operationState.finishedAt')
    const duration = new Date(endTime) - new Date(startTime)
    const durationTime = isNaN(duration) ? '-' : formatUsedTime(duration)

    return (
      <div className={styles.container}>
        <div className={styles.sync_info}>
          <h3>{t('SYNC_STATUS')}</h3>
          <div className={styles.info_card}>
            <div className={styles.wrapper}>
              <div className={styles.wrapper_icon}>
                {this.renderSyncTip()}
                <div>
                  <h4>{this.detail.syncStatus}</h4>
                  <p>{t('CURRENT_SYNC_STATUS')}</p>
                </div>
              </div>
              <div>
                <div>
                  <h4>
                    {startTime
                      ? getLocalTime(startTime).format('YYYY-MM-DD HH:mm:ss')
                      : '-'}
                  </h4>
                  <p>{t('START_TIME_SCAP')}</p>
                </div>
              </div>
              <div>
                <div>
                  <h4>
                    {endTime
                      ? getLocalTime(endTime).format('YYYY-MM-DD HH:mm:ss')
                      : '-'}
                  </h4>
                  <p>{t('END_TIME_SCAP')}</p>
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
                  <h4>{revision}</h4>
                  <p>{t('REVISION')}</p>
                </div>
              </div>
              <div className={styles.wrapper_gray}>
                <Icon name="druration" size={40} />
                <div>
                  <h4>{durationTime}</h4>
                  <p>{t('DURATION')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sync_result}>
          <h3>{t('SYNC_RESULT_PL')}</h3>
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

export default SyncStatus
