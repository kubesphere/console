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

import { Column, Columns, Form, Input, TextArea } from '@kube-design/components'
import React from 'react'

import { PATTERN_NAME, PATTERN_ALIAS_NAME } from 'utils/constants'

import CodeRepoSelector from '../../../CodeRepoSelector'

export default class BaseInfo extends React.Component {
  render() {
    const { formRef, formTemplate, devops, cluster } = this.props
    return (
      <Form ref={formRef} data={formTemplate}>
        <Columns>
          <Column>
            <Form.Item
              label={t('NAME')}
              desc={t('NAME_DESC')}
              rules={[
                { required: true, message: t('NAME_EMPTY_DESC') },
                {
                  pattern: PATTERN_NAME,
                  message: t('INVALID_NAME_DESC'),
                },
              ]}
            >
              <Input name="metadata.name" maxLength={63} />
            </Form.Item>
            <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
              <TextArea
                name="metadata.annotations['kubesphere.io/description']"
                maxLength={256}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('ALIAS')}
              desc={t('ALIAS_NAME_DESC')}
              rules={[
                {
                  pattern: PATTERN_ALIAS_NAME,
                  message: t('INVALID_ALIAS_NAME_DESC'),
                },
              ]}
            >
              <Input
                name="metadata.annotations['kubesphere.io/alias-name']"
                maxLength={63}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Form.Item
          label={t('CODE_REPOSITORY')}
          rules={[{ required: true, message: t('REPO_EMPTY_DESC') }]}
        >
          <CodeRepoSelector name="repoURL" devops={devops} cluster={cluster} />
        </Form.Item>
      </Form>
    )
  }
}
