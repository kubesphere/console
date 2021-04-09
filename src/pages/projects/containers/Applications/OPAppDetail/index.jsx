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
import { Loading, Tooltip } from '@kube-design/components'

import { getDisplayName, getLocalTime } from 'utils'
import { trigger } from 'utils/action'
import AppStore from 'stores/openpitrix/application'

import { Image, Status } from 'components/Base'

import DetailPage from 'projects/containers/Base/Detail'

import routes from './routes'

import styles from './index.scss'

@inject('rootStore', 'projectStore')
@observer
@trigger
export default class OPAppDetail extends React.Component {
  store = new AppStore()

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return 'applications'
  }

  get name() {
    return 'Application'
  }

  get listUrl() {
    const { cluster, workspace, namespace } = this.props.match.params

    return `/${workspace}/clusters/${cluster}/projects/${namespace}/${this.module}/template`
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
      text: t('Edit Info'),
      action: 'edit',
      onClick: () =>
        this.trigger('openpitrix.app.edit', {
          type: t(this.name),
          detail: toJS(this.store.detail),
          success: this.fetchData,
        }),
    },
    {
      key: 'editTemplate',
      icon: 'pen',
      text: t('EDIT_TEMPLATE'),
      action: 'edit',
      onClick: () =>
        this.trigger('openpitrix.app.template.edit', {
          ...this.props.match.params,
          detail: toJS(this.store.detail),
          success: this.fetchData,
        }),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('Delete'),
      action: 'delete',
      type: 'danger',
      onClick: () =>
        this.trigger('resource.delete', {
          type: t(this.name),
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
        name: t('Cluster'),
        value: cluster,
      },
      {
        name: t('Project'),
        value: namespace,
      },
      {
        name: t('Status'),
        value: this.renderStatus(),
      },
      {
        name: t('Application'),
        value: get(detail, 'app.name', '-'),
      },
      {
        name: t('Version'),
        value: get(detail, 'version.name', '-'),
      },
      {
        name: t('Created Time'),
        value: getLocalTime(get(detail, 'create_time')).format(
          'YYYY-MM-DD HH:mm:ss'
        ),
      },
      {
        name: t('Updated Time'),
        value: getLocalTime(get(detail, 'status_time')).format(
          'YYYY-MM-DD HH:mm:ss'
        ),
      },
      {
        name: t('Creator'),
        value: detail.owner,
      },
    ]
  }

  renderStatus = () => {
    const detail = toJS(this.store.detail)
    const status = detail.status

    if (detail.additional_info) {
      return (
        <Tooltip content={detail.additional_info}>
          <Status name={t(status)} type={status} />
        </Tooltip>
      )
    }

    return <Status name={t(status)} type={status} />
  }

  render() {
    const detail = toJS(this.store.detail)

    const stores = { detailStore: this.store }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const icon = (
      <label className={styles.icon}>
        <Image
          iconLetter={get(detail, 'app.name')}
          src={get(detail, 'app.icon')}
          alt=""
        />
      </label>
    )

    const sideProps = {
      icon,
      module: this.module,
      name: getDisplayName(this.store.detail),
      desc: this.store.detail.description,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('Applications'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} {...sideProps} routes={routes} />
  }
}
