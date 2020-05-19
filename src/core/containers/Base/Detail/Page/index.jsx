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
import { NavLink, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { Loading } from '@pitrix/lego-ui'
import pathToRegexp from 'path-to-regexp'

import { ICON_TYPES } from 'utils/constants'
import { renderRoutes } from 'utils/router.config'

import BaseInfo from '../BaseInfo'

import styles from './index.scss'

@withRouter
export default class DetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = { initializing: true }
    this.stores = {}
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    this.setState({ initializing: false })
  }

  renderNav(routes) {
    const { params } = this.props.match

    return (
      <div className={styles.nav}>
        {routes.map(route => {
          if (!route.title) {
            return null
          }

          return (
            <NavLink
              key={route.path}
              className={styles.navItem}
              activeClassName={styles.active}
              to={pathToRegexp.compile(route.path)(params)}
            >
              {t(route.title)}
            </NavLink>
          )
        })}
      </div>
    )
  }

  render() {
    const { sideProps, routes, stores } = this.props

    if (this.state.initializing) {
      return <Loading className="ks-page-loading" />
    }

    return (
      <Provider {...this.stores} {...stores}>
        <div className={styles.main}>
          <div className={styles.sider}>
            <BaseInfo
              {...sideProps}
              icon={sideProps.icon || ICON_TYPES[sideProps.module]}
            />
          </div>
          <div className={styles.content}>
            {this.renderNav(routes)}
            {renderRoutes(routes)}
          </div>
        </div>
      </Provider>
    )
  }
}
