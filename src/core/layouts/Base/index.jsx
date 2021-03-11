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
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { isAppsPage } from 'utils'
import { getScrollTop } from 'utils/dom'
import { renderRoutes } from 'utils/router.config'

import { Header, GlobalNav } from 'components/Layout'
import Tools from 'components/KubeTools'
import GlobalSVG from 'components/SVG'

import styles from './index.scss'

const appStoreScrollThreshold = 10

@inject('rootStore')
@observer
class BaseLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.navRef = React.createRef()
    this.headerRef = React.createRef()

    this.routes = props.route.routes
  }

  get showKubeControl() {
    return globals.app.isClusterAdmin
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(prevProps) {
    const { showGlobalNav } = this.props.rootStore
    if (showGlobalNav && showGlobalNav !== prevProps.rootStore.showGlobalNav) {
      document.removeEventListener('click', this.handleClick)
      document.addEventListener('click', this.handleClick)
    }

    if (!globals.user && !isAppsPage(this.props.location.path)) {
      location.href = '/login'
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.throttleScroll)
  }

  handleScroll = () => {
    if (!this.headerRef || !this.headerRef.current) {
      return
    }

    const scrollTop = getScrollTop()
    const classes = this.headerRef.current.classList
    const hasShadow = classes.contains('header-shadow')
    const isDark = classes.contains('apps-dark-header')

    if (scrollTop >= 4 && !hasShadow) {
      classes.add('header-shadow')
    } else if (scrollTop < 4 && hasShadow) {
      classes.remove('header-shadow')
    }

    if (isAppsPage()) {
      if (scrollTop >= appStoreScrollThreshold && !isDark) {
        classes.add('apps-dark-header')
      } else if (scrollTop < appStoreScrollThreshold && isDark) {
        classes.remove('apps-dark-header')
      }
    }
  }

  handleClick = e => {
    if (this.navRef.current && !this.navRef.current.contains(e.target)) {
      this.props.rootStore.hideGlobalNav()
      document.removeEventListener('click', this.handleClick)
    }
  }

  handleJumpTo = link => {
    this.props.rootStore.routing.push(link)
  }

  render() {
    const { location, rootStore } = this.props
    return (
      <div>
        <GlobalSVG />
        <Header
          innerRef={this.headerRef}
          className={styles.header}
          location={location}
          onToggleNav={rootStore.toggleGlobalNav}
          jumpTo={this.handleJumpTo}
        />
        {globals.user && globals.app.enableGlobalNav && (
          <GlobalNav
            visible={rootStore.showGlobalNav}
            navs={globals.app.getGlobalNavs()}
            onCancel={rootStore.hideGlobalNav}
          />
        )}
        <div className={styles.main}>{renderRoutes(this.routes)}</div>
        {globals.user && <Tools />}
      </div>
    )
  }
}

export default BaseLayout
