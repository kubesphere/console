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

import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'
// import { get } from 'lodash'
// import { reaction } from 'mobx'
import { inject } from 'mobx-react'
import React from 'react'

import { getDisplayName, getLocalTime } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import S2IBuilderStore from 'stores/devops/imgBuilder'
import { Notify } from '@kube-design/components'

@inject('rootStore')
@inject('devopsStore')
@withList({
  store: new S2IBuilderStore(),
  module: 'ImgBuilders',
  name: 'IMAGE_BUILDER',
})
export default class ImageBuilders extends React.Component {
  get store() {
    return this.props.store
  }

  get devops() {
    return this.props.match.params.devops
  }

  // componentDidMount() {
  //   this.freshDisposer = reaction(
  //     () => this.store.list.isLoading,
  //     () => {
  //       const isRunning = this.store.list.data.some(
  //         detail => get(detail, 'status.lastRunState', 'Running') === 'Running'
  //       )
  //       clearTimeout(this.freshTimer)
  //       if (isRunning) {
  //         this.freshTimer = setTimeout(this.handleFresh, 4000)
  //       }
  //     },
  //     { fireImmediately: true }
  //   )
  // }

  // componentWillUnmount() {
  //   this.freshDisposer && this.freshDisposer()
  //   clearTimeout(this.freshTimer)
  // }

  get itemActions() {
    const { trigger, name } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: item =>
          trigger('devops.imagebuilder.baseinfo.edit', {
            detail: item,
          }),
      },
      {
        key: 'Run',
        text: t('RUN'),
        icon: 'triangle-right',
        action: 'edit',
        type: 'edit',
        onClick: detail => {
          this.store.run(detail).then(() => {
            Notify.success({ content: t('RUN_SUCCESS') })
            this.routing.query()
          })
        },
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: name,
            detail: item,
            success: this.routing.query,
          }),
      },
    ]
  }

  getColumns = () => {
    const { prefix, module } = this.props
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module] || 'catalog'}
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.description || '-'}
            to={`${prefix}/${name}`}
          />
        ),
      },
      {
        title: t('STATUS'),
        dataIndex: 'status',
        isHideable: true,
        width: '15%',
        render: status => {
          return (
            <Status
              name={t(
                status === 'Succeeded' ? 'VALIDATE_SUCCESS' : 'VALIDATE_FAILED'
              )}
              type={status || 'Unknown'}
              flicker
            />
          )
        },
      },
      {
        title: t('TYPE'),
        dataIndex: 'type',
        isHideable: true,
        width: '15%',
        render: type => type && t(type.toUpperCase()),
      },
      // {
      //   title: t('SERVICE'),
      //   dataIndex: 'serviceName',
      //   isHideable: true,
      //   width: '15%',
      //   render: name => {
      //     if (name) {
      //       return <Link to={`./services/${name}/`}>{name}</Link>
      //     }
      //     return '-'
      //   },
      // },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  get routing() {
    return this.props.rootStore.routing
  }

  showCreate = () => {
    const { match, module, devopsStore } = this.props
    return this.props.trigger('devops.imagebuilder.create', {
      module,
      projectDetail: devopsStore.detail,
      namespace: this.devops,
      cluster: match.params.cluster,
      success: this.routing.query,
    })
  }

  getData = params => {
    const { getData: fn } = this.props
    return fn({ ...params, devops: undefined, namespace: this.devops })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <Banner {...bannerProps} description={t(`IMAGE_BUILDER_DESC`)} />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
        />
      </ListPage>
    )
  }
}
