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
import { Panel } from 'components/Base'
import { Icon } from '@kube-design/components'
import { inject } from 'mobx-react'

import styles from './index.scss'

@inject('detailStore')
export default class VolumeSnapshotSource extends Component {
  render() {
    const { detailStore } = this.props
    const { detail } = detailStore

    const { snapshotClassName, snapshotSourceName } = detail

    return (
      <>
        <Panel title={t('DATA_SOURCE')}>
          <div className={styles.wrapper}>
            <div className={styles.icon}>
              <Icon name={'storage'} size={40} />
            </div>
            <div>
              <Attr title={snapshotSourceName} value={t('Name')} />
            </div>
            <div>
              <Attr title={snapshotClassName} value={t('Storage Class')} />
            </div>
            <div />
          </div>
        </Panel>
      </>
    )
  }
}

function Attr({ title, value }) {
  return (
    <div className={styles.attr}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  )
}
