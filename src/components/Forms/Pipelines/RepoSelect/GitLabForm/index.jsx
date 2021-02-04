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
import { Form, Input, Select, Tag } from '@kube-design/components'

import { pick, get } from 'lodash'
import styles from './index.scss'

@observer
export default class GitLabForm extends React.Component {
  state = {
    serverList: [],
    projectList: [],
  }

  async componentDidMount() {
    const { devops, cluster } = this.props

    const serverList = await this.props.store.fetchGitLabServerList({
      devops,
      cluster,
    })
    this.setState({
      serverList,
    })
  }

  getProjectListByOwner = async e => {
    const owner = e.target.value
    const { devops, cluster } = this.props
    const { formData } = this.props.store
    const server = get(formData, 'gitlab_source.server_name')

    if (server) {
      const projectList = await this.props.store.fetchGitLabProjectList({
        devops,
        cluster,
        owner,
        server,
      })

      this.setState({ projectList })
    }
  }

  getProjectListByServerName = async server => {
    const { formData } = this.props.store
    const { devops, cluster } = this.props
    const owner = get(formData, 'gitlab_source.owner')

    if (owner) {
      const projectList = await this.props.store.fetchGitLabProjectList({
        devops,
        cluster,
        owner,
        server,
      })

      this.setState({ projectList })
    }
  }

  getCredentialsListData = params => {
    const { devops, cluster } = this.props
    return this.props.store.getCredentials({ devops, cluster, ...params })
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

  optionRender = ({ label, type, disabled }) => (
    <span style={{ display: 'flex', alignItem: 'center' }}>
      {label}&nbsp;&nbsp;
      <Tag type={disabled ? '' : 'warning'}>
        {type === 'ssh' ? 'SSH' : t(type)}
      </Tag>
    </span>
  )

  render() {
    const { formData, credentials } = this.props.store
    const { formRef } = this.props
    const { serverList, projectList } = this.state

    return (
      <div className={styles.card}>
        <Form data={formData} ref={formRef}>
          <Form.Item
            label={t('GitLab Server')}
            rules={[{ required: true, message: t('This param is required') }]}
          >
            <Select
              name="gitlab_source.server_name"
              options={serverList}
              onChange={this.getProjectListByServerName}
            />
          </Form.Item>
          <Form.Item
            label={t('GitLab Owner')}
            rules={[{ required: true, message: t('This param is required') }]}
          >
            <Input
              name="gitlab_source.owner"
              onBlur={this.getProjectListByOwner}
            />
          </Form.Item>
          <Form.Item
            label={t('Credential')}
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
              name="gitlab_source.credential_id"
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
          <Form.Item
            label={t('Repository Name')}
            rules={[{ required: true, message: t('This param is required') }]}
          >
            <Select name="gitlab_source.repo" options={projectList} />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
