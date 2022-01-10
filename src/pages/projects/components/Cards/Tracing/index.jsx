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
import { Icon } from '@kube-design/components'

import { Card } from 'components/Base'

import Item from './Item'

import styles from './index.scss'

export default class TracingCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
    loading: PropTypes.bool,
    operations: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node,
    ]),
    onItemClick: PropTypes.func,
  }

  static defaultProps = {
    prefix: '',
    data: [],
    onItemClick() {},
    loading: false,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.loading !== this.props.loading
  }

  renderContent() {
    const { data, onItemClick } = this.props

    if (isEmpty(data)) return null

    return (
      <div className={styles.cardContent}>
        {data.map(item => (
          <Item key={item.traceID} detail={item} onClick={onItemClick} />
        ))}
      </div>
    )
  }

  renderEmpty() {
    return (
      <div className={styles.empty}>
        <div>
          <div className={styles.icon}>
            <Icon name="target" size={40} />
          </div>
          <p>
            <strong>{t('NO_DATA')}</strong>
          </p>
          <p>{t('TRACING_NO_DATA_DESC')}</p>
        </div>
      </div>
    )
  }

  renderHeader() {
    const { operations } = this.props

    return (
      <div className={styles.cardHeader}>
        {operations && <div className={styles.operations}>{operations}</div>}
        {t('TRACING')}
      </div>
    )
  }

  render() {
    const { loading } = this.props

    return (
      <Card
        className={styles.tracing}
        header={this.renderHeader()}
        empty={this.renderEmpty()}
        loading={loading}
      >
        {this.renderContent()}
      </Card>
    )
  }
}
