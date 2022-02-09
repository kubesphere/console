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

  refreshTimer = setInterval(() => this.refreshHandler(), 4000)

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

  get isRuning() {
    const { detail } = this.store

    const status = get(
      detail,
      'annotations["credential.devops.kubesphere.io/syncstatus"]'
    )

    return status === 'pending' || status === 'working'
  }

  store = new CredentialStore(this.module)

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate() {
    if (this.refreshTimer === null && this.isRuning) {
      this.refreshTimer = setInterval(() => this.refreshHandler(), 4000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer)
  }

  refreshHandler = () => {
    if (this.isRuning) {
      this.store.fetchDetail()
    } else {
      clearInterval(this.refreshTimer)
      this.refreshTimer = null
    }
  }

  fetchData = () => {
    const { params } = this.props.match
    this.store.setParams(params)
    this.store.fetchDetail()
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
      text: t('DELETE'),
      action: 'delete',
      onClick: () => {
        this.trigger('resource.delete', {
          type: 'CREDENTIAL',
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
      failed: { type: 'failure', label: t('FAILED') },
      pending: { type: 'running', label: t('RUNNING') },
      working: { type: 'running', label: t('RUNNING') },
      successful: { type: 'success', label: t('SUCCESSFUL') },
    }

    return { ...CONFIG[status] }
  }

  getAttrs = () => {
    const { detail } = this.store
    const status = get(
      detail,
      'annotations["credential.devops.kubesphere.io/syncstatus"]'
    )

    return [
      {
        name: t('TYPE'),
        value: t(detail.type),
      },
      {
        name: t('DESCRIPTION'),
        value: detail.description,
      },
      {
        name: t('SYNC_STATUS'),
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
      desc: detail.description,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('CREDENTIAL_PL'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage routes={routes} {...sideProps} stores={stores} />
  }
}
