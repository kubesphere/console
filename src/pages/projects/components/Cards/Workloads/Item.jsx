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
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Text } from 'components/Base'
import StatusReason from 'projects/components/StatusReason'
import WorkloadStatus from 'projects/components/WorkloadStatus'
import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES } from 'utils/constants'
import { getWorkloadStatus } from 'utils/status'

import styles from './index.scss'

export default class WorkloadItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    detail: PropTypes.object,
  }

  static defaultProps = {
    prefix: '',
    detail: {},
  }

  getDescription(detail) {
    const { status, reason } = getWorkloadStatus(detail, detail.module)
    if (reason) {
      return <StatusReason status={status} reason={t(reason)} data={detail} />
    }

    const { updateTime, createTime } = detail
    if (updateTime) {
      return `${t('Updated at')} ${getLocalTime(updateTime).fromNow()}`
    }

    return `${t('Created at')} ${getLocalTime(createTime).fromNow()}`
  }

  render() {
    const { detail, prefix } = this.props

    if (!detail) {
      return null
    }

    const version = get(
      detail,
      'annotations["deployment.kubernetes.io/revision"]'
    )

    return (
      <div className={styles.item}>
        <Text
          icon={ICON_TYPES[detail.module]}
          title={
            <Link to={`${prefix}/${detail.module}/${detail.name}`}>
              {getDisplayName(detail)}
            </Link>
          }
          description={this.getDescription(detail)}
        />
        <Text
          title={<WorkloadStatus data={detail} module={detail.module} />}
          description={t('Status')}
        />
        <Text
          title={version ? `#${version}` : '-'}
          description={t('Version')}
        />
      </div>
    )
  }
}
