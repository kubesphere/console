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

import React, { Component } from 'react'
import classNames from 'classnames'
import { debounce } from 'lodash'
import { Checkbox, Icon } from '@kube-design/components'

import styles from './index.scss'

export default class SchedulePlacement extends Component {
  state = {
    weight: this.props.weight || 0,
    isChecked: true,
  }

  triggerChange = debounce(() => {
    const { cluster, handleClusterChange } = this.props
    const { weight } = this.state

    handleClusterChange(weight, cluster)
  }, 200)

  handleSubStract = () => {
    this.setState(
      ({ weight }) => ({ weight: Math.max(weight - 1, 1) }),
      () => {
        this.triggerChange()
      }
    )
  }

  handleAdd = () => {
    this.setState(
      ({ weight }) => ({ weight: weight + 1 }),
      () => {
        this.triggerChange()
      }
    )
  }

  handleWrapperClick = () => {
    this.setState(
      ({ isChecked }) => ({
        weight: isChecked ? 0 : 1,
        isChecked: !isChecked,
      }),
      () => {
        this.triggerChange()
      }
    )
  }

  stopPropagation = e => e.stopPropagation()

  render() {
    const { cluster } = this.props
    const { weight, isChecked } = this.state
    return (
      <div
        className={classNames(styles.wrapper, { [styles.checked]: isChecked })}
        onClick={this.handleWrapperClick}
      >
        <Checkbox checked={isChecked} onClick={this.handleWrapperClick}>
          {cluster}
        </Checkbox>
        <div className={styles.replicas} onClick={this.stopPropagation}>
          <Icon
            name="substract"
            type="light"
            size={20}
            clickable
            disabled={!isChecked}
            onClick={this.handleSubStract}
          />
          <span className={styles.value}>
            {weight}
            <span> {t('WEIGHT')}</span>
          </span>
          <Icon
            name="add"
            type="light"
            size={20}
            clickable
            disabled={!isChecked}
            onClick={this.handleAdd}
          />
        </div>
      </div>
    )
  }
}
