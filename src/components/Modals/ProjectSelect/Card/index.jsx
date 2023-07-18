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

import classNames from 'classnames'
import { List } from 'components/Base'
import React from 'react'
import { getDisplayNameNew, getLocalTime } from 'utils'

import styles from './index.scss'

export default class ProjectCard extends React.Component {
  handleClick = () => {
    const { onEnter, data } = this.props
    if (data.status === 'Terminating') {
      return
    }

    onEnter && onEnter(data)
  }

  render() {
    const { type, data } = this.props

    let name
    let desc
    let icon
    let admin
    let createTime
    if (type === 'devops') {
      name = getDisplayNameNew(data)
      desc = data.description || '-'
      admin = data.creator
      createTime = data.create_time || data.createTime
      icon = 'strategy-group'
    } else {
      name = getDisplayNameNew(data)
      desc = data.description || '-'
      admin = data.creator
      createTime = data.createTime
      icon = 'project'
    }

    const isTerminating =
      data.status === 'Terminating' || data.status === 'Pending'
    name = (
      <div className={classNames(styles.name, 'ellipsis')} title={name}>
        {isTerminating ? name : <a>{name}</a>}
      </div>
    )

    desc = isTerminating ? t(data.status) : desc

    const details = [
      { title: admin || '-', description: t('CREATOR') },
      {
        title: getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss'),
        description: t('CREATION_TIME'),
      },
    ]

    return (
      <List.Item
        className={classNames(styles.wrapper, {
          [styles.disabled]: isTerminating,
        })}
        icon={icon}
        title={name}
        description={desc}
        details={details}
        onClick={this.handleClick}
        withDomDesc
      />
    )
  }
}
