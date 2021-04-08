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
import { action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { isEmpty, get, pick } from 'lodash'
import { Form, Button, Select } from '@kube-design/components'

import { REPO_KEY_MAP } from 'utils/constants'

import GitHubForm from '../GithubForm'
import styles from './index.scss'

@observer
export default class BitBucketForm extends GitHubForm {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      bitbucketList: [],
    }
  }

  get scmType() {
    return 'bitbucket_server'
  }

  componentDidMount() {
    this.getBitbucketList()
  }

  getBitbucketList = async () => {
    const bitbucketList = await this.props.store.getBitbucketList({
      cluster: this.props.cluster,
    })
    this.setState({ bitbucketList })
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

    this.credentialId = data.credentialId

    if (isEmpty(data) || !this.credentialId) return false

    this.setState({ isLoading: true })

    const credentialDetail = await this.props.store.getCredentialDetail({
      cluster,
      devops,
      credential_id: this.credentialId,
    })

    if (!isEmpty(credentialDetail)) {
      await this.props.store
        .creatBitBucketServers({
          cluster,
          devops,
          credentialId: this.credentialId,
          apiUrl: data.apiUrl,
          ...credentialDetail.data,
        })
        .finally(() => {
          this.setState({ isLoading: false })
        })
    } else {
      this.setState({ isLoading: false })
    }
  }

  handleSubmit = e => {
    const { tokenFormData } = this.props.store
    const index = e.currentTarget.dataset && e.currentTarget.dataset.repoIndex

    const data = {
      [REPO_KEY_MAP[this.scmType]]: {
        repo: get(this.repoListData, `${index}.name`), // repo
        credential_id: this.credentialId,
        owner: get(this.orgList[this.activeRepoIndex], 'key'),
        api_uri: get(tokenFormData, 'apiUrl'),
        discover_branches: 1,
        discover_pr_from_forks: { strategy: 2, trust: 2 },
        discover_pr_from_origin: 2,
        discover_tags: true,
        description: get(this.repoListData, `${index}.description`),
      },
    }
    this.props.handleSubmit(data)
  }

  renderAccessTokenForm = () => {
    const {
      tokenFormData,
      creatBitBucketServersError: errors = {},
      credentials,
    } = this.props.store
    const errorsBody = toJS(errors)

    return (
      <div className={styles.card}>
        <Form
          data={tokenFormData}
          onChange={this.handleFormChange}
          onSubmit={this.handlePasswordConfirm}
          ref={this.tokenFormRef}
        >
          <Form.Item
            label="Bitbucket Server"
            error={errorsBody['apiUrl']}
            rules={[{ required: true, message: t('This param is required') }]}
          >
            <Select
              name="apiUrl"
              options={this.state.bitbucketList}
              searchable
            />
          </Form.Item>

          <Form.Item
            label={t('Credential')}
            rules={[{ required: true, message: t('This param is required') }]}
            error={errorsBody['username'] || errorsBody['password']}
            desc={
              <p>
                {t('ADD_NEW_CREDENTIAL_DESC')}
                <span
                  className={styles.clickable}
                  onClick={this.props.showCredential}
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
            />
          </Form.Item>

          {errorsBody.all ? (
            <p className={styles.error}>{errorsBody.all}</p>
          ) : null}
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
