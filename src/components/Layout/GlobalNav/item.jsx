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
import { Link } from 'react-router-dom'
import { Icon } from '@pitrix/lego-ui'

import styles from './index.scss'

export default class NavItem extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  }

  renderIcon(icon) {
    return <Icon name={icon} />
  }

  render() {
    const { data, onClick } = this.props
    return (
      <Link to={`/${data.name}`} onClick={onClick}>
        <div className={styles.nav}>
          <div className={styles.icon}>
            <Icon name={data.icon} size={60} type="light" />
          </div>
          <div className={styles.title}>{t(data.title)}</div>
          <div className={styles.desc}>
            {t(
              data.desc ||
                `${data.title.replace(/\s/g, '_').toUpperCase()}_DESC`
            )}
          </div>
          <div className={styles.bottomIcon}>
            <Icon name={data.icon} size={320} type="light" />
          </div>
        </div>
      </Link>
    )
  }
}
