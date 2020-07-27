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
import { get } from 'lodash'
import classnames from 'classnames'
import { AutoComplete, Dropdown, Icon } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class MetircQueryInput extends Component {
  optionRenderer({ desc }, matchNode) {
    return (
      <div>
        {matchNode}
        {desc && <p className={styles.description}>{desc}</p>}
      </div>
    )
  }

  onDropdownClick = e => {
    const metric = get(e, 'currentTarget.dataset.metric')
    this.props.onChange(metric)
  }

  onSelected = ({ value }) => {
    this.props.onChange(value)
  }

  render() {
    const {
      name,
      supportDebugButton = false,
      value,
      supportMetrics,
      onChange,
    } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.dropdown}>
          <Dropdown content={this.renderDropDown()}>
            <span className={classnames(styles.dropdownBtn, styles.btn)}>
              {t('MONITOR_METRICS')}
              <Icon type="light" name={'caret-down'} />
            </span>
          </Dropdown>
        </div>

        <div className={styles.input}>
          <AutoComplete
            value={value}
            onChange={onChange}
            onSelected={this.onSelected}
            name={name}
            className={styles.autoComplete}
            options={supportMetrics}
            optionRenderer={this.optionRenderer}
            maxVisible={60}
          />
        </div>
        {supportDebugButton && (
          <div
            onClick={this.props.onDebugClick}
            className={classnames(styles.debug, styles.btn)}
          >
            <Icon name={'terminal'} type="light" />{' '}
            <span>{t('DEBUGB_DATA')}</span>
          </div>
        )}
      </div>
    )
  }

  renderDropDown() {
    return (
      <div className={styles.dropdownContent}>
        {this.props.supportMetrics.map(metric => (
          <p
            data-metric={metric.value}
            onClick={this.onDropdownClick}
            key={metric.value}
          >
            {metric.value}
          </p>
        ))}
      </div>
    )
  }
}
