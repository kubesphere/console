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
import { get } from 'lodash'
import { observer, inject } from 'mobx-react'
import { QUOTAS_MAP } from 'utils/constants'

import Banner from 'components/Cards/Banner'

@inject('rootStore')
@observer
export default class JobBanner extends React.Component {
  get routing() {
    return this.props.rootStore.routing
  }

  get quota() {
    return this.props.rootStore.quota
  }

  handleTabChange = value => {
    const { namespace } = this.props
    this.routing.push(`/projects/${namespace}/${value}`)
  }

  getCount(module) {
    if (module === this.props.module && !isNaN(this.props.total)) {
      return this.props.total
    }

    return get(this.quota.data, `used["${QUOTAS_MAP[module].name}"]`, 0)
  }

  get tabs() {
    return {
      value: this.props.module,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'jobs',
          label: t('Jobs'),
          count: this.getCount('jobs'),
        },
        {
          value: 'cronjobs',
          label: t('CronJobs'),
          count: this.getCount('cronjobs'),
        },
      ],
    }
  }

  render() {
    return (
      <Banner
        className="margin-b12"
        title={t('Jobs')}
        description={t('JOB_DESC')}
        module={this.props.module}
        tabs={this.tabs}
      />
    )
  }
}
