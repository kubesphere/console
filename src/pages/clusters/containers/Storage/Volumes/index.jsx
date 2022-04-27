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
 *
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { observer, inject } from 'mobx-react'
import Banner from 'components/Cards/Banner'
import { renderRoutes } from 'utils/router.config'
import PVStore from 'stores/pv'
import routes from './routes'

@inject('rootStore')
@observer
export default class Volumes extends React.Component {
  constructor(props) {
    super(props)
    this.pv = new PVStore()
  }

  get tips() {
    return [
      {
        title: t('WHAT_IS_STORAGE_CLASS_Q'),
        description: t('WHAT_IS_STORAGE_CLASS_A'),
      },
      {
        title: t('WHAT_IS_LOCAL_VOLUME_Q'),
        description: t('WHAT_IS_LOCAL_VOLUME_A'),
      },
    ]
  }

  get bannerProps() {
    return {
      className: 'margin-b12',
      description: t('PERSISTENT_VOLUME_CLAIM_DESC'),
      module: 'persistentvolumeclaims',
      title: t('PERSISTENT_VOLUME_CLAIM_PL'),
    }
  }

  get routes() {
    return routes
      .filter(item => !!item.title)
      .map(item => ({
        ...item,
        name: item.path.split('/').pop(),
      }))
  }

  componentDidMount() {
    this.pv.getKsVersion(this.props.match.params)
  }

  renderBanner() {
    if (this.pv.ksVersion >= 3.2) {
      return (
        <Banner {...this.bannerProps} tips={this.tips} routes={this.routes} />
      )
    }
    return <Banner {...this.bannerProps} tips={this.tips} />
  }

  render() {
    return (
      <>
        {this.renderBanner()}
        {renderRoutes(routes)}
      </>
    )
  }
}
