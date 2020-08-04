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

import { isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isEqual from 'react-fast-compare'
import pathToRegexp from 'path-to-regexp'

import styles from './index.scss'

export default class Breadcrumb extends React.Component {
  static propTypes = {
    breadcrumbs: PropTypes.array,
    routes: PropTypes.array,
    params: PropTypes.object,
    pathname: PropTypes.string,
  }

  static defaultProps = {
    breadcrumbs: [],
    routes: [],
    params: {},
    pathname: '',
  }

  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(nextProps.breadcrumbs, this.props.breadcrumbs) ||
      !isEqual(nextProps.routes, this.props.routes) ||
      !isEqual(nextProps.params, this.props.params) ||
      nextProps.pathname !== this.props.pathname
    )
  }

  getCurrentPath() {
    const { pathname, routes } = this.props
    return routes
      .filter(item => item.name)
      .find(item => !isEmpty(pathToRegexp(item.path).exec(pathname)))
  }

  compile = value => {
    const { params } = this.props
    return pathToRegexp.compile(value)(params)
  }

  render() {
    const { breadcrumbs } = this.props

    const links = []

    breadcrumbs.forEach((item, index) => {
      const label = this.compile(item.label)

      if (index === 0) {
        return links.push(
          <Link key={index} to={this.compile(item.url)}>
            {t(label)}
          </Link>
        )
      }

      return links.push(
        <span key={`split-${index}`} className={styles.split}>
          /
        </span>,
        <Link key={index} to={this.compile(item.url)}>
          {t(label)}
        </Link>
      )
    })

    const currentPath = this.getCurrentPath()
    if (currentPath) {
      const index = links.length
      if (links.length > 0) {
        links.push(
          <span key={`split-${index}`} className={styles.split}>
            /
          </span>
        )
      }
      links.push(
        <span key={index} className={styles.current}>
          {t(currentPath.title)}
        </span>
      )
    }

    return <div className={styles.breadcrumb}>{links}</div>
  }
}
