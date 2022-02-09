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

import { Image } from 'components/Base'

import { safeParseJSON } from 'utils'

import styles from './index.scss'

export default class AppCard extends React.Component {
  renderVendor() {
    const { app } = this.props
    const maintainers = safeParseJSON(
      app.latest_app_version.maintainers,
      []
    ).map(item => item.name)
    return t('MAINTAINER_VALUE', { value: maintainers[0] || '-' })
  }

  render() {
    const { app } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <span className={styles.icon}>
            <Image iconSize={48} src={app.icon} iconLetter={app.name} alt="" />
          </span>
          <div className={styles.text}>
            <p>
              <strong>{app.name || '-'}</strong>
            </p>
            <p className={styles.desc} title={app.description || ''}>
              {app.description || '-'}
            </p>
          </div>
        </div>
        <div className={styles.bottom}>
          <span className={styles.vendor}>{this.renderVendor()}</span>
          <span className={styles.version} title={app.latest_app_version.name}>
            {t('LATEST_VALUE', { value: app.latest_app_version.name || '-' })}
          </span>
        </div>
      </div>
    )
  }
}
