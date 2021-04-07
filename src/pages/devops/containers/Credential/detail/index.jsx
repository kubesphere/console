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

import CredentialStore from 'stores/devops/credential'
import Status from 'devops/components/Status'
import DetailPage from 'devops/containers/Base/Detail'
import { trigger } from 'utils/action'
import { get } from 'lodash'
import routes from './routes'

@inject('rootStore', 'devopsStore')
@observer
@trigger
export default class CredentialDetail extends React.Component {
  state = {
    showEdit: false,
    showYamlEdit: false,
    deleteModule: false,
    isLoading: true,
  }

  get module() {
    return 'credentials'
  }

  get listUrl() {
    const { workspace, devops, cluster } = this.props.match.params
    return `/${workspace}/clusters/${cluster}/devops/${devops}/credentials`
  }

  get devops() {
    return this.props.match.params.devops
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get routing() {
    return this.props.rootStore.routing
  }

  store = new CredentialStore(this.module)

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    const { params } = this.props.match
    this.store.setParams(params)
    this.store.fetchDetail()
    this.store.getUsageDetail()
  }

  getOperations = () => [
    {
      key: 'edit',
      type: 'control',
      text: t('EDIT'),
      action: 'edit',
      onClick: () => {
        this.trigger('devops.credential.edit', {
          title: t('Edit Credential'),
          formTemplate: this.store.detail,
          cluster: this.cluster,
          devops: this.devops,
          isEditMode: true,
          success: () => {
            this.store.fetchDetail()
          },
        })
      },
    },
    {
      key: 'delete',
      type: 'danger',
      text: t('Delete'),
      action: 'delete',
      onClick: () => {
        this.trigger('resource.delete', {
          type: t('Credentials'),
          detail: this.store.detail,
          success: () => {
            const { devops, workspace, cluster } = this.props.match.params
            this.routing.push(
              `/${workspace}/clusters/${cluster}/devops/${devops}/${this.module}`
            )
          },
        })
      },
    },
  ]

  getPipelineStatus = status => {
    const CONFIG = {
      failed: { type: 'failure', label: t('Failure') },
      pending: { type: 'running', label: t('Running') },
      working: { type: 'running', label: t('Running') },
      successful: { type: 'success', label: t('Success') },
    }

    return { ...CONFIG[status] }
  }

  getAttrs = () => {
    const { detail, usage } = this.store
    const status = get(
      detail,
      'annotations["credential.devops.kubesphere.io/syncstatus"]'
    )

    return [
      {
        name: t('Type'),
        value: t(detail.type),
      },
      {
        name: t('Description'),
        value: detail.description,
      },
      {
        name: t('Domain'),
        value: usage.domain,
      },
      {
        name: t('Sync Status'),
        value: <Status {...this.getPipelineStatus(status)} />,
      },
    ]
  }

  render() {
    const { detail } = this.store
    const stores = { detailStore: this.store }

    const sideProps = {
      module: this.module,
      name: detail.id,
      labels: detail.labels,
      desc: detail.description,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('Credentials'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage routes={routes} {...sideProps} stores={stores} />
  }
}
