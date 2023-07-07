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
import { Form, Input, Column, Columns } from '@kube-design/components'

import CodeRepoSelector from '../../../CodeRepoSelector'

export default class Advance extends React.Component {
  render() {
    const { formRef, formTemplate, devops, cluster, trigger } = this.props
    // TODO: v3.4 directory recurse
    return (
      <Form data={formTemplate} ref={formRef}>
        <Form.Item
          label={t('CODE_REPOSITORY')}
          rules={[{ required: true, message: t('REPO_EMPTY_DESC') }]}
        >
          <CodeRepoSelector
            name="repoURL"
            devops={devops}
            cluster={cluster}
            trigger={trigger}
          />
        </Form.Item>
        <Form.Item>
          <Columns>
            <Column>
              <Form.Item label={t('REVISION')} desc={t('REVISIONS_DESC')}>
                <Input name="source.targetRevision" defaultValue="HEAD" />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item
                label={t('MANIFEST_FILE_PATH')}
                desc={t('MANIFEST_FILE_PATH_DESC')}
              >
                <Input name="source.path" defaultValue="." />
              </Form.Item>
            </Column>
          </Columns>
        </Form.Item>
      </Form>
    )
  }
}
