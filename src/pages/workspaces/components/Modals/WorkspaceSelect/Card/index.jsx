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
import { List } from 'components/Base'
import { getLocalTime } from 'utils'

import styles from './index.scss'

export default class WorkspaceCard extends React.Component {
  get canViewDevOps() {
    return globals.app.isMultiCluster || globals.app.hasKSModule('devops')
  }

  handleClick = () => {
    const { data, onEnter } = this.props
    onEnter && onEnter(data.name)
  }

  render() {
    const { data } = this.props

    const details = [
      {
        title: get(data, 'annotations["kubesphere.io/namespace-count"]', 0),
        description: t('Project Number'),
      },
      ...(this.canViewDevOps
        ? [
            {
              title: get(data, 'annotations["kubesphere.io/devops-count"]', 0),
              description: t('DevOps Project Number'),
            },
          ]
        : []),
      {
        title: data.createTime
          ? getLocalTime(data.createTime).format(`YYYY-MM-DD HH:mm:ss`)
          : '-',
        description: t('Created Time'),
      },
    ]

    return (
      <List.Item
        icon="enterprise"
        className={styles.wrapper}
        titleClass={styles.title}
        title={<a>{data.name}</a>}
        description={data.description || '-'}
        details={details}
        onClick={this.handleClick}
      />
    )
  }
}
