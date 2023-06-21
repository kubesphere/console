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
import { pick } from 'lodash'
import { Select } from '@kube-design/components'
import styles from './index.scss'

export default class WorkloadSelect extends Component {
  selectRef = React.createRef()

  get pagination() {
    const { stores, value } = this.props
    return pick(stores[value.kind].list, ['page', 'limit', 'total'])
  }

  handleNamesChange = names => {
    const { value, onChange } = this.props

    onChange({
      ...value,
      names,
    })
  }

  handlekindChange = kind => {
    this.props.onChange({
      ...this.props.value,
      kind,
      names: [],
    })
    this.props.fetchWorkloads(kind, {})
    this.selectRef.current.state.value = []
  }

  render() {
    const { value, workloads, fetchWorkloads, isLoading } = this.props

    return (
      <>
        <div>
          <Select
            value={value.kind}
            options={[
              {
                label: t('DEPLOYMENT'),
                value: 'Deployment',
              },
              {
                label: t('STATEFULSET'),
                value: 'StatefulSet',
              },
              {
                label: t('DAEMONSET'),
                value: 'DaemonSet',
              },
            ]}
            onChange={this.handlekindChange}
          />
        </div>
        <div>
          <label className={styles.alertRule}>{t('MONITORING_TARGETS')}</label>
          <Select
            value={value.names}
            ref={this.selectRef}
            options={workloads}
            pagination={this.pagination}
            isLoading={isLoading}
            onFetch={params => fetchWorkloads(value.kind, params)}
            onChange={this.handleNamesChange}
            searchable
            multi
            placeholder={t('WORKLOAD')}
          />
        </div>
      </>
    )
  }
}
