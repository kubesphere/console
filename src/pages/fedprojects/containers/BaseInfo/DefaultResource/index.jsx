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

import { get, endsWith, isEmpty } from 'lodash'
import React from 'react'

import { Icon } from '@kube-design/components'
import { Panel } from 'components/Base'

import { cpuFormat, memoryFormat } from 'utils'

import styles from './index.scss'

class DefaultResource extends React.Component {
  render() {
    const { detail } = this.props

    const cpuLimit = cpuFormat(get(detail, 'limit.default.cpu'))
    const cpuRequest = cpuFormat(get(detail, 'limit.defaultRequest.cpu'))
    const memoryLimit = memoryFormat(get(detail, 'limit.default.memory'))
    const memoryRequest = memoryFormat(
      get(detail, 'limit.defaultRequest.memory')
    )
    // get GPU config from the supported type
    const supportGpu = globals.config.supportGpuType
    const defaultRequest = get(detail, 'limit.defaultRequest', {})
    const gpuType = supportGpu.filter(type =>
      Object.keys(defaultRequest).some(key => endsWith(key, type))
    )
    const gpu = isEmpty(gpuType)
      ? {}
      : { value: defaultRequest[`${gpuType[0]}`], type: gpuType }

    return (
      <Panel title={t('DEFAULT_CONTAINER_QUOTA_PL')}>
        <div className={styles.content}>
          <div className={styles.contentItem}>
            <Icon name="cpu" size={40} />
            <div className={styles.item}>
              <div>
                {cpuRequest ? `${cpuRequest} Core` : t('NO_REQUEST_TCAP')}
              </div>
              <p>{t('CPU_REQUEST_SCAP')}</p>
            </div>
            <div className={styles.item}>
              <div>{cpuLimit ? `${cpuLimit} Core` : t('NO_LIMIT_TCAP')}</div>
              <p>{t('CPU_LIMIT_SCAP')}</p>
            </div>
          </div>
          <div className={styles.contentItem}>
            <Icon name="memory" size={40} />
            <div className={styles.item}>
              <div>
                {memoryRequest ? `${memoryRequest} Mi` : t('NO_REQUEST_TCAP')}
              </div>
              <p>{t('MEMORY_REQUEST_SCAP')}</p>
            </div>
            <div className={styles.item}>
              <div>
                {memoryLimit ? `${memoryLimit} Mi` : t('NO_LIMIT_TCAP')}
              </div>
              <p>{t('MEMORY_LIMIT_SCAP')}</p>
            </div>
          </div>
          <div className={styles.contentItem}>
            <img src="/assets/GPU.svg" size={48} />
            <div className={styles.item}>
              <div>{gpu.value ? gpu.type : t('NONE')}</div>
              <p>{t('GPU_TYPE_SCAP')}</p>
            </div>
            <div className={styles.item}>
              <div>{gpu.value ? gpu.value : t('NO_LIMIT_TCAP')}</div>
              <p>{t('GPU_LIMIT_SCAP')}</p>
            </div>
          </div>
        </div>
      </Panel>
    )
  }
}

export default DefaultResource
