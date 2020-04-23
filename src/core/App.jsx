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
import { Router } from 'react-router'
import { renderRoutes } from 'utils/router.config'
import { Provider } from 'mobx-react'

import 'scss/main.scss'

import actions from 'src/actions'
import routes from './routes'

class App extends Component {
  static propTypes = {
    rootStore: PropTypes.object,
    history: PropTypes.object,
  }

  componentDidMount() {
    this.props.rootStore.registerActions(actions)
  }

  render() {
    const { rootStore, history } = this.props

    return (
      <Provider rootStore={rootStore}>
        <Router history={history}>{renderRoutes(routes)}</Router>
      </Provider>
    )
  }
}

export default App
