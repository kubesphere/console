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

import { Notify } from 'components/Base'
import Base from 'core/containers/Base/List'

import AppStore from 'stores/openpitrix/store'
import Avatar from 'apps/components/Avatar'
import AdjustModal from 'apps/components/Modals/CategoryAdjust'

@inject('rootStore')
@observer
export default class Apps extends Base {
  constructor(props) {
    super(props)

    this.state = {
      categoryId: this.props.categoryId,
    }

    this.init()
  }

  init() {
    this.store = new AppStore()
  }

  componentDidUpdate(prevProps) {
    const { categoryId } = this.props
    if (categoryId !== prevProps.categoryId) {
      this.getData({ category_id: categoryId })
      this.setState(() => ({ categoryId }))
      this.store.list.selectedRowKeys = []
    }
  }

  getData(params) {
    this.store.fetchList({
      category_id: this.state.categoryId,
      status: 'active',
      ...params,
    })
  }

  get authKey() {
    return 'apps'
  }

  get name() {
    return 'App Categories'
  }

  get rowKey() {
    return 'app_id'
  }

  getTableProps() {
    return {
      ...Base.prototype.getTableProps.call(this),
      onCreate: null,
      selectActions: [
        {
          key: 'adjust',
          type: 'primary',
          text: t('Change Category'),
          onClick: this.showModal('adjustShow'),
        },
      ],
      searchType: 'keyword',
    }
  }

  adjustCategory = params => {
    this.store.adjustCategory(params).then(() => {
      this.hideModal('adjustShow')()
      Notify.success({ content: `${t('Adjust Successfully')}!` })
      this.props.queryAppTotal()
    })
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'app_id',
      width: '50%',
      render: (app_id, app) => (
        <Avatar
          isApp
          to={`/apps/${app_id}`}
          avatarType={'appIcon'}
          avatar={app.icon}
          iconLetter={app.name}
          iconSize={40}
          title={app.name}
          desc={app.description}
        />
      ),
    },
    {
      title: t('Provider'),
      dataIndex: 'isv',
      isHideable: true,
      width: '25%',
    },
    {
      title: t('Latest Version'),
      dataIndex: 'latest_app_version.name',
      isHideable: true,
      width: '25%',
    },
  ]

  renderHeader() {
    return null
  }

  renderModals() {
    return (
      <AdjustModal
        title={t('Adjust App Category')}
        icon="tag"
        categoryId={this.state.categoryId || this.props.categoryId}
        categories={this.props.categories}
        visible={this.state.adjustShow}
        onOk={this.adjustCategory}
        onCancel={this.hideModal('adjustShow')}
        isSubmitting={this.store.isSubmitting}
      />
    )
  }
}
