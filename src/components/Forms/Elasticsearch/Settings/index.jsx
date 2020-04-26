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
import classnames from 'classnames'

import { Input } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import { UrlInput, InputPassword } from 'components/Inputs'

import { PATTERN_ES_USER_NAME, PATTERN_ES_PASSWORD } from 'utils/constants'

import fromStyles from 'src/components/Base/Form/index.scss'

import styles from './index.scss'

export default class BaseInfo extends React.Component {
  render() {
    return (
      <div className={styles.fromGroup}>
        <div className={classnames(styles.path, fromStyles.item)}>
          <label className={fromStyles.label}>{t('Service Address')}:</label>
          <div className={styles.columns}>
            <UrlInput hostName={'host'} portName={'port'} />
          </div>
          <div className={classnames(fromStyles.desc, styles.desc)}>
            {t('LOG_COLLECTION_ES_URL_TIPS')}
          </div>
        </div>

        <Form.Item
          desc={t('LOG_COLLECTION_ES_USER_TIPS')}
          label={`${t('User Name')} (${t('optional')})`}
          rules={[
            { pattern: PATTERN_ES_USER_NAME, message: t('Invalid name') },
          ]}
        >
          <Input name="HTTP_User" autoComplete="nope" />
        </Form.Item>
        <Form.Item
          label={`${t('Password')} (${t('optional')})`}
          rules={[
            {
              pattern: PATTERN_ES_PASSWORD,
              message: t('Passwords must be at least 6 characters long'),
            },
          ]}
        >
          <InputPassword
            name="HTTP_Password"
            placeholder={t('Please input password')}
            autoComplete="new-password"
          />
        </Form.Item>
      </div>
    )
  }
}
