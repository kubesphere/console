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

import { Radio } from '@kube-design/components'
import { Text } from 'components/Base'
import { get } from 'lodash'
import StatusReason from 'projects/components/StatusReason'
import WorkloadStatus from 'projects/components/WorkloadStatus'
import PropTypes from 'prop-types'
import React from 'react'
import { getDisplayName, getLocalTime } from 'utils'
import { ICON_TYPES } from 'utils/constants'
import { getWorkloadStatus } from 'utils/status'

import styles from './index.scss'

export default class Card extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    detail: PropTypes.object,
  }

  static defaultProps = {
    detail: {},
    onDelete() {},
    onEdit() {},
  }

  getDescription(detail) {
    const { status, reason } = getWorkloadStatus(detail, detail.module)

    if (reason) {
      return <StatusReason status={status} reason={t(reason)} data={detail} />
    }

    const { updateTime, createTime } = detail

    if (updateTime) {
      return t('UPDATED_AGO', { diff: getLocalTime(updateTime).fromNow() })
    }

    return t('CREATED_AGO', { diff: getLocalTime(createTime).fromNow() })
  }

  render() {
    const { detail, onClick, isChecked } = this.props

    if (!detail) {
      return null
    }

    const version = get(
      detail,
      'annotations["deployment.kubernetes.io/revision"]'
    )

    const { labels } = detail

    const hasCumstomScaling = Object.keys(labels).includes(
      'autoscaling.kubeshpere.io/name'
    )

    const hasHpa = !!get(detail, "annotations['kubesphere.io/relatedHPA']")

    return (
      <div
        className={styles.card}
        onClick={() => {
          onClick && onClick()
        }}
      >
        <Radio checked={isChecked} disabled={hasCumstomScaling || hasHpa}>
          <Text
            icon={ICON_TYPES[detail.module]}
            title={getDisplayName(detail)}
            description={this.getDescription(detail)}
          />
          <Text
            title={<WorkloadStatus data={detail} module={detail.module} />}
            description={t('STATUS')}
          />
          {detail.module === 'deployments' ? (
            <Text
              title={version ? `#${version}` : '-'}
              description={t('REVISION_RECORD')}
            />
          ) : null}
        </Radio>
      </div>
    )
  }
}
