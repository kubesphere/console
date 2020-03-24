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
import { observer, inject } from 'mobx-react'

import { renderRoutes } from 'utils/router.config'

import Banner from 'components/Cards/Banner'

class AlertingMessage extends React.Component {
  get tips() {
    return [
      {
        title: t('REQUESTS_FOR_TRIGGER_AN_ALARM_Q'),
        description: t('REQUESTS_FOR_TRIGGER_AN_ALARM_A'),
      },
    ]
  }

  render() {
    const { route } = this.props

    return (
      <div>
        <Banner
          title={t('Alerting Messages')}
          description={t('ALERT_MESSAGE_DESC')}
          icon="loudspeaker"
          tips={this.tips}
          routes={route.routes}
        />
        <div className="margin-t12">{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}

export default inject('rootStore')(observer(AlertingMessage))
export const Component = AlertingMessage
