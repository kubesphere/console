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
import { Loading } from '@kube-design/components'

import { getLocalTime, getDisplayName, showNameAndAlias } from 'utils'
import { getComponentStatus } from 'utils/status'
import ComponentStore from 'stores/component'
import { Status } from 'components/Base'
import DetailPage from 'clusters/containers/Base/Detail'

import routes from './routes'

@inject('rootStore')
@observer
export default class ComponentDetail extends React.Component {
  store = new ComponentStore()

  get name() {
    return 'SYSTEM_COMPONENT'
  }

  get module() {
    return 'components'
  }

  get listUrl() {
    const { cluster } = this.props.match.params
    return `/clusters/${cluster}/components`
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => []

  getAttrs = () => {
    const { detail } = this.store

    const status = getComponentStatus(detail)

    return [
      {
        name: t('STATUS'),
        value: <Status type={status} name={t(status)} />,
      },
      {
        name: t('CLUSTER'),
        value: showNameAndAlias(this.props.match.params.cluster, 'cluster'),
      },
      {
        name: t('PROJECT'),
        value: showNameAndAlias(detail.namespace, 'project'),
      },
      {
        name: t('REPLICA_COUNT'),
        value: `${detail.healthyBackends}/${detail.totalBackends}`,
      },
      {
        name: t('CREATION_TIME_TCAP'),
        value: getLocalTime(detail.startedAt).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  render() {
    const stores = { detailStore: this.store }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      name: getDisplayName(this.store.detail),
      desc: this.store.detail.description,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('SYSTEM_COMPONENT_PL'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
