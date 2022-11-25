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

import { get } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'

import { Icon } from '@kube-design/components'
import { Panel } from 'components/Base'

import { cpuFormat, memoryFormat } from 'utils'

import ProjectStore from 'stores/project'

import styles from './index.scss'

@observer
export default class DefaultResource extends React.Component {
  store = new ProjectStore()

  componentDidUpdate(prevProps) {
    if (prevProps.namespace !== this.props.namespace && this.props.namespace) {
      this.store.fetchLimitRanges(this.props)
    }
  }

  componentDidMount() {
    if (this.props.namespace) {
      this.store.fetchLimitRanges(this.props)
    }
  }

  render() {
    const detail = get(this.store, 'limitRanges.data[0]')

    const cpuLimit = cpuFormat(get(detail, 'limit.default.cpu'))
    const cpuRequest = cpuFormat(get(detail, 'limit.defaultRequest.cpu'))
    const memoryLimit = memoryFormat(get(detail, 'limit.default.memory'))
    const memoryRequest = memoryFormat(
      get(detail, 'limit.defaultRequest.memory')
    )

    return (
      <Panel title={t('DEFAULT_CONTAINER_QUOTA_PL')}>
        <div className={styles.content}>
          <div className={styles.contentItem}>
            <Icon name="cpu" size={40} />
            <div className={styles.item}>
              <div>{cpuRequest ? `${cpuRequest} Core` : t('NO_REQUEST')}</div>
              <p>{t('RESOURCE_REQUEST')}</p>
            </div>
            <div className={styles.item}>
              <div>{cpuLimit ? `${cpuLimit} Core` : t('NO_LIMIT')}</div>
              <p>{t('RESOURCE_LIMIT')}</p>
            </div>
          </div>
          <div className={styles.contentItem}>
            <Icon name="memory" size={40} />
            <div className={styles.item}>
              <div>
                {memoryRequest ? `${memoryRequest} Mi` : t('NO_REQUEST')}
              </div>
              <p>{t('RESOURCE_REQUEST')}</p>
            </div>
            <div className={styles.item}>
              <div>{memoryLimit ? `${memoryLimit} Mi` : t('NO_LIMIT')}</div>
              <p>{t('RESOURCE_LIMIT')}</p>
            </div>
          </div>
        </div>
      </Panel>
    )
  }
}
