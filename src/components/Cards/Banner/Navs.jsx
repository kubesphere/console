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
import { withRouter } from 'react-router'

import RadioGroup from './RadioGroup'

import styles from './index.scss'

@withRouter
export default class Navs extends React.Component {
  render() {
    const { routes, match, history } = this.props

    const tabs = routes
      .filter(route => !!route.name)
      .map(route => ({
        label: t(route.title),
        value: route.name,
        count: route.count,
      }))

    const matchTab =
      tabs.find(tab =>
        location.pathname.startsWith(`${match.url}/${tab.value}`)
      ) || {}

    const handleChange = value => history.push(`${match.url}/${value}`)

    return (
      <div className={styles.tabsWrapper}>
        <RadioGroup
          value={matchTab.value}
          onChange={handleChange}
          options={tabs}
        />
      </div>
    )
  }
}
