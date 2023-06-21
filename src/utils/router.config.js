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

import { get, isObject, isString, set } from 'lodash'
import React from 'react'
import { Route, Switch } from 'react-router'
import { Redirect } from 'react-router-dom'

export const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        const key = route.key || i

        if (route.redirect) {
          const { redirect } = route

          if (isString(redirect)) return <Redirect key={key} to={redirect} />

          if (isObject(redirect)) {
            return <Redirect key={key} {...redirect} />
          }
        }

        return (
          <Route
            key={key}
            exact={route.exact}
            path={route.path}
            render={props => {
              set(globals, 'currentCluster', props.match.params.cluster)
              set(globals, 'currentWorkspace', props.match.params.workspace)
              if (route.render) {
                return route.render(props)
              }
              return (
                <route.component {...props} {...extraProps} route={route} />
              )
            }}
            strict={route.strict}
          />
        )
      })}
    </Switch>
  ) : null

export const getIndexRoute = ({ path, to, ...rest }) => ({
  path,
  redirect: {
    from: path,
    to,
    ...rest,
  },
})

export const getChildRoutes = (routes, path) => {
  const newRoutes = routes.map(route => ({
    ...route,
    path: `${path}/${route.name}`,
  }))

  newRoutes.push(
    getIndexRoute({ path, to: get(newRoutes[0], 'path'), exact: true }),
    getIndexRoute({ path: '*', to: '/404', exact: true })
  )

  return newRoutes
}
