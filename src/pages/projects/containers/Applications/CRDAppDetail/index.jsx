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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { get, isEmpty } from 'lodash'
import { Loading } from '@kube-design/components'

import { getDisplayName, getLocalTime, showNameAndAlias } from 'utils'
import { trigger } from 'utils/action'

import AppStore from 'stores/application/crd'
import { Status } from 'components/Base'
import DetailPage from 'projects/containers/Base/Detail'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class CRDAppDetail extends React.Component {
  store = new AppStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'applications'
  }

  get name() {
    return 'APP'
  }

  get listUrl() {
    const { workspace, cluster, namespace } = this.props.match.params

    return `/${workspace}/clusters/${cluster}/projects/${namespace}/${this.module}/composing`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  fetchData = () => {
    const { params } = this.props.match
    this.store.fetchDetail(params)
  }

  getOperations = () => [
    {
      key: 'edit',
      icon: 'pen',
      text: t('EDIT_INFORMATION'),
      action: 'edit',
      onClick: () =>
        this.trigger('resource.baseinfo.edit', {
          type: this.name,
          detail: toJS(this.store.detail),
          success: this.fetchData,
        }),
    },
    {
      key: 'addComponent',
      icon: 'add',
      text: t('ADD_SERVICE'),
      action: 'edit',
      onClick: () =>
        this.trigger('crd.app.addservice', {
          success: this.fetchComponents,
          detail: toJS(this.store.detail),
          ...this.props.match.params,
        }),
    },
    {
      key: 'addRoute',
      icon: 'add',
      text: t('ADD_ROUTE'),
      action: 'edit',
      onClick: () =>
        this.trigger('crd.app.addroute', {
          success: this.fetchData,
          detail: toJS(this.store.detail),
          ...this.props.match.params,
        }),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      onClick: () =>
        this.trigger('resource.delete', {
          type: this.name,
          detail: this.store.detail,
          success: () => this.routing.push(this.listUrl),
        }),
    },
  ]

  getAttrs = () => {
    const detail = toJS(this.store.detail)
    const { cluster, namespace } = this.props.match.params

    if (isEmpty(detail)) {
      return
    }

    return [
      {
        name: t('CLUSTER'),
        value: showNameAndAlias(cluster, 'cluster'),
      },
      {
        name: t('PROJECT'),
        value: showNameAndAlias(namespace, 'project'),
      },
      {
        name: t('STATUS'),
        value: <Status name={t(detail.status)} type={detail.status} />,
      },
      {
        name: t('VERSION'),
        value: detail.version,
      },
      {
        name: t('CREATION_TIME_TCAP'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('UPDATE_TIME_TCAP'),
        value: getLocalTime(detail.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('CREATOR'),
        value: detail.creator,
      },
      {
        name: t('APPLICATION_GOVERNANCE_SCAP'),
        value:
          get(detail, 'annotations["servicemesh.kubesphere.io/enabled"]') ===
          'true'
            ? t('ON')
            : t('OFF'),
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
          label: t('APP_PL'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} {...sideProps} routes={routes} />
  }
}
