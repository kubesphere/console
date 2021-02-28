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
import { Icon } from '@kube-design/components'
import { Text } from 'components/Base'

import styles from './index.scss'

export default class WorkspaceItem extends Component {
  handleClick = () => {
    const { data, onClick } = this.props
    onClick(data)
  }

  render() {
    const { data, type, disabled } = this.props

    if (data.name === globals.config.systemWorkspace) {
      return null
    }

    return (
      <div
        className={classNames(styles.wrapper, { [styles.disabled]: disabled })}
        onClick={!disabled ? this.handleClick : null}
      >
        {!disabled && type === 'authed' && (
          <Icon name="chevron-left" size={20} />
        )}
        <Text
          className={styles.title}
          icon="enterprise"
          title={data.name}
          description={data.description || '-'}
          ellipsis
        />
        <Text
          className={styles.manager}
          title={data.manager}
          description={t('Manager')}
        />
        {!disabled && type !== 'authed' && (
          <Icon name="chevron-right" size={20} />
        )}
      </div>
    )
  }
}
