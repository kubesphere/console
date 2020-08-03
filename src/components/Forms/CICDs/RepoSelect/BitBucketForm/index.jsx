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
import { action } from 'mobx'
import { observer } from 'mobx-react'
import { isEmpty, get } from 'lodash'
import { Input } from '@pitrix/lego-ui'
import { Form, Button } from 'components/Base'
import { REPO_KEY_MAP } from 'utils/constants'

import GitHubForm from '../GithubForm'
import styles from './index.scss'

@observer
export default class BitBucketForm extends GitHubForm {
  state = {
    isLoading: false,
  }

  get scmType() {
    return 'bitbucket_server'
  }

  handleFormChange = () => {
    const { creatBitBucketServersError: errors = {} } = this.props.store
    if (!isEmpty(errors)) {
      this.props.store.clearBitbucketErrors()
    }
  }

  @action
  handlePasswordConfirm = async () => {
    const { cluster, devops } = this.props
    const data = this.tokenFormRef.current.getData()
    this.setState({ isLoading: true })
    await this.props.store
      .creatBitBucketServers({ cluster, devops, ...data })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  handleSubmit = e => {
    const {
      orgList,
      activeRepoIndex,
      bitbucketCredentialId,
      tokenFormData,
    } = this.props.store
    const index = e.currentTarget.dataset && e.currentTarget.dataset.repoIndex
    const data = {
      [REPO_KEY_MAP[this.scmType]]: {
        repo: get(
          orgList.data,
          `${activeRepoIndex}.repositories.items.${index}.name`
        ), // repo
        credential_id: bitbucketCredentialId,
        owner: get(orgList.data[activeRepoIndex], 'key'),
        api_uri: get(tokenFormData, 'apiUrl'),
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

  renderAccessTokenForm() {
    const {
      tokenFormData,
      creatBitBucketServersError: errors = {},
    } = this.props.store

    return (
      <div className={styles.card}>
        <Form
          data={tokenFormData}
          onChange={this.handleFormChange}
          onSubmit={this.handlePasswordConfirm}
          ref={this.tokenFormRef}
        >
          <Form.Item label="Bitbucket Server" error={errors['apiUrl']}>
            <Input name="apiUrl" />
          </Form.Item>
          <Form.Item label={t('Username')} error={errors['username']}>
            <Input name="username" />
          </Form.Item>
          <Form.Item label={t('Password')} error={errors['password']}>
            <Input name="password" type="password" />
          </Form.Item>
          {errors.all ? <p className={styles.error}>{errors.all}</p> : null}
          <Button
            className={styles.confirmButton}
            onClick={this.handlePasswordConfirm}
            loading={this.state.isLoading}
          >
            {t('Confirm')}
          </Button>
        </Form>
      </div>
    )
  }
}
