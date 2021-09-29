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
import { ScrollLoad } from 'components/Base'
import EmptyList from 'components/Cards/EmptyList'
import SearchInput from 'components/Modals/LogSearch/Logging/SearchInput'
import styles from './index.scss'

@inject('detailStore')
@observer
export default class GatewayLog extends React.Component {
  get store() {
    return this.props.detailStore
  }

  getLogs = params => {
    const { cluster, namespace, gatewayName } = this.props.match.params
    this.store.getGatewayLogs({
      cluster,
      namespace,
      gatewayName,
      pod: 'kubesphere-router-proj1-6d5d785cc4-8tr5k',
      ...params,
    })
  }

  render() {
    const { data, total, page, isLoading } = this.store.logs

    if (!globals.app.hasKSModule('logging')) {
      return (
        <EmptyList
          className="no-shadow"
          icon="cluster"
          title={t('NO_AVAILABLE_CLUSTER')}
          desc={t('No cluster with logging module enabled')}
        />
      )
    }

    return (
      <div>
        <div className={styles.title}>
          <SearchInput
            className={styles.searchInput}
            onChange={this.onSearchParamsChange}
            params={this.props.searchInputState}
            dropDownItems={{
              log_query: {
                icon: 'magnifier',
                text: t('Keyword'),
              },
              namespace_query: {
                icon: 'project',
                text: t('PROJECT'),
              },
              workload_query: {
                icon: 'backup',
                text: t('Workload'),
              },
              pod_query: {
                icon: 'pod',
                text: t('Pod'),
              },
              container_query: {
                icon: 'docker',
                text: t('Container'),
              },
            }}
          />
          {/* <TimeSelector /> */}
        </div>
        <div className={styles.body}>
          <ScrollLoad
            data={data}
            total={total}
            page={page}
            loading={isLoading}
            onFetch={param => this.getLogs({ ...param })}
          >
            {data.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </ScrollLoad>
        </div>
      </div>
    )
  }
}
