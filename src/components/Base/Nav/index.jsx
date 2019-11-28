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
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'

import styles from './index.scss'

export default class Nav extends React.Component {
  static propTypes = {
    isDark: PropTypes.bool,
    route: PropTypes.object,
    match: PropTypes.object,
  }

  static defaultProps = {
    isDark: false,
    route: {},
    match: {},
  }

  render() {
    const { className, isDark, route, match } = this.props
    const routes = get(route, 'routes', [])

    return (
      <div
        className={classnames(
          styles.main,
          { [styles.dark]: isDark },
          className
        )}
      >
        {routes.map(({ name, title }) => {
          if (!name) return null

          return (
            <NavLink
              key={name}
              className={styles.item}
              activeClassName={styles.active}
              to={`${match.url}/${name}`}
            >
              {t(title)}
            </NavLink>
          )
        })}
      </div>
    )
  }
}
