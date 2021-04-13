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
import classNames from 'classnames'
import { action, observable, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { get, isEmpty, isArray, pick } from 'lodash'
import {
  Form,
  Button,
  InputSearch,
  Icon,
  Loading,
  Select,
  Tag,
} from '@kube-design/components'

import { REPO_KEY_MAP } from 'utils/constants'
import EmptyList from 'components/Cards/EmptyList'

import styles from './index.scss'

@observer
export default class GitHubForm extends React.Component {
  tokenFormRef = React.createRef()

  state = {
    isLoading: false,
    searchValue: '',
  }

  @observable
  repoListData = []

  get orgList() {
    return this.props.store.orgList.data
  }

  get activeRepoIndex() {
    return this.props.store.activeRepoIndex
  }

  get repoList() {
    return get(this.orgList, `${this.activeRepoIndex}.repositories.items`, [])
  }

  get scmType() {
    return 'github'
  }

  handleFormChange = () => {
    const { isAccessTokenWrong } = this.props.store
    if (isAccessTokenWrong) {
      this.props.store.handleChangeAccessTokenWrong()
    }
  }

  @action
  handleActiveRepoChange = async e => {
    const { repoIndex } = e.currentTarget.dataset

    this.props.store.handleChangeActiveRepoIndex(parseInt(repoIndex, 10))

    const repoList = get(this.orgList, `[${repoIndex}].repositories.items`, [])

    if (!isArray(repoList) || isEmpty(repoList)) {
      const org = await this.props.store.getRepoList({
        activeRepoIndex: parseInt(repoIndex, 10),
        cluster: this.props.cluster,
      })

      this.repoListData = get(
        org,
        `data.${this.activeRepoIndex}.repositories.items`,
        []
      )
    } else {
      this.repoListData = repoList
    }
  }

  handleGetRepoList = async () => {
    const org = await this.props.store.getRepoList({
      cluster: this.props.cluster,
    })

    this.repoListData = get(
      org,
      `data.${this.activeRepoIndex}.repositories.items`,
      []
    )
    this.setState({ searchValue: '' })
  }

  handleSubmit = e => {
    const index = e.currentTarget.dataset && e.currentTarget.dataset.repoIndex
    const data = {
      [REPO_KEY_MAP[this.scmType]]: {
        repo: get(this.repoListData, `${index}.name`),
        credential_id: this.credentialId,
        owner: get(this.orgList[this.activeRepoIndex], 'name'),
        discover_branches: 1,
        discover_pr_from_forks: { strategy: 2, trust: 2 },
        discover_pr_from_origin: 2,
        discover_tags: true,
        description: get(this.repoListData, `${index}.description`),
      },
    }
    this.props.handleSubmit(data)
  }

  @action
  handlePasswordConfirm = async () => {
    const { name, cluster, devops } = this.props
    const data = this.tokenFormRef.current.getData()

    this.credentialId = data.credentialId

    if (!this.credentialId) return false

    this.setState({ isLoading: true })

    const credentialDetail = await this.props.store.getCredentialDetail({
      cluster,
      devops,
      credential_id: this.credentialId,
    })

    const token = get(credentialDetail, 'data.password')

    if (token) {
      await this.props.store
        .putAccessToken({ token, name, cluster, devops })
        .finally(() => {
          this.setState({ isLoading: false })
        })
    } else {
      this.setState({ isLoading: false })
    }
  }

  getCredentialsList = () => {
    return [
      ...this.props.store.credentials.data.map(credential => ({
        label: credential.name,
        value: credential.name,
        type: credential.type,
      })),
    ]
  }

  getCredentialsListData = params => {
    const { devops, cluster } = this.props
    return this.props.store.getCredentials({ devops, cluster, ...params })
  }

  optionRender = ({ label, type, disabled }) => (
    <span style={{ display: 'flex', alignItem: 'center' }}>
      {label}&nbsp;&nbsp;
      <Tag type={disabled ? '' : 'warning'}>
        {type === 'ssh' ? 'SSH' : t(type)}
      </Tag>
    </span>
  )

  renderAccessTokenForm() {
    const { tokenFormData, credentials, isAccessTokenWrong } = this.props.store

    return (
      <div className={styles.card}>
        <Form
          data={tokenFormData}
          onSubmit={this.handlePasswordConfirm}
          onChange={this.handleFormChange}
          ref={this.tokenFormRef}
        >
          <Form.Item
            label={t('Token')}
            rules={[{ required: true, message: t('This param is required') }]}
            error={
              isAccessTokenWrong
                ? {
                    message: { message: t.html('WRONG_GITHUB_TOKEN_DESC') },
                  }
                : undefined
            }
            desc={
              <p>
                {t('ADD_NEW_CREDENTIAL_DESC')}
                <span
                  className={styles.clickable}
                  onClick={() => {
                    this.props.showCredential()
                    this.props.setCredentialsFormData({
                      type: 'username_password',
                      data: { username: 'admin' },
                    })
                  }}
                >
                  {t('Create a credential')}
                </span>
              </p>
            }
          >
            <Select
              name="credentialId"
              options={this.getCredentialsList()}
              pagination={pick(credentials, ['page', 'limit', 'total'])}
              isLoading={credentials.isLoading}
              onFetch={this.getCredentialsListData}
              optionRenderer={this.optionRender}
              valueRenderer={this.optionRender}
              searchable
              clearable
              onChange={value => {
                this.props.store.tokenFormData = { credentialId: value }
              }}
            />
          </Form.Item>
          <Button
            className={styles.confirmButton}
            loading={this.state.isLoading}
            onClick={this.handlePasswordConfirm}
          >
            {t('Confirm')}
          </Button>
        </Form>
      </div>
    )
  }

  renderRepoList() {
    return (
      !isEmpty(this.orgList) &&
      this.orgList.map((repo, index) => (
        <div
          key={repo.name}
          className={classNames(styles.repo, {
            [styles['repo-active']]: this.activeRepoIndex === index,
          })}
          data-repo-index={index}
          onClick={this.handleActiveRepoChange}
        >
          <div className={styles.avatar}>
            <img src={repo.avatar} alt={repo.name} />
          </div>
          <div className={styles.name}>{repo.name}</div>
        </div>
      ))
    )
  }

  renderOrgList() {
    if (isEmpty(this.repoListData)) {
      return (
        <EmptyList
          className={styles.empty}
          icon="exclamation"
          title={t('No Data')}
          desc={t('RESOURCE_NOT_FOUND')}
        />
      )
    }
    return (
      <div className={styles.repoListBox}>
        {this.repoListData.map((repo, index) => (
          <div className={styles.repo} key={repo.name}>
            <div className={styles.icon}>
              <Icon
                name={
                  this.scmType === 'bitbucket_server'
                    ? 'bitbucket'
                    : this.scmType
                }
                size={40}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.name}>{repo.name}</div>
              <div className={styles.desc}>{repo.description}</div>
            </div>
            <div
              className={styles.action}
              onClick={this.handleSubmit}
              data-repo-index={index}
            >
              <Button type="control">{t('Select This Repository')}</Button>
            </div>
          </div>
        ))}
        {this.renderMore()}
      </div>
    )
  }

  renderSearch = () => {
    return (
      <div className={styles.search}>
        <InputSearch
          value={this.state.searchValue}
          onSearch={this.filterResource}
          placeholder={t('Search by name')}
        />
      </div>
    )
  }

  filterResource = value => {
    if (isEmpty(value)) {
      this.repoListData = [...this.repoList]
    } else {
      this.repoListData = this.repoList.filter(repo =>
        repo.name.includes(value)
      )
    }

    this.setState({ searchValue: value })
  }

  renderMore = () => {
    const hasNextPage = get(
      this.orgList,
      `${this.activeRepoIndex}.repositories.nextPage`
    )

    return hasNextPage ? (
      <div
        className={classNames(styles.repo, styles.loadMore)}
        onClick={this.handleGetRepoList}
      >
        {t('Load more')}
      </div>
    ) : null
  }

  renderEmpty = _orgList => {
    return (
      <div className={styles.tabContent}>
        {!_orgList.isLoading ? (
          <div className={styles.orgList}>{this.renderAccessTokenForm()}</div>
        ) : (
          <Loading>
            <div className={styles.orgList} />
          </Loading>
        )}
        <div className={styles.emptyRepoList}>
          <div className={styles.placeHolder}>
            <img src="/assets/empty-card.svg" alt="" />
            <p className={styles.title}>
              {t(`${this.scmType}_ACCESSTOKEN_PLACEHOLDER`)}
            </p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { orgList, getRepoListLoading } = this.props.store

    if (!orgList.isLoading && isEmpty(toJS(this.orgList))) {
      return this.renderEmpty(orgList)
    }

    return (
      <div className={styles.tabContent}>
        <div className={styles.orgList}>
          <Loading spinning={toJS(orgList.isLoading)}>
            <>{this.renderRepoList()}</>
          </Loading>
        </div>
        <div className={styles.repoListContainer}>
          <>{this.renderSearch()}</>
          <div className={styles.repoList}>
            <Loading spinning={toJS(getRepoListLoading)}>
              <>{this.renderOrgList()}</>
            </Loading>
          </div>
        </div>
      </div>
    )
  }
}
