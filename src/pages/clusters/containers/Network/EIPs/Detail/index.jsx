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
import { getDisplayName, getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import EIPStore from 'stores/network/eip'
import { Status } from 'components/Base'
import DetailPage from 'clusters/containers/Base/Detail'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class EIPDetail extends React.Component {
  store = new EIPStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'eips'
  }

  get name() {
    return 'EIP'
  }

  get listUrl() {
    const { cluster } = this.props.match.params
    return `/clusters/${cluster}/eips`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getOperations = () => {
    const type = t(this.name)
    const detail = toJS(this.store.detail)
    const { disable } = this.store.detail

    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit Info'),
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
        text: t('View YAML'),
        action: 'view',
        onClick: () =>
          this.trigger('resource.yaml.edit', {
            detail,
            readOnly: true,
          }),
      },
      {
        key: 'disable',
        icon: !disable ? 'stop' : 'start',
        text: !disable ? t('Disable') : t('Enable'),
        action: 'edit',
        onClick: this.handleSwitch,
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
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
    const status = get(detail, 'status', {})

    if (isEmpty(detail)) {
      return
    }

    return [
      {
        name: t('Status'),
        value: (
          <Status type={detail.importStatus} name={t(detail.importStatus)} />
        ),
      },
      {
        name: t('IP Address'),
        value: detail.address,
      },
      {
        name: t('Protocol'),
        value: detail.protocol,
      },
      {
        name: t('First Available'),
        value: status.firstIP,
      },
      {
        name: t('Last Available'),
        value: status.lastIP,
      },
      {
        name: t('Created Time'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('Creator'),
        value: detail.creator || '-',
      },
    ]
  }

  handleSwitch = () => {
    const detail = toJS(this.store.detail)

    this.store.switch(detail, !detail.disable).then(this.fetchData)
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
          label: t('EIP'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
