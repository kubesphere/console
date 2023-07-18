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

import { List } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import React from 'react'
import { getLocalTime } from 'utils'

import styles from './index.scss'

export default class ClusterCard extends React.Component {
  handleClick = () => {
    const { data, onEnter } = this.props
    onEnter && onEnter(data.name)
  }

  render() {
    const { data } = this.props

    const details = [
      {
        title: data.nodeCount,
        description: t('NODE_COUNT'),
      },
      {
        title: data.kubernetesVersion,
        description: t('KUBERNETES_VERSION'),
      },
      {
        title: data.provider ?? '-',
        description: t('PROVIDER'),
        className: styles.provider,
        withDomTitle: true,
      },
      {
        title: data.createTime
          ? getLocalTime(data.createTime).format(`YYYY-MM-DD HH:mm:ss`)
          : '-',
        description: t('CREATION_TIME'),
      },
    ]

    const title = <ClusterTitle cluster={data} />

    return (
      <List.Item
        className={styles.wrapper}
        titleClass={styles.title}
        title={title}
        details={details}
        onClick={this.handleClick}
      />
    )
  }
}
