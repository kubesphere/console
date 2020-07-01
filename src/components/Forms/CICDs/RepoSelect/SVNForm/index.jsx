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
import { toJS } from 'mobx'
import { Input, Select } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
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

  render() {
    const { formData, credentials } = this.props.store
    const { formRef, enableTypeChange } = this.props

    return (
      <div className={styles.card}>
        <Form data={formData} ref={formRef}>
          <Form.Item label={t('type')}>
            <Select
              name="svn_source.type"
              disabled={enableTypeChange === false}
              onChange={this.handleTypeChange}
              options={[
                { label: t('single Svn'), value: 'single_svn' },
                { label: 'svn', value: 'svn' },
              ]}
              defaultValue={'svn'}
            />
          </Form.Item>
          <Form.Item
            label={t('Remote Repository URL')}
            rules={[{ required: true, message: t('This param is required') }]}
          >
            <Input name="svn_source.remote" />
          </Form.Item>
          <Form.Item
            label={t('Certificate')}
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
            rules={[{ required: true, message: t('This param is required') }]}
          >
            <Select
              loading={credentials.isLoading}
              name="svn_source.credential_id"
              options={toJS(credentials.data)}
            />
          </Form.Item>
          {this.state.type !== 'single_svn' ? (
            <React.Fragment>
              <Form.Item label={t('Branch Included')}>
                <Input
                  name="svn_source.includes"
                  defaultValue="trunk,branches/*,tags/*,sandbox/*"
                />
              </Form.Item>
              <Form.Item label={t('Branch Excluded')}>
                <Input name="svn_source.excludes" />
              </Form.Item>
            </React.Fragment>
          ) : null}
        </Form>
      </div>
    )
  }
}
