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
import { Column, Columns } from '@kube-design/components'

import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'
import Banner from 'components/Cards/Banner'
import Avatar from 'apps/components/Avatar'
import AppStore from 'stores/openpitrix/store'
import CategoryStore from 'stores/openpitrix/category'

import Cates from './Cates'

import styles from './index.scss'

@withList({
  store: new AppStore(),
  module: 'apps',
  name: 'Application',
  rowKey: 'app_id',
})
export default class AppCategories extends React.Component {
  categoryStore = new CategoryStore()

  state = {
    selectCategoryId: 'ctg-uncategorized',
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectCategoryId !== this.state.selectCategoryId) {
      this.getData()
    }
  }

  getData = params => {
    this.props.store.fetchList({
      category_id: this.state.selectCategoryId,
      status: 'active',
      ...params,
    })
  }

  hadnleSelectCategory = categoryId => {
    if (this.state.selectCategoryId !== categoryId) {
      this.setState({ selectCategoryId: categoryId }, () => {
        this.clearTableSearch()
      })
    }
  }

  clearTableSearch = () => {
    const { tableActions, searchType } = this.props.tableProps
    tableActions.onFetch({ [searchType]: '' }, true)
  }

  get tableActions() {
    const { trigger, tableProps } = this.props
    return {
      ...tableProps.tableActions,
      onCreate: null,
      selectActions: [
        {
          key: 'adjust',
          type: 'primary',
          text: t('Change Category'),
          onClick: () =>
            trigger('openpitrix.category.ajust', {
              categoryId: this.state.selectCategoryId,
              categories: toJS(this.categoryStore.list.data),
              success: () => {
                this.categoryStore.fetchList({
                  noLimit: true,
                  statistics: true,
                })
                this.getData()
              },
            }),
        },
      ],
    }
  }

  get emptyProps() {
    return {
      desc: t('APP_CATEGORIES_CREATE_DESC'),
    }
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'app_id',
      width: '50%',
      render: (app_id, app) => (
        <Avatar
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
      title: t('Workspace'),
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

  render() {
    const { bannerProps, tableProps } = this.props
    const { selectCategoryId } = this.state
    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <Banner
          {...bannerProps}
          icon="tag"
          title={t('App Categories')}
          description={t('APP_CATEGORIES_DESC')}
        />
        <Columns className={styles.main}>
          <Column className="is-3">
            <Cates
              store={this.categoryStore}
              selectedId={selectCategoryId}
              onSelect={this.hadnleSelectCategory}
            />
          </Column>
          <Column>
            <Table
              {...tableProps}
              tableActions={this.tableActions}
              itemActions={this.itemActions}
              columns={this.getColumns()}
              emptyProps={this.emptyProps}
              searchType="keyword"
            />
          </Column>
        </Columns>
      </ListPage>
    )
  }
}
