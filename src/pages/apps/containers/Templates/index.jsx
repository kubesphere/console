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
import { observer } from 'mobx-react'
import { extendObservable, action } from 'mobx'
import { Link } from 'react-router-dom'
import { Columns, Column, Loading } from '@pitrix/lego-ui'

import AppStore from 'stores/openpitrix/app'
import AppRepoStore from 'stores/openpitrix/repo'

import { Button, Select, Search } from 'components/Base'
import AppCard from 'components/Cards/App'

import styles from './index.scss'

@observer
export default class Apps extends React.Component {
  constructor(props) {
    super(props)

    extendObservable(this, {
      allApps: [],
      appReps: [],
    })

    this.searchWords = ''
    this.selectedRepoId = ''
    this.appStore = new AppStore()
    this.repoStore = new AppRepoStore()
  }

  @action
  async refreshRepo() {
    await this.repoStore.fetchList({
      status: 'active',
      limit: undefined,
      controller: 0,
    })
    this.appReps.replace(this.repoStore.list.data)
  }

  async fetchApps(filters = {}) {
    await this.appStore.fetchList(
      Object.assign(
        {
          limit: 20,
          repo_id: this.selectedRepoId && [this.selectedRepoId],
          search_word: this.searchWords,
          status: 'active',
        },
        filters
      )
    )
  }

  @action
  async refreshApp() {
    this.allApps.clear()
    await this.fetchApps({
      page: 0,
    })
    this.allApps.replace(this.appStore.list.data)
  }

  refreshAll = () => {
    this.refreshRepo()
    this.refreshApp()
  }

  componentDidMount() {
    this.refreshAll()
  }

  handleRefresh = () => {
    this.refreshApp()
  }

  handleSearch = searchWords => {
    if (this.searchWords !== searchWords) {
      this.searchWords = searchWords
      this.refreshApp()
    }
  }

  handleRepoSelect = repo_id => {
    if (this.selectedRepoId === repo_id) {
      return
    }
    this.selectedRepoId = repo_id
    this.allApps.clear()
    this.refreshApp()
  }

  fetchMoreApps = async () => {
    const { page, limit } = this.appStore.list
    await this.fetchApps({
      page: page + limit,
    })
    this.allApps.push(...this.appStore.list.data)
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          <img className={styles.leftIcon} src="/assets/noicon.svg" alt="" />
          <img
            className={styles.rightIcon}
            src="/assets/banner-icon-2.svg"
            alt=""
          />
          <div className="h4">{t('APP_TEMPLATE_DESCRIPTION_TITLE')}</div>
          <p>{t('APP_TEMPLATE_DESCRIPTION_ARTICLE')}</p>
        </div>
        {this.renderToolbar()}
      </div>
    )
  }

  renderToolbar() {
    return (
      <div className={styles.toolbar}>
        <Columns>
          <Column className="is-narrow">
            <Select
              value={this.selectedRepoId}
              onChange={this.handleRepoSelect}
            >
              <Select.Option value="" text={t('All Repositories')} />
              {this.appReps.map(repo => (
                <Select.Option
                  key={repo.repo_id}
                  value={repo.repo_id}
                  text={repo.name}
                />
              ))}
            </Select>
          </Column>
          <Column>
            <Search
              onSearch={this.handleSearch}
              placeholder={t('Please enter a name to find')}
            />
          </Column>
          <Column className="is-narrow">
            <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
          </Column>
        </Columns>
      </div>
    )
  }

  renderApps() {
    if (this.allApps.length === 0 && !this.appStore.list.isLoading) {
      return (
        <div className={styles.noApp}>
          <img src="/assets/empty-card.svg" alt="" />
          <p>{t('RESOURCE_NOT_FOUND')}</p>
        </div>
      )
    }

    return (
      <div>
        {this.allApps.map(app => (
          <Link
            key={app.app_id}
            className={styles.appItem}
            to={`${this.props.match.url}/${app.app_id}`}
          >
            <AppCard app={app} />
          </Link>
        ))}
      </div>
    )
  }

  render() {
    const { isLoading, total } = this.appStore.list
    const appLength = this.allApps.length

    return (
      <div className={styles.wrapper}>
        {this.renderHeader()}
        <div className={styles.appsWrapper}>
          <div className="h6">{t('App Templates')}</div>
          {this.renderApps()}
          {isLoading && (
            <div className={styles.loading}>
              <Loading />
            </div>
          )}
          {!isLoading && appLength < total && (
            <a className={styles.loadMore} onClick={this.fetchMoreApps}>
              <span>{t('Load More')}</span>
            </a>
          )}
        </div>
      </div>
    )
  }
}
