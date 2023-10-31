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

import { get, isArray } from 'lodash'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'

import { Loading, Notify } from '@kube-design/components'

import S2IRunStore from 'stores/devops/imageBuilderRun'
import S2IBuilderStore from 'stores/devops/imgBuilder'
import ResourceStore from 'stores/workload/resource'
import { getDisplayName, getLocalTime, showNameAndAlias } from 'utils'
import { trigger } from 'utils/action'

import DetailPage from 'projects/containers/Base/Detail'

import getRoutes from './routes'

@inject('rootStore')
@observer
@trigger
export default class ImageBuilderDetail extends React.Component {
  store = new S2IBuilderStore()

  resourceStore = new ResourceStore(this.module)

  s2iRunStore = new S2IRunStore(this.name)

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return this.store.module
  }

  get name() {
    return this.props.match.params.name
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get params() {
    return {
      ...this.props.match.params,
      namespace: this.props.match.params.devops,
    }
  }

  get listUrl() {
    const { workspace, cluster, devops: namespace } = this.props.match.params
    return `${
      workspace ? `/${workspace}` : ''
    }/clusters/${cluster}/devops/${namespace}/imageBuilders`
  }

  fetchData = async () => {
    this.store.fetchDetail({ ...this.params })
    this.s2iRunStore.fetchListByK8s({
      cluster: this.props.match.params.cluster,
      namespace: this.props.match.params.devops,
    })
  }

  handleCopy = () => {
    Notify.success({
      content: t('COPIED_SUCCESSFUL'),
    })
  }

  getOperations = () => [
    {
      key: 'Run',
      text: t('RUN'),
      action: 'edit',
      type: 'control',
      onClick: () =>
        this.store.run(toJS(this.store.detail)).then(this.fetchData),
    },
    {
      key: 'edit',
      icon: 'pen',
      text: t('EDIT_INFORMATION'),
      action: 'edit',
      onClick: () =>
        this.trigger('devops.imagebuilder.baseinfo.edit', {
          type: this.name,
          detail: toJS(this.store.detail),
          success: this.fetchData,
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

  pathAddCluster = (path, cluster) => {
    const match = path.match(/(\/kapis|api|apis)(.*)/)
    return !cluster || cluster === 'default' || !isArray(match)
      ? path
      : `${match[1]}/clusters/${cluster}${match[2]}`
  }

  getAttrs = () => {
    const detail = toJS(this.store.detail)
    const { spec = {} } = detail

    return [
      {
        name: t('NAME'),
        value: detail.name,
      },
      {
        name: t('PROJECT'),
        value: showNameAndAlias(detail.namespace, 'project'),
      },
      {
        name: t('TYPE'),
        value: t(detail.type),
      },
      {
        name: t('BUILDER_IMAGE'),
        value: get(spec, 'output.image', '-'),
      },
      {
        name: t('CODE_REPOSITORY_URL'),
        value: get(spec, 'source.url', '-'),
      },
      {
        name: t('CREATION_TIME_TCAP'),
        value: getLocalTime(detail.createTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        name: t('CREATOR'),
        value: detail.creator,
      },
    ]
  }

  render() {
    const stores = {
      detailStore: this.store,
      s2iRunStore: this.s2iRunStore,
      resourceStore: this.resourceStore,
    }

    if (this.store.isLoading || this.s2iRunStore.list.isLoading) {
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
          label: t('IMAGE_BUILDER_PL'),
          url: this.listUrl,
        },
      ],
    }

    return (
      <DetailPage
        stores={stores}
        {...sideProps}
        routes={getRoutes(this.props.match.path)}
      />
    )
  }
}
