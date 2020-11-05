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
import { isEmpty } from 'lodash'
import { Panel } from 'components/Base'

import Item from './Item'

import styles from './index.scss'

export default class ServiceMonitors extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    data: [],
    loading: false,
  }

  renderContent() {
    const { data } = this.props

    if (isEmpty(data)) return null

    return (
      <div className={styles.content}>
        {data.map(item => (
          <Item key={item.name} detail={item} />
        ))}
      </div>
    )
  }

  render() {
    const { className, loading } = this.props
    return (
      <Panel
        className={className}
        title={t('Application Monitoring Exporter')}
        loading={loading}
      >
        {this.renderContent()}
      </Panel>
    )
  }
}
