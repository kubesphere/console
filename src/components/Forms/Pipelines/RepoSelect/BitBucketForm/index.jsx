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

  get credentialsList() {
    return [
      ...this.props.store.credentials.data.map(credential => ({
        label: credential.name,
        value: credential.name,
        type: credential.type,
        data: credential.data,
      })),
    ]
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

    const credentialDetail = this.credentialsList.find(
      item => item.value === this.credentialId
    )

    await this.props.store
      .creatBitBucketServers({
        cluster,
        devops,
        apiUrl: data.apiUrl,
        secretName: this.credentialId,
        secretNamespace: devops,
        ...credentialDetail.data,
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  handleSubmit = index => {
    const { tokenFormData } = this.props.store

    const data = {
      [REPO_KEY_MAP[this.scmType]]: {
        repo: get(this.repoListData, `${index}.name`), // repo
        credential_id: this.credentialId,
        owner:
          get(this.orgList[this.activeRepoIndex], 'key') ||
          get(toJS(this.orgList), `data[${this.activeRepoIndex}].name`),
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
            label={t('BITBUCKET_SERVER_ADDRESS')}
            error={errorsBody['apiUrl']}
            rules={[
              { required: true, message: t('BITBUCKET_SERVER_EMPTY_TIP') },
            ]}
          >
            <Select
              name="apiUrl"
              options={this.state.bitbucketList}
              placeholder=" "
              searchable
            />
          </Form.Item>

          <Form.Item
            label={t('CREDENTIAL_SI')}
            rules={[
              { required: true, message: t('PIPELINE_CREDENTIAL_EMPTY_TIP') },
            ]}
            error={errorsBody['username'] || errorsBody['password']}
            desc={
              <p>
                {t('SELECT_CREDENTIAL_DESC')}
                <span
                  className={styles.clickable}
                  onClick={this.props.showCredential}
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
            {t('OK')}
          </Button>
        </Form>
      </div>
    )
  }
}
