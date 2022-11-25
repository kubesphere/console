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
import { observer } from 'mobx-react'
import RevisionStore from 'stores/workload/revision'

import { Text } from 'components/Base'
import StatusReason from 'projects/components/StatusReason'
import WorkloadStatus from 'projects/components/WorkloadStatus'
import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES } from 'utils/constants'
import { getWorkloadStatus } from 'utils/status'

import styles from './index.scss'

@observer
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

  constructor(props) {
    super(props)

    this.revisionStore = new RevisionStore(props.detail.module)
  }

  get curRevision() {
    const { currentRevision } = this.revisionStore

    return `#${currentRevision}`
  }

  componentDidMount() {
    this.fetchData(this.props.detail)
  }

  fetchData = detail => {
    this.revisionStore.fetchCurrentRevision(detail)
  }

  getDescription(detail) {
    const { status, reason } = getWorkloadStatus(detail, detail.module)
    if (reason) {
      return <StatusReason status={status} reason={t(reason)} data={detail} />
    }

    const { updateTime, createTime } = detail
    if (updateTime) {
      return t('UPDATED_TIME', {
        value: getLocalTime(updateTime).format('YYYY-MM-DD HH:mm:ss'),
      })
    }

    return t('CREATED_TIME', {
      diff: getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss'),
    })
  }

  render() {
    const { detail, prefix } = this.props

    if (!detail) {
      return null
    }

    const kind = get(detail, 'module')

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
          title={kind ? t(`WORKLOAD_TYPE_${kind.toUpperCase()}`) : '-'}
          description={t('TYPE')}
        />
        <Text
          title={<WorkloadStatus data={detail} module={detail.module} />}
          description={t('STATUS')}
        />
        <Text title={this.curRevision} description={t('REVISION_RECORD')} />
      </div>
    )
  }
}
