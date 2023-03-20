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
import { ScrollLoad } from 'components/Base'
import { InputSearch, Icon } from '@kube-design/components'
import { observer } from 'mobx-react'
import Card from './Card'
import styles from './index.scss'

@observer
export default class RadioTable extends React.Component {
  handleSearch = text => {
    this.props.fetchList({ name: text }, true)
  }

  componentDidMount() {
    if (this.props.list.total < 1) {
      this.props.fetchList()
    }
  }

  handleRefresh = () => {
    const { page } = this.props
    this.props.fetchList({
      limit: 10,
      page,
    })
  }

  clearFilter = () => {
    this.handleSearch()
  }

  renderEmpty = () => {
    return (
      <div className={styles.emptyText}>
        <span className={styles.emptyTipIcon}>
          <Icon name="exclamation" size={48} />
        </span>
        <div>{t('NO_MATCHING_RESULT_FOUND')}</div>
        <p>
          {t('YOU_CAN_TRY_TO')}
          <span
            className={styles.action}
            onClick={this.handleRefresh}
            data-test="table-empty-refresh"
          >
            {t('REFRESH_DATA')}
          </span>
          {t('OR')}
          <span
            className={styles.action}
            onClick={this.clearFilter}
            data-test="table-empty-clear-filter"
          >
            {t('CLEAR_SEARCH_CONDITIONS')}
          </span>
        </p>
      </div>
    )
  }

  render() {
    const {
      list,
      fetchList,
      handleSelectWorkload,
      checkedValue,
      module,
    } = this.props
    const { data, total, page, isLoading } = list

    return (
      <div>
        <InputSearch
          className={styles.search}
          value={list.filters.name}
          onSearch={this.handleSearch}
          placeholder={t('SEARCH_BY_NAME')}
        />
        <div className={styles.cardList}>
          {total < 1 ? (
            this.renderEmpty()
          ) : (
            <ScrollLoad
              data={data}
              total={total}
              page={page}
              loading={isLoading}
              onFetch={fetchList}
            >
              {data.map((item, index) => {
                return (
                  <Card
                    detail={{ ...item, module }}
                    key={index}
                    onClick={() => handleSelectWorkload(item)}
                    isChecked={checkedValue && checkedValue.name === item.name}
                  />
                )
              })}
            </ScrollLoad>
          )}
        </div>
      </div>
    )
  }
}
