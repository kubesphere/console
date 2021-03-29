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
import { Icon, Button } from '@kube-design/components'

import { ICON_TYPES } from 'utils/constants'

import styles from './index.scss'
import BillIcon from '../BillIcon'

export default class Crumb extends React.Component {
  static propTypes = {
    crumbData: PropTypes.array,
    handleCrumbOperation: PropTypes.func,
    loading: PropTypes.bool,
    cluster: PropTypes.string,
  }

  get crumbData() {
    return this.props.crumbData
  }

  renderCrumbContainer = () => {
    const container = []
    const length = this.crumbData.length
    this.crumbData.forEach((item, index) => {
      container.push(
        <div key={`${item.name}-${item.type}`} title={item.name}>
          <BillIcon
            icon={ICON_TYPES[item.type]}
            type={item.type}
            name={item.name}
            crumb
          />
          <span className={styles.crumbTitle}>
            {index === 0 && item.type !== 'cluster' && this.props.cluster
              ? `${item.name} (${this.props.cluster})`
              : item.name}
          </span>
          {index !== length - 1 ? <Icon name="caret-right" /> : null}
        </div>
      )
    })

    return container
  }

  render() {
    const { handleCrumbOperation, loading } = this.props

    return (
      <div className={styles.crumbContainer}>
        <Button
          icon="chevron-left"
          iconType="light"
          disabled={loading}
          onClick={() => handleCrumbOperation('back')}
        />
        <Button
          icon="chevron-right"
          iconType="light"
          disabled={loading}
          onClick={() => handleCrumbOperation('front')}
        />
        <div className={styles.crumb}>{this.renderCrumbContainer()}</div>
      </div>
    )
  }
}
