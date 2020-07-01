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
import classNames from 'classnames'
import { Icon } from '@pitrix/lego-ui'

import styles from './index.scss'

const ServiceItem = ({ className, data, onClick }) => {
  const handleClick = () => onClick(data)
  return (
    <div className={classNames(styles.item, className)} onClick={handleClick}>
      <div className={styles.icon}>
        <Icon name="network-router" size={40} />
      </div>
      <div className={styles.name}>
        <div className="h6">{data.name}</div>
        <p>{t(data.type)}</p>
      </div>
    </div>
  )
}

export default ServiceItem
