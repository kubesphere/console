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
import { pick } from 'lodash'
import { Form, Input, Select, Tag } from '@kube-design/components'
import { observer } from 'mobx-react'

import styles from './index.scss'

@observer
export default class SvnForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { type: 'svn' }
  }

  handleTypeChange = value => {
    this.setState({ type: value })
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
        {type && t(`CREDENTIAL_TYPE_${type.toUpperCase()}`)}
      </Tag>
    </span>
  )

  render() {
    const { formData, credentials } = this.props.store
    const { formRef, enableTypeChange } = this.props

    return (
      <div className={styles.card}>
        <Form data={formData} ref={formRef}>
          <Form.Item label={t('TYPE')}>
            <Select
              name="svn_source.type"
              disabled={enableTypeChange === false}
              onChange={this.handleTypeChange}
              options={[
                { label: t('SINGLE_SVN'), value: 'single_svn' },
                { label: t('SVN'), value: 'svn' },
              ]}
              defaultValue={'svn'}
            />
          </Form.Item>
          <Form.Item
            label={t('CODE_REPOSITORY_ADDRESS')}
            rules={[
              {
                required: true,
                message: t('CODE_REPOSITORY_ADDRESS_EMPTY_TIP'),
              },
            ]}
          >
            <Input name="svn_source.remote" />
          </Form.Item>
          <Form.Item
            label={t('CREDENTIAL_SI')}
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
            rules={[
              { required: true, message: t('PIPELINE_CREDENTIAL_EMPTY_TIP') },
            ]}
          >
            <Select
              name="svn_source.credential_id"
              options={this.getCredentialsList()}
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
          {this.state.type !== 'single_svn' ? (
            <React.Fragment>
              <Form.Item label={t('BRANCH_INCLUDED')}>
                <Input
                  name="svn_source.includes"
                  defaultValue="trunk,branches/*,tags/*,sandbox/*"
                />
              </Form.Item>
              <Form.Item label={t('BRANCH_EXCLUDED')}>
                <Input name="svn_source.excludes" />
              </Form.Item>
            </React.Fragment>
          ) : null}
        </Form>
      </div>
    )
  }
}
