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
import { observer, inject } from 'mobx-react'

import { renderRoutes } from 'utils/router.config'

import { Banner, Nav } from 'components/Base'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class Reviews extends React.Component {
  renderHeader() {
    const { route, match } = this.props

    return (
      <div className={styles.header}>
        <Banner
          type="white"
          icon="safe-notice"
          name={t('App Review')}
          desc={t('APP_REVIEW_DESC')}
          className={styles.banner}
        />
        <div className={styles.nav}>
          <Nav route={route} match={match} isDark />
        </div>
      </div>
    )
  }

  render() {
    const { route } = this.props

    return (
      <div className={styles.wrapper}>
        {this.renderHeader()}
        <div className={styles.main}>{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}
