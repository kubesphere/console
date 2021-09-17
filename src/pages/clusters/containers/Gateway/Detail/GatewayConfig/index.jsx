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
import { Panel } from 'components/Base'
import { observer, inject } from 'mobx-react'
import styles from './index.scss'

@inject('detailStore')
@observer
export default class GatewayConfig extends React.Component {
  get module() {
    return this.props.detailStore.module
  }

  get store() {
    return this.props.detailStore
  }

  get detail() {
    return this.store.gateway.data
  }

  render() {
    return (
      <Panel title={t('Gateway Config')}>
        <div className={styles.container}>
          <ul>
            {Object.entries(this.detail.annotations).map(([key, value]) => (
              <li key={key}>
                <span className={styles.key}>{key}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    )
  }
}
