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
import { get, isEmpty, pick } from 'lodash'
import { ScrollLoad } from 'components/Base'
import { safeAtob } from 'utils/base64'

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
    return this.props.store.orgList
  }

  get activeRepoIndex() {
    return this.props.store.activeRepoIndex
  }

  get repoList() {
    return this.props.store.repoList
  }

  get scmType() {
    return 'github'
  }

  get credentialsList() {
    return [
      ...this.props.store.credentials.data
        .map(credential => ({
          label: credential.name,
          value: credential.name,
          type: credential.type,
          namespace: credential.namespace,
          token: get(credential, '_originData.data.password'),
        }))
        .filter(credential => credential.type === 'username_password'),
    ]
  }

  handleFormChange = () => {
    const { isAccessTokenWrong } = this.props.store
    if (isAccessTokenWrong) {
      this.props.store.handleChangeAccessTokenWrong()
    }
  }

  @action
  handleActiveOrgChange = async orgIndex => {
    this.props.store.handleChangeActiveRepoIndex(parseInt(orgIndex, 10))
    const repoList = await this.props.store.getRepoList({
      activeRepoIndex: parseInt(orgIndex, 10),
      cluster: this.props.cluster,
      more: false,
    })
    this.repoListData = [...repoList.data]
  }

  handleSubmit = index => {
    const data = {
      [REPO_KEY_MAP[this.scmType]]: {
        repo: get(this.repoListData, `${index}.name`),
        credential_id: this.credentialId,
        owner: get(toJS(this.orgList), `data[${this.activeRepoIndex}].name`),
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
    const { cluster, devops } = this.props
    const data = this.tokenFormRef.current.getData()

    this.credentialId = data.credentialId

    if (!this.credentialId) return false

    this.setState({ isLoading: true })

    const credentialDetail = this.credentialsList.find(
      item => item.value === this.credentialId
    )

    if (!isEmpty(credentialDetail)) {
      const secretName = get(credentialDetail, 'value')
      const secretNamespace = get(credentialDetail, 'namespace')
      const token = safeAtob(get(credentialDetail, 'token'))

      await this.props.store
        .putAccessName({
          secretName,
          secretNamespace,
          cluster,
          devops,
          token,
        })
        .finally(() => {
          this.setState({ isLoading: false })
        })
    } else {
      this.setState({ isLoading: false })
    }
  }

  getCredentialsListData = params => {
    const { devops, cluster } = this.props
    return this.props.store.getCredentials({ devops, cluster, ...params })
  }

  optionRender = ({ label, type, disabled }) => (
    <span style={{ display: 'flex', alignItem: 'center' }}>
      {label}&nbsp;&nbsp;
      <Tag type={disabled ? '' : 'warning'}>
        {type && t(`CREDENTIAL_TYPE_${type.toUpperCase()}`)}
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
            label={t('CREDENTIAL')}
            rules={[
              { required: true, message: t('PIPELINE_CREDENTIAL_EMPTY_TIP') },
            ]}
            error={
              isAccessTokenWrong
                ? {
                    message: { message: t.html('INCORRECT_GITHUB_TOKEN_DESC') },
                  }
                : undefined
            }
            desc={
              <p>
                {t('SELECT_CREDENTIAL_DESC')}
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
                  {t('CREATE_CREDENTIAL')}
                </span>
              </p>
            }
          >
            <Select
              name="credentialId"
              options={this.credentialsList}
              pagination={pick(credentials, ['page', 'limit', 'total'])}
              isLoading={credentials.isLoading}
              onFetch={this.getCredentialsListData}
              optionRenderer={this.optionRender}
              valueRenderer={this.optionRender}
              placeholder=" "
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
            {t('OK')}
          </Button>
        </Form>
      </div>
    )
  }

  handleUpdateOrgList = async params => {
    const { pagination } = this.orgList
    await this.props.store.getOrganizationList(
      {
        pageNumber: params?.page ?? 1,
        pageSize: pagination.pageSize,
        more: params?.more ?? false,
        ...this.props.store.orgParams,
      },
      this.scmType,
      this.props.cluster
    )
  }

  renderOrgList() {
    const { data, isEnd, pagination = {}, isLoading } = this.orgList
    return (
      <ScrollLoad
        data={toJS(data)}
        isEnd={isEnd}
        page={pagination.pageNumber || 1}
        loading={isLoading}
        onFetch={this.handleUpdateOrgList}
        noMount={true}
      >
        {!isEmpty(data) &&
          data.map((repo, index) => (
            <div
              key={repo.name}
              className={classNames(styles.repo, {
                [styles['repo-active']]: this.activeRepoIndex === index,
              })}
              onClick={() => this.handleActiveOrgChange(index)}
            >
              <div className={styles.avatar}>
                <img src={repo.avatar} alt={repo.name} />
              </div>
              <div className={styles.name}>{repo.name}</div>
            </div>
          ))}
      </ScrollLoad>
    )
  }

  handleUpdateRepoList = async params => {
    const { pagination } = this.repoList
    const list = await this.props.store.getRepoList({
      activeRepoIndex: this.activeRepoIndex,
      cluster: this.props.cluster,
      pageNumber: params?.page ?? 1,
      pageSize: pagination.pageSize,
      more: params?.more ?? false,
    })

    this.repoListData = [...list.data]
  }

  renderRepoList() {
    const { isEnd, pagination = {}, isLoading } = this.repoList

    if (isEmpty(this.repoListData)) {
      return (
        <Loading spinning={isLoading}>
          <EmptyList
            className={styles.empty}
            icon="exclamation"
            title={t('NO_DATA')}
            desc={t('NO_REPO_FOUND_DESC')}
          />
        </Loading>
      )
    }

    return (
      <ScrollLoad
        data={toJS(this.repoListData)}
        isEnd={isEnd}
        page={pagination.pageNumber || 1}
        loading={isLoading}
        onFetch={this.handleUpdateRepoList}
        wrapperClassName={styles.repoListBox}
        noMount={true}
      >
        {this.repoListData.map((repo, index) => (
          <div className={styles.repo} key={`${repo.name}-${index}`}>
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
              onClick={() => this.handleSubmit(index)}
              data-repo-index={index}
            >
              <Button type="control">{t('SELECT')}</Button>
            </div>
          </div>
        ))}
      </ScrollLoad>
    )
  }

  renderSearch = () => {
    return (
      <div className={styles.search}>
        <InputSearch
          value={this.state.searchValue}
          onSearch={this.filterResource}
          placeholder={t('SEARCH_BY_NAME')}
        />
      </div>
    )
  }

  filterResource = value => {
    if (isEmpty(value)) {
      this.repoListData = [...this.repoList.data]
    } else {
      this.repoListData = this.repoList.data.filter(repo =>
        repo.name.includes(value)
      )
    }

    this.setState({ searchValue: value })
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
              {t(`${this.scmType.toUpperCase()}_CREDENTIAL_EMPTY`)}
            </p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (!this.orgList.isLoading && isEmpty(toJS(this.orgList.data))) {
      return this.renderEmpty(this.orgList.data)
    }

    return (
      <div className={styles.tabContent}>
        <div className={styles.orgList}>{this.renderOrgList()}</div>
        <div className={styles.repoListContainer}>
          <>{this.renderSearch()}</>
          <div className={styles.repoList}>{this.renderRepoList()}</div>
        </div>
      </div>
    )
  }
}
