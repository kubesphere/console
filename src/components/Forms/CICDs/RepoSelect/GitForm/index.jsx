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
import { observer } from 'mobx-react'
import { Input, Select } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import styles from './index.scss'

@observer
export default class GitForm extends React.Component {
  render() {
    const { formData, credentials } = this.props.store
    const { formRef } = this.props
    return (
      <div className={styles.card}>
        <Form data={formData} ref={formRef}>
          <Form.Item
            label={t('Repository Url')}
            desc={t(
              'Any repository containing Jenkinsfile will be built automatically.'
            )}
            rules={[{ required: true, message: t('This param is required') }]}
          >
            <Input name="git_source.url" />
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
          >
            <Select
              loading={credentials.isLoading}
              name="git_source.credential_id"
              options={toJS(credentials.data)}
            />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
