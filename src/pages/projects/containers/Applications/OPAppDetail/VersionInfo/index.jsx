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

import { Button } from '@kube-design/components'

import styles from './index.scss'

const Item = ({ data, onUpgrade, currentVersion }) => {
  const handleUpgrade = () => onUpgrade(data.version_id)

  return (
    <div className={styles.item}>
      <span>{data.name}</span>
      {currentVersion.version_id === data.version_id && (
        <div className={styles.tag}>{t('CURRENT_VERSION')}</div>
      )}
      {currentVersion.version_id !== data.version_id && (
        <div className={styles.operations}>
          <Button onClick={handleUpgrade}>
            {currentVersion.create_time < data.create_time
              ? t('UPGRADE')
              : t('ROLL_BACK')}
          </Button>
        </div>
      )}
    </div>
  )
}

export default class VersionInfo extends React.Component {
  render() {
    const {
      data,
      detail,
      cluster,
      workspace,
      namespace,
      onUpgrade,
      onRollback,
    } = this.props
    const currentVersion =
      data.find(item => item.version_id === detail.version_id) || {}

    const urlPrefix = `/apps/${detail.app_id}?workspace=${workspace}&cluster=${cluster}&namespace=${namespace}`

    return (
      <ul>
        {data.map(item => (
          <Item
            key={item.version_id}
            data={item}
            currentVersion={currentVersion}
            onUpgrade={onUpgrade}
            onRollback={onRollback}
            urlPrefix={urlPrefix}
          />
        ))}
      </ul>
    )
  }
}
