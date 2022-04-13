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
import { trigger } from 'utils/action'
import { get } from 'lodash'
import { observer, inject } from 'mobx-react'
import OutputStore from 'stores/logging/collection/output'
import DetailPage from 'clusters/containers/Base/Detail'
import { Loading } from '@kube-design/components'
import collectionConfig from '../config'

import routes from './routes'

import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
export default class LogCollectionDetail extends React.Component {
  store = new OutputStore()

  get listUrl() {
    const { cluster } = this.props.match.params
    return `/clusters/${cluster}/log-collections/${this.component}`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get component() {
    return this.props.match.params.component
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    this.store.fetchDetail(this.props.match.params)
  }

  getAttrs() {
    return [
      {
        name: t('STATUS'),
        value: get(this.store, 'detail.enabled') ? t('ENABLED') : t('DISABLED'),
      },
    ]
  }

  getOperations = () => [
    {
      key: 'edit',
      type: 'control',
      text: t('EDIT'),
      action: 'edit',
      onClick: () =>
        this.trigger('log.collection.edit', {
          success: this.fetchData,
        }),
    },
    {
      key: 'changeStatus',
      text: t('CHANGE_STATUS'),
      icon: 'pin',
      action: 'edit',
      onClick: () =>
        this.trigger('log.collection.active.switch', {
          data: {
            enabled: Number(this.store.detail.enabled),
          },
          success: this.fetchData,
        }),
    },
    {
      key: 'delete',
      text: t('DELETE'),
      icon: 'trash',
      action: 'delete',
      type: 'danger',
      onClick: () =>
        this.trigger('resource.delete', {
          type: this.name,
          detail: this.store.detail,
          success: () => this.routing.push(this.listUrl),
        }),
    },
    {
      key: 'editYaml',
      text: t('EDIT_YAML'),
      icon: 'pen',
      action: 'edit',
      onClick: () => {
        this.trigger('resource.yaml.edit', {
          detail: this.store.detail,
          success: this.fetchData,
        })
      },
    },
  ]

  render() {
    const stores = { detailStore: this.store }
    const collection = this.store.detail
    const collectionType = get(collection, 'type', '')
    const Icon = get(collectionConfig, `${collectionType}.ICON`)
    const name = get(collectionConfig, `${collectionType}.title`, t('LOADING'))
    const icon = Icon ? (
      <Icon className={styles.icon} width={32} height={32} />
    ) : (
      'Loading'
    )

    if (this.store.isLoading) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      name,
      icon,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('LOG_RECEIVER_PL'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
