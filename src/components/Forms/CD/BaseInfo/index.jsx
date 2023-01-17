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
import { Column, Columns, Form, Input, TextArea } from '@kube-design/components'

import { PATTERN_NAME } from 'utils/constants'
import Placement from '../Advance/Placement'

import styles from '../Advance/index.scss'

export default class BaseInfo extends React.Component {
  render() {
    const { formRef, formTemplate } = this.props
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
            <Form.Item label={t('ALIAS')} desc={t('ALIAS_DESC')}>
              <Input
                name="metadata.annotations['kubesphere.io/alias-name']"
                maxLength={63}
              />
            </Form.Item>
          </Column>
        </Columns>
        <div className={styles.wrapper}>
          <h6>{t('DEPLOY_LOCATION')}</h6>
          <div className={styles.wrapper_item}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: t('PROJECT_NOT_SELECT_DESC'),
                },
              ]}
            >
              <Placement
                name="destination"
                prefix="destination"
                formData={formTemplate}
                {...this.props}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    )
  }
}
