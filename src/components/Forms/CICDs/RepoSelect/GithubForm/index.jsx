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
import { action } from 'mobx'
import { observer } from 'mobx-react'
import { get, isEmpty } from 'lodash'
import { Input, Icon, Loading } from '@pitrix/lego-ui'
import { Form, Button } from 'components/Base'
import { REPO_KEY_MAP } from 'utils/constants'

import styles from './index.scss'

@observer
export default class GitHubForm extends React.Component {
  constructor(props) {
    super(props)
    this.tokenFormRef = React.createRef()
    this.state = {}
  }

  get scmType() {
    return 'github'
  }

  @action
  handleActiveRepoChange = e => {
    const { repoIndex } = e.currentTarget.dataset
    const { orgList } = this.props.store

    this.props.store.handleChangeActiveRepoIndex(parseInt(repoIndex, 10))

    const repoList = get(orgList.data, `[${repoIndex}].repositories.items`, [])

    if (!repoList.length) {
      this.props.store.getRepoList({
        activeRepoIndex: parseInt(repoIndex, 10),
        cluster: this.props.cluster,
      })
    }
  }

  handleGetRepoList = () => {
    this.props.store.getRepoList({ cluster: this.props.cluster })
  }

  handleSubmit = e => {
    const { orgList, activeRepoIndex, githubCredentialId } = this.props.store
    const index = e.currentTarget.dataset && e.currentTarget.dataset.repoIndex

    const data = {
      [REPO_KEY_MAP[this.scmType]]: {
        repo: get(
          orgList.data,
          `${activeRepoIndex}.repositories.items.${index}.name`
        ),
        credential_id: githubCredentialId,
        owner: get(orgList.data[activeRepoIndex], 'name'),
        discover_branches: 1,
        discover_pr_from_forks: { strategy: 2, trust: 2 },
        discover_pr_from_origin: 2,
      },
      description: get(
        orgList.data,
        `${activeRepoIndex}.repositories.items.${index}.description`
      ),
    }
    this.props.handleSubmit(data)
  }

  @action
  handlePasswordConfirm = async () => {
    const { name, cluster, devops } = this.props
    const data = this.tokenFormRef.current.getData()

    if (isEmpty(data)) return false

    this.setState({ isLoading: true })
    this.props.store
      .putAccessToken({ token: data.token, name, cluster, devops })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  renderAccessTokenForm() {
    const { tokenFormData, isAccessTokenWrong } = this.props.store

    return (
      <div className={styles.card}>
        <Form
          data={tokenFormData}
          onSubmit={this.handlePasswordConfirm}
          ref={this.tokenFormRef}
        >
          <Form.Item
            error={
              isAccessTokenWrong
                ? {
                    message: { message: t.html('WRONG_GITHUB_TOKEN_DESC') },
                  }
                : {}
            }
            label={t('Token')}
            desc={
              <div className="clear-right">
                <p>{t.html('GET_GITHUB_TOKEN_DESC')}</p>
              </div>
            }
          >
            <Input name="token" />
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

  render() {
    const { orgList, activeRepoIndex, getRepoListLoading } = this.props.store
    const repoList = get(
      orgList.data,
      `${activeRepoIndex}.repositories.items`,
      []
    )
    const hasNextPage = get(
      orgList.data,
      `${activeRepoIndex}.repositories.nextPage`
    )

    if (!orgList.isLoading && isEmpty(orgList.data)) {
      return (
        <div className={styles.tabContent}>
          {!orgList.isLoading ? (
            <div className={styles.orgList}>{this.renderAccessTokenForm()}</div>
          ) : (
            <Loading>
              <div className={styles.orgList} />
            </Loading>
          )}
          <div className={styles.repoList}>
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
    return (
      <div className={styles.tabContent}>
        <div className={styles.orgList}>
          {orgList.isLoading ? (
            <Loading>
              <div className={styles.orgList} />
            </Loading>
          ) : null}
          {!orgList.isLoading
            ? orgList.data.map((repo, index) => (
                <div
                  key={repo.name}
                  className={classNames(styles.repo, {
                    [styles['repo-active']]: activeRepoIndex === index,
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
            : null}
        </div>
        {getRepoListLoading ? (
          <Loading>
            <div className={styles.repoList} />
          </Loading>
        ) : (
          <div className={styles.repoList}>
            {repoList.length
              ? repoList.map((repo, index) => (
                  <div className={styles.repo} key={repo.name}>
                    <div className={styles.icon}>
                      <Icon name={this.scmType} size={40} />
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
                      <Button type="control">{t('Select this repo')}</Button>
                    </div>
                  </div>
                ))
              : null}
            {hasNextPage ? (
              <div
                className={classNames(styles.repo, styles.loadMore)}
                onClick={this.handleGetRepoList}
              >
                {t('Load more')}
              </div>
            ) : null}
          </div>
        )}
      </div>
    )
  }
}
