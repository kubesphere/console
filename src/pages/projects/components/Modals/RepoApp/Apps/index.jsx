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

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { get, noop } from 'lodash'
import { Button, InputSearch, Select } from '@kube-design/components'

import AppList from 'apps/components/AppList'

import AppStore from 'stores/openpitrix/app'
import RepoStore from 'stores/openpitrix/repo'
import { STORE_APP_LIMIT } from 'configs/openpitrix/app'

import styles from './index.scss'

@observer
class Apps extends Component {
  static propTypes = {
    workspace: PropTypes.string,
    store: PropTypes.object,
    onClickApp: PropTypes.func,
    fetchApps: PropTypes.func,
    selectRepo: PropTypes.string,
  }

  static defaultProps = {
    workspace: '',
    store: {},
    onClickApp: noop,
  }

  constructor(props) {
    super(props)

    this.state = {
      selectRepo: props.selectRepo,
    }
    this.appStore = new AppStore()
    this.repoStore = new RepoStore()
  }

  get isFormWorkspace() {
    return !this.selectedRepo
  }

  get repoSelectOptions() {
    const { data } = this.repoStore.list
    const options = data.map(({ name, repo_id }) => ({
      value: repo_id,
      label: name,
    }))
    options.unshift({
      value: null,
      label: t('From workspace'),
    })

    return options
  }

  get selectedRepo() {
    return this.state.selectRepo || get(this.repoSelectOptions, '[0].value')
  }

  async componentDidMount() {
    await this.fetchRepos()
    if (this.repoSelectOptions.length > 0) {
      await this.fetchApps()
    }
  }

  fetchRepos = async (params = {}) => {
    const { workspace } = this.props

    await this.repoStore.fetchList({
      status: 'active',
      noLimit: true,
      workspace,
      ...params,
    })
  }

  fetchApps = async (params = {}, replaceAll = true) => {
    await this.appStore.fetchList({
      page: 1,
      limit: STORE_APP_LIMIT,
      status: this.isFormWorkspace ? '' : 'active',
      workspace: this.isFormWorkspace ? this.props.workspace : '',
      repo_id: this.selectedRepo,
      ...params,
    })

    const { allApps, list } = this.appStore

    if (replaceAll) {
      allApps.clear()
      allApps.replace(list.data)
    } else {
      allApps.push(...list.data)
    }
  }

  fetchMoreApps = async () => {
    const { page } = this.appStore.list
    await this.fetchApps(
      {
        page: page + 1,
      },
      false
    )
  }

  handleSearch = word => {
    this.fetchApps({ keyword: word })
  }

  handleRefresh = () => {
    this.fetchApps()
  }

  handleChangeRepo = repo => {
    if (this.selectedRepo !== repo) {
      this.setState({ selectRepo: repo }, () => {
        this.fetchApps()
      })
    }
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src="/assets/application.svg" alt="" />
        </div>
        <div className={styles.text}>
          <h2>{t('App Templates')}</h2>
          <p>{t('APP_TEMPLATES_MODAL_DESC')}</p>
        </div>
      </div>
    )
  }

  renderToolbar() {
    return (
      <div className={styles.toolbar}>
        <Select
          name="repo"
          onChange={this.handleChangeRepo}
          className={styles.selectRepos}
          options={this.repoSelectOptions}
          value={this.selectedRepo}
        />
        <InputSearch
          onSearch={this.handleSearch}
          className={styles.search}
          placeholder={t('SEARCH_TIPS')}
        />
        <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
      </div>
    )
  }

  render() {
    const { allApps, list } = this.appStore
    const { isLoading, total } = list

    return (
      <>
        {this.renderHeader()}
        {this.renderToolbar()}
        <div className={styles.apps}>
          <AppList
            itemCls={styles.appItem}
            apps={allApps.toJS()}
            isLoading={isLoading}
            total={total}
            onFetchMore={this.fetchMoreApps}
            onClickAppItem={this.props.onClickApp}
            disableLink
          />
        </div>
      </>
    )
  }
}

export default Apps
