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
import { Alert, Form } from '@kube-design/components'

import UserGroup from '../ContainerForm/SecurityContext/UserGroup'
import SELinuxOptions from '../ContainerForm/SecurityContext/SELinuxOptions'

export default class PodSecurityContext extends React.PureComponent {
  render() {
    return (
      <Form.Group
        label={t('POD_SECURITY_CONTEXT')}
        desc={t('POD_SECURITY_CONTEXT_DESC')}
        checkable
      >
        <Alert
          className="margin-b12"
          type="info"
          title={t('NOTE')}
          message={t('POD_SECURITY_CONTEXT_TIP')}
        />
        <UserGroup prefix={this.props.prefix} />
        <SELinuxOptions prefix={this.props.prefix} />
      </Form.Group>
    )
  }
}
