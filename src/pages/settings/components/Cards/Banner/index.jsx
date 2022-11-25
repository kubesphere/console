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
import { inject } from 'mobx-react'
import Banner from 'components/Cards/Banner'

@inject('rootStore')
export default class BaseBanner extends React.PureComponent {
  get tabs() {
    return {
      value: this.props.type,
      onChange: this.handleTabChange,
      options: [
        { value: 'mail', label: t('EMAIL') },
        { value: 'dingtalk', label: t('DINGTALK') },
        { value: 'wecom', label: t('WECOM') },
        { value: 'slack', label: t('SLACK') },
        { value: 'webhook', label: t('WEBHOOK') },
      ],
    }
  }

  handleTabChange = value => {
    this.props.rootStore.routing.push(`/settings/${value}`)
  }

  render() {
    return (
      <Banner
        module="notification"
        title={t('NOTIFICATION_CHANNELS')}
        description={t('NOTIFICATION_CHANNELS_DESC')}
        tabs={this.tabs}
      />
    )
  }
}
