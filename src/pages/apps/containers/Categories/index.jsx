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
import { Columns, Column, Icon, Loading } from '@pitrix/lego-ui'
import { get } from 'lodash'
import classnames from 'classnames'

import { Banner, Card, Notify } from 'components/Base'
import DeleteModal from 'components/Modals/Delete'
import CreateModal from 'apps/components/Modals/CategoryCreate'
import CategoryStore from 'stores/openpitrix/category'
import { cacheFunc } from 'utils'
import AppList from './Apps'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {},
      selectCategoryId: '',
    }
    this.store = new CategoryStore()
  }

  componentDidMount() {
    this.getData()
  }

  getData = () =>
    this.store.fetchList({
      noLimit: true,
      statistics: true,
    })

  isSelectedCategory = (category, id, index) => {
    if (id) {
      return category.category_id === id
    }

    return index === 0
  }

  showModal = (type, item) => e => {
    e.stopPropagation()
    const total = item.app_total

    if (type === 'deleteShow' && total > 0) {
      Notify.warning({
        content: t.html('DELETE_CATEGORY_WARNING', { total }),
      })
      return false
    }

    this.setState(() => ({
      [type]: true,
      category: item,
    }))
  }

  hideModal = type =>
    cacheFunc(
      `_hideModal_${type}`,
      () => {
        this.setState({
          [type]: false,
          category: {},
        })
      },
      this
    )

  createOrModify = params => {
    const { category } = this.state
    if (category.category_id) {
      this.store.update(params).then(() => {
        this.hideModal('categoryShow')()
        Notify.success({ content: `${t('Modify Successfully')}!` })
        this.getData()
      })
    } else {
      this.store.create(params).then(() => {
        this.hideModal('categoryShow')()
        Notify.success({ content: `${t('Created Successfully')}!` })
        this.getData()
      })
    }
  }

  delete = () => {
    this.store.delete(this.state.category).then(() => {
      this.hideModal('deleteShow')()
      Notify.success({ content: `${t('Delete Successfully')}!` })
      this.getData()
    })
  }

  selectCategory = categoryId => {
    if (this.state.selectCategoryId !== categoryId) {
      this.setState({ selectCategoryId: categoryId })
    }
  }

  renderHeader() {
    return (
      <Banner
        type="white"
        icon="tag"
        name={t('App Categories')}
        desc={t('APP_CATEGORIES_DESC')}
      />
    )
  }

  renderCategories() {
    const { list } = this.store
    const { selectCategoryId } = this.state
    const categories = toJS(get(this.store, 'list.data', []))

    return (
      <Loading spinning={list.isLoading}>
        <Card className={styles.categories}>
          <div className={styles.title}>
            <label>
              {t('All Categories')} ({list.total})
            </label>
            <label className={styles.add}>
              <Icon
                onClick={this.showModal('categoryShow', {})}
                name={'add'}
                size={20}
              />
            </label>
          </div>
          <ul>
            {categories.map((item, index) => (
              <li
                key={item.category_id}
                onClick={() => this.selectCategory(item.category_id)}
                className={classnames({
                  [styles.hasAction]: item.category_id !== 'ctg-uncategorized',
                  [styles.active]: this.isSelectedCategory(
                    item,
                    selectCategoryId,
                    index
                  ),
                })}
              >
                <Icon
                  className={styles.icon}
                  name={
                    ['uncategorized', ''].includes(item.description)
                      ? 'tag'
                      : item.description
                  }
                  size={16}
                />
                {t(`APP_CATE_${item.name.toUpperCase()}`, {
                  defaultValue: item.name,
                })}
                <label className={styles.number}>{item.app_total || 0}</label>
                <label className={styles.actions}>
                  <Icon
                    onClick={this.showModal('categoryShow', item)}
                    name={'pen'}
                    size={16}
                  />
                  <Icon
                    onClick={this.showModal('deleteShow', item)}
                    name={'trash'}
                    size={16}
                  />
                </label>
              </li>
            ))}
          </ul>
        </Card>
      </Loading>
    )
  }

  renderModals() {
    const { category } = this.state
    const categories = toJS(get(this.store, 'list.data', []))
    const names = categories.map(item => item.name)

    return (
      <div>
        <DeleteModal
          desc={t('DELETE_CATEGORY_DESC', { name: category.name })}
          visible={this.state.deleteShow}
          onOk={this.delete}
          onCancel={this.hideModal('deleteShow')}
          isSubmitting={this.store.isSubmitting}
        />
        <CreateModal
          title={t('Category')}
          icon="tag"
          visible={this.state.categoryShow}
          detail={this.state.category}
          categoryNames={names}
          onOk={this.createOrModify}
          onCancel={this.hideModal('categoryShow')}
          isSubmitting={this.store.isSubmitting}
        />
      </div>
    )
  }

  render() {
    const { list } = this.store
    const categories = toJS(get(list, 'data', []))
    const categoryId = toJS(get(list, 'data[0].category_id', ''))

    return (
      <div className={styles.main}>
        {this.renderHeader()}
        <Columns>
          <Column className="is-3">{this.renderCategories()}</Column>
          <Column>
            {!list.isLoading && (
              <AppList
                match={this.props.match}
                appStore={this.store}
                categories={categories}
                categoryId={this.state.selectCategoryId || categoryId}
                queryAppTotal={this.getData}
              />
            )}
          </Column>
        </Columns>
        {this.renderModals()}
      </div>
    )
  }
}
