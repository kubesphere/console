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
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Status } from 'components/Base'
import { getLocalTime } from 'utils'

import styles from './index.scss'

export default class InstanceItem extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    detail: PropTypes.object,
    showVersion: PropTypes.bool,
  }

  static defaultProps = {
    detail: {},
    showVersion: false,
  }

  renderContent() {
    const { detail, showVersion } = this.props
    const { version } = detail

    return (
      <div className={styles.content}>
        <dl>
          <dt>{detail.name}</dt>
          <dd>{t('Instance Name')}</dd>
        </dl>
        <dl>
          <dt>
            <Status
              className={styles.status}
              type={detail.status}
              name={t(detail.status)}
            />
          </dt>
          <dd>{t('Status')}</dd>
        </dl>
        {showVersion && (
          <dl>
            <dt>{version.name}</dt>
            <dd>{t('Version')}</dd>
          </dl>
        )}
        <dl>
          <dt>{detail.zone}</dt>
          <dd>{t('In Project')}</dd>
        </dl>
        <dl>
          <dt>{detail.cluster || detail.runtime_id}</dt>
          <dd>{t('Cluster')}</dd>
        </dl>
        <dl>
          <dt>
            {getLocalTime(detail.upgrade_time || detail.create_time).format(
              'YYYY-MM-DD HH:mm:ss'
            )}
          </dt>
          <dd>{t('Updated Time')}</dd>
        </dl>
      </div>
    )
  }

  render() {
    const { className } = this.props

    return (
      <div className={classnames(styles.item, className)}>
        <div className={styles.itemMain}>{this.renderContent()}</div>
      </div>
    )
  }
}
