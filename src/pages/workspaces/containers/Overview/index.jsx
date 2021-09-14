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

import Banner from 'components/Cards/Banner'

import styles from './index.scss'

@inject('rootStore')
@observer
class WorkspaceOverview extends React.Component {
  get tips() {
    return [
      {
        title: t('HOW_TO_APPLY_MORE_CLUSTER_Q'),
        description: t('HOW_TO_APPLY_MORE_CLUSTER_A'),
      },
    ]
  }

  renderBanner() {
    const { route } = this.props

    return (
      <div className={styles.banner}>
        <Banner
          className={styles.header}
          icon="dashboard"
          title={t('OVERVIEW')}
          description={t('WORKSPACE_OVERVIEW_DESC')}
          module={this.module}
          routes={route.routes}
          tips={globals.app.isMultiCluster ? this.tips : []}
        />
      </div>
    )
  }

  render() {
    const { route } = this.props

    return (
      <div className={styles.wrapper}>
        {this.renderBanner()}
        <div className={styles.main}>{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}

export default WorkspaceOverview
