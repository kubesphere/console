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

import { getLocalTime } from 'utils'
import { getComponentStatus } from 'utils/status'
import ComponentStore from 'stores/component'

import Base from 'core/containers/Base/Detail'
import { Status } from 'components/Base'

@inject('rootStore')
@observer
export default class ComponentDetail extends Base {
  get name() {
    return 'Service Component'
  }

  get authKey() {
    return 'components'
  }

  get listUrl() {
    return `/components`
  }

  init() {
    this.store = new ComponentStore(this.module)
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params).catch(this.catch)
  }

  getOperations = () => []

  getAttrs = () => {
    const { detail } = this.store

    const status = getComponentStatus(detail)

    return [
      {
        name: t('Status'),
        value: <Status type={status} name={t(status)} />,
      },
      {
        name: t('Project'),
        value: detail.namespace,
      },
      {
        name: t('Instance Count'),
        value: `${detail.healthyBackends} / ${detail.totalBackends}`,
      },
      {
        name: t('Created Time'),
        value: getLocalTime(detail.startedAt).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }
}
