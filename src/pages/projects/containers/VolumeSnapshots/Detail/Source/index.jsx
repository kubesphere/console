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

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Icon, Loading, Tooltip } from '@kube-design/components'
import { Panel } from 'components/Base'
import Volume from 'stores/volume'
import { getLocalTime, map_accessModes } from 'utils'
import { toJS } from 'mobx'

import { isEmpty, isFunction } from 'lodash'
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
export default class VolumeSnapshotSource extends Component {
  store = new Volume()

  componentDidMount() {
    const {
      snapshotSourceName,
      namespace,
      backupStatus,
      cluster,
    } = this.props.detailStore.detail
    if (backupStatus !== 'success') {
      this.store.isLoading = false
    } else {
      this.store.fetchDetail({ cluster, name: snapshotSourceName, namespace })
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
            <span className={styles.des}>{t('CREATION_TIME_TCAP')}</span>
          </div>
        </div>
        <div className={styles.IconLine}>
          <CardBox
            icon="bm"
            size="30"
            title={'PROVISIONER'}
            value={detail.storageProvisioner}
          />
          <CardBox
            icon={() => <img src="/assets/Accessmodes.svg" size={48} />}
            size="48"
            title={() => this.renderAccessTitle()}
            value={() => this.mapperAccessMode(toJS(detail.accessModes))}
          />
          <CardBox
            icon="database"
            size="30"
            title={'CAPACITY'}
            value={detail.capacity}
          />
        </div>
      </div>
    )
  }

  renderAccessTitle = () => {
    return (
      <div className={styles.mode_title}>
        {t('ACCESS_MODE_TCAP')}
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
      <Panel title={t('PERSISTENT_VOLUME_CLAIM_PL')}>
        {!isEmpty(detail) && (
          <Loading spinning={isLoading}>{this.renderItem()}</Loading>
        )}
      </Panel>
    )
  }
}

function CardBox({ icon, size, title, value }) {
  return (
    <div className={styles.cardBox}>
      {isFunction(icon) ? icon() : <Icon name={icon} size={size}></Icon>}
      <div className={styles.text}>
        <span className={styles.title}>
          {isFunction(value) ? value() : value}
        </span>
        <span className={styles.des}>
          {isFunction(title) ? title() : t(`${title}`)}
        </span>
      </div>
    </div>
  )
}
