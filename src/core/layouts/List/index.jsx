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
import { renderRoutes } from 'utils/router.config'

import { Nav } from 'components/Layout'

class ListLayout extends Component {
  render() {
    const { navs, match, route, location } = this.props

    return (
      <div>
        <div className="list-nav-wrapper">
          <Nav
            className="list-nav"
            navs={navs}
            location={location}
            match={match}
          />
        </div>
        <div className="list-main">{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}

export default ListLayout
