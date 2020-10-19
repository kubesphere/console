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
import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class Banner extends React.Component {
  render() {
    const { icon, image, title, desc } = this.props
    return (
      <div className={styles.banner}>
        <div className={styles.icon}>
          {image ? (
            <img src={image} alt="" />
          ) : (
            <Icon name={icon} type="light" size={36} />
          )}
        </div>
        <div className={styles.title}>
          <div className="h3">{title}</div>
          <p>{desc}</p>
        </div>
      </div>
    )
  }
}
