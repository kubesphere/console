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
import { get } from 'lodash'
import { Tooltip, Icon } from '@kube-design/components'
import { Status } from 'components/Base'

export default class Health extends Component {
  render() {
    const { health } = this.props.detail
    const message = get(this.props.detail, 'lastError.description')
    return (
      <div>
        <Status
          type={health}
          name={t(`ALERT_RULE_HEALTH_${health.toUpperCase()}`)}
        />
        {health === 'err' && message && (
          <Tooltip content={message}>
            <Icon name="question" />
          </Tooltip>
        )}
      </div>
    )
  }
}
