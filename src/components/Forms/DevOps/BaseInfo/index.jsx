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
import { Input, TextArea } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import Title from 'components/Forms/Base/Title'
import { PATTERN_NAME } from 'utils/constants'

import styles from './index.scss'

export default class BaseInfo extends React.Component {
  render() {
    const { formRef, formTemplate } = this.props

    return (
      <div>
        <Title
          className={styles.devopsTitle}
          title={t('Basic Info')}
          desc={t('DEVOPS_BASEINFO_DESC')}
        />
        <Form className={styles.form} data={formTemplate} ref={formRef}>
          <Form.Item
            label={t('Name')}
            desc={t('NAME_DESC')}
            rules={[
              { required: true, message: t('Please input name') },
              { pattern: PATTERN_NAME, message: t('PATTERN_NAME_INVALID_TIP') },
            ]}
          >
            <Input name="name" autoFocus={true} maxLength={63} />
          </Form.Item>
          <Form.Item label={t('Description')}>
            <TextArea name="description" />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
