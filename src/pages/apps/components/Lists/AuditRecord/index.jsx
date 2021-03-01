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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import { Loading } from '@kube-design/components'

import VersionStatus from 'apps/components/VersionStatus'
import AuditStore from 'stores/openpitrix/audit'
import { getLocalTime } from 'utils'

import styles from './index.scss'

@observer
export default class AuditRecord extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    appId: PropTypes.string,
    versionId: PropTypes.string,
  }

  static defaultProps = {
    appId: '',
    versionId: '',
  }

  constructor(props) {
    super(props)
    this.store = new AuditStore()
  }

  componentDidMount() {
    const { appId, versionId } = this.props
    this.store.fetchList({
      app_id: appId,
      version_id: versionId,
      noLimit: true,
    })
  }

  renderItem(item, index) {
    return (
      <ul key={`${index}-${item.status_time}`}>
        <li>
          <VersionStatus type={item.status} name={item.status} />
        </li>
        <li>{item.operator}</li>
        <li>{item.message || item.review_id || '-'}</li>
        <li className={styles.time}>
          {getLocalTime(item.status_time).format('YYYY-MM-DD HH:mm:ss')}
        </li>
      </ul>
    )
  }

  renderContent() {
    const { data } = this.store.list

    return (
      <div className={styles.itemMain}>
        {isEmpty(data) ? (
          <div className={styles.empty}>{t('RESOURCE_NOT_FOUND')}</div>
        ) : (
          data.map((item, index) => this.renderItem(item, index))
        )}
      </div>
    )
  }

  render() {
    const { className } = this.props
    const { isLoading } = this.store.list

    return (
      <div className={classnames(styles.main, className)}>
        {isLoading ? (
          <Loading className={styles.loading} />
        ) : (
          this.renderContent()
        )}
      </div>
    )
  }
}
