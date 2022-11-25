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
import { Icon, Loading, Tooltip } from '@kube-design/components'
import { Panel } from 'components/Base'
import Volume from 'stores/volume'
import { getLocalTime, map_accessModes } from 'utils'
import { toJS } from 'mobx'

import { isEmpty } from 'lodash'
import styles from './index.scss'

const renderModeTip = (
  <div>
    <div>{t('RWO_DESC')}</div>
    <div>{t('ROX_DESC')}</div>
    <div>{t('RWX_DESC')}</div>
  </div>
)
@inject('detailStore')
@observer
class ResourceStatus extends React.Component {
  store = new Volume()

  componentDidMount() {
    const { _originData, phase, cluster } = this.props.detailStore.detail
    if (phase !== 'Bound') {
      this.store.isLoading = false
    } else {
      this.store.fetchDetail({ cluster, ..._originData.spec.claimRef })
    }
  }

  renderItem = () => {
    const { detail } = this.store
    return (
      <div>
        <div className={styles.ItemBox}>
          <div className={styles.leftBox}>
            <Icon name="storage" size="40"></Icon>
            <div className={styles.rightBox}>
              <span className={styles.title}>{detail.name}</span>
              <span className={styles.des}>
                {t('STORAGE_CLASS_VALUE', { value: detail.storageClassName })}
              </span>
            </div>
          </div>
          <div className={styles.titleBox}>
            <span className={styles.title}>
              {getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </span>
            <span className={styles.des}>{t('CREATION_TIME')}</span>
          </div>
        </div>
        <div className={styles.IconLine}>
          <div className={styles.cardBox}>
            <Icon name="bm" size={30}></Icon>
            <div className={styles.text}>
              <span className={styles.title}>{detail.storageProvisioner}</span>
              <span className={styles.des}>{t('PROVISIONER')}</span>
            </div>
          </div>
          <div className={styles.cardBox}>
            <img src="/assets/Accessmodes.svg" size={48} />
            <div className={styles.text}>
              <span className={styles.title}>
                {this.mapperAccessMode(toJS(detail.accessModes))}
              </span>
              <span className={styles.des}>{this.renderAccessTitle()}</span>
            </div>
          </div>
          <div className={styles.cardBox}>
            <Icon name="database" size={30}></Icon>
            <div className={styles.text}>
              <span className={styles.title}>{detail.capacity}</span>
              <span className={styles.des}>{t('CAPACITY')}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderAccessTitle = () => {
    return (
      <div className={styles.mode_title}>
        {t('ACCESS_MODE')}
        <Tooltip content={renderModeTip}>
          <Icon name="question" size={16} className={styles.toolTip}></Icon>
        </Tooltip>
      </div>
    )
  }

  mapperAccessMode = accessModes => {
    const modes = map_accessModes(accessModes)
    return (
      <>
        <span>{modes.join(',')}</span>
      </>
    )
  }

  render() {
    const { detail, isLoading } = this.store
    return (
      <Panel title={t('PERSISTENT_VOLUME_CLAIM')}>
        {!isEmpty(detail) && (
          <Loading spinning={isLoading}>{this.renderItem()}</Loading>
        )}
      </Panel>
    )
  }
}

export default ResourceStatus
