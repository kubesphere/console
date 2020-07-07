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

import React, { Component } from 'react'
import { Form } from 'components/Base'
import { Select } from '@pitrix/lego-ui'

import styles from './index.scss'

class LogCollectionStatusForm extends Component {
  statusLabel = [
    {
      label: t('Activated'),
      value: 1,
    },
    {
      label: t('Closed'),
      value: 0,
    },
  ]

  render() {
    return (
      <div>
        <p className={styles.tip}>{t('LOG_COLLECTION_ENABLE_TIPS')}</p>
        <Form.Item>
          <Select name="enabled" options={this.statusLabel} />
        </Form.Item>
      </div>
    )
  }
}

export default LogCollectionStatusForm
