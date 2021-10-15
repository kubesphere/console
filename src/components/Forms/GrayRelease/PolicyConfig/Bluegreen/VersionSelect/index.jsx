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
import classNames from 'classnames'

import { Button, Icon } from '@kube-design/components'

import styles from './index.scss'

export default class VersionSelect extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: '',
    options: [],
    onChange() {},
  }

  handleTakeOver = e => {
    this.props.onChange(e.currentTarget.dataset.version)
  }

  handleOffline = e => {
    const { onChange, options } = this.props
    const { version } = e.currentTarget.dataset
    const selectOption = options.find(option => option.name !== version)
    selectOption && onChange(selectOption.name)
  }

  render() {
    const { value, options } = this.props

    return (
      <ul className={styles.wrapper}>
        {options.map(option => (
          <li
            key={option.name}
            className={classNames({ [styles.selected]: value === option.name })}
          >
            <Icon name="appcenter" size={40} />
            <div className={styles.text}>
              <p>{t('GRAYSCALE_VERSION', { version: option.name })}</p>
              <p>
                {option.replicas === 1
                  ? t('GRAYSCALE_REPLICA_SI', { count: option.replicas })
                  : t('GRAYSCALE_REPLICA_PL', { count: option.replicas })}
              </p>
            </div>
            {value !== option.name ? (
              <Button
                className={styles.button}
                type="control"
                data-version={option.name}
                onClick={this.handleTakeOver}
              >
                {t('TAKE_OVER')}
              </Button>
            ) : (
              <Button
                className={styles.button}
                data-version={option.name}
                onClick={this.handleOffline}
              >
                {t('TAKE_OFFLINE')}
              </Button>
            )}
          </li>
        ))}
      </ul>
    )
  }
}
