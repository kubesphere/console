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
import { Form } from '@kube-design/components'
import { TypeSelect } from 'components/Base'

export default class ImagePullPolicy extends React.Component {
  static defaultProps = {
    prefix: '',
  }

  get prefix() {
    const { prefix } = this.props

    return prefix ? `${prefix}.` : ''
  }

  getImagePullPolicyOptions() {
    return [
      {
        icon: 'timed-task',
        label: t('IMAGE_PULL_POLICY_ALWAYS'),
        value: 'Always',
        description: t('IMAGE_PULL_POLICY_ALWAYS_DESC'),
      },
      {
        icon: 'timed-task',
        label: t('IMAGE_PULL_POLICY_IFNOTPRESENT'),
        value: 'IfNotPresent',
        description: t('IMAGE_PULL_POLICY_IFNOTPRESENT_DESC'),
      },
      {
        icon: 'timed-task',
        label: t('IMAGE_PULL_POLICY_NEVER'),
        value: 'Never',
        description: t('IMAGE_PULL_POLICY_NEVER_DESC'),
      },
    ]
  }

  render() {
    return (
      <Form.Item>
        <TypeSelect
          name={`${this.prefix}imagePullPolicy`}
          defaultValue="IfNotPresent"
          options={this.getImagePullPolicyOptions()}
        />
      </Form.Item>
    )
  }
}
