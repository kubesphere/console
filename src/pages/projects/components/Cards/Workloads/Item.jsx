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

import { List } from 'components/Base'
import { getLocalTime } from 'utils'
import { getWorkloadStatus } from 'utils/status'
import { ICON_TYPES, S2I_STATUS_DESC } from 'utils/constants'
import StatusReason from 'projects/components/StatusReason'

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

  getStatus = detail => getWorkloadStatus(detail, detail.type)

  getTotal = detail => {
    let num
    if (detail.type === 'deployments') {
      num = detail.podNums || detail.desire || 0
    } else if (detail.type === 'statefulsets') {
      num = detail.podNums || detail.desire || 0
    }

    return num
  }

  getReady = detail => {
    let num
    if (detail.type === 'deployments') {
      num = detail.availablePodNums || detail.available || 0
    } else if (detail.type === 'statefulsets') {
      num = detail.readyPodNums || detail.available || 0
    }

    return num
  }

  getDescription(reason, status, detail) {
    if (reason) {
      return <StatusReason status={status} reason={t(reason)} data={detail} />
    }

    const { updateTime, createTime } = detail
    if (updateTime) {
      return `${t('Updated at')} ${getLocalTime(updateTime).fromNow()}`
    }

    return `${t('Created at')} ${getLocalTime(createTime).fromNow()}`
  }

  renderExtra() {}

  render() {
    const { detail, prefix } = this.props

    if (!detail) {
      return null
    }

    const { status, reason } = this.getStatus(detail)

    const details = [
      {
        title: detail.hasS2i ? (
          <span>{t(S2I_STATUS_DESC[status])}</span>
        ) : (
          <span>
            {t(status)}&nbsp;({this.getReady(detail)}/{this.getTotal(detail)})
          </span>
        ),
        description: t('Status'),
      },
    ]

    const version = get(
      detail,
      'annotations["deployment.kubernetes.io/revision"]'
    )

    if (version) {
      details.push({
        title: `#${version}`,
        description: t('Version'),
      })
    }

    return (
      <List.Item
        icon={ICON_TYPES[detail.type]}
        status={status}
        className={styles.item}
        title={
          <Link to={`${prefix}/${detail.type}/${detail.name}`}>
            {detail.name}
          </Link>
        }
        description={this.getDescription(reason, status, detail)}
        extra={this.renderExtra()}
        details={details}
      />
    )
  }
}
