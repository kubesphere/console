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
import { InputSearch } from '@kube-design/components'
import { observer, inject } from 'mobx-react'

import { ScrollLoad } from 'components/Base'
import styles from './index.scss'

@inject('detailStore')
@observer
export default class GatewayLog extends React.Component {
  get store() {
    return this.props.detailStore
  }

  getLogs = params => {
    const { cluster, namespace, gatewayName } = this.props.match.params
    this.store.getGatewayLogs({ cluster, namespace, gatewayName, ...params })
  }

  render() {
    const { data, total, page, isLoading } = this.store.logs
    return (
      <div>
        <div className={styles.title}>
          <InputSearch />
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
