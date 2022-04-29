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
import { Netmask } from 'netmask'
import { getDisplayName, getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import IPPoolStore from 'stores/network/ippool'

import DetailPage from 'clusters/containers/Base/Detail'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class IPPoolDetail extends React.Component {
  store = new IPPoolStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'ippools'
  }

  get name() {
    return 'POD_IP_POOL'
  }

  get listUrl() {
    const { cluster } = this.props.match.params
    return `/clusters/${cluster}/ippools`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get params() {
    return get(this.props.match, 'params', {})
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => {
    const type = this.name
    const detail = toJS(this.store.detail)
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        type: 'control',
        onClick: () =>
          this.trigger('resource.baseinfo.edit', {
            type,
            detail,
            success: this.fetchData,
          }),
      },
      {
        key: 'viewYaml',
        icon: 'eye',
        text: t('VIEW_YAML'),
        action: 'view',
        onClick: () =>
          this.trigger('resource.yaml.edit', {
            detail,
            readOnly: true,
          }),
      },
      {
        key: 'modify',
        icon: 'enterprise',
        text: t('ASSIGN_WORKSPACE'),
        action: 'edit',
        onClick: () =>
          this.trigger('network.ipool.assignworkspace', {
            detail,
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
            type,
            detail,
            success: () => this.routing.push(this.listUrl),
          }),
      },
    ]
  }

  getAttrs = () => {
    const detail = toJS(this.store.detail)

    if (isEmpty(detail)) {
      return
    }

    const block = new Netmask(detail.cidr)

    return [
      {
        name: t('NETWORK_SEGMENT'),
        value: detail.cidr,
      },
      {
        name: t('NETWORK'),
        value: block.base,
      },
      {
        name: t('START_IP_ADDRESS'),
        value: block.base,
      },
      {
        name: t('END_IP_ADDRESS'),
        value: block.broadcast,
      },
      {
        name: t('CREATION_TIME_TCAP'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('CREATOR'),
        value: detail.creator || '-',
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
          label: t('POD_IP_POOL_PL'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
