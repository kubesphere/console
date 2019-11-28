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

import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { get } from 'lodash'

import PodMonitorStore from 'stores/monitoring/pod'

import Base from './Base'

@observer
export default class PodsDataModal extends Base {
  static propTypes = {
    ...Base.propTypes,
    module: PropTypes.string,
    name: PropTypes.string,
    namespace: PropTypes.string,
  }

  static defaultProps = {
    ...Base.defaultProps,
    module: 'deployments',
    name: '',
    namespace: '',
  }

  get name() {
    return 'Pods'
  }

  get resourceParams() {
    const { module, namespace, name } = this.props

    return {
      namespace,
      workloadKind: module,
      workloadName: name,
    }
  }

  get resources() {
    return toJS(get(this.resourceStore, 'sort', {}))
  }

  get resourcesData() {
    return get(this.resources, `data[${this.metricType}].data.result`, [])
  }

  get monitorsData() {
    return get(this.monitorStore, `data[${this.metricType}].data.result`, [])
  }

  init() {
    const store = new PodMonitorStore()
    this.resourceStore = store
    this.monitorStore = store
  }

  fetchResources = async params => {
    await this.resourceStore.fetchSortedMetrics({
      metrics: [this.metricType],
      limit: 20,
      ...this.resourceParams,
      ...params,
    })
  }

  fetchMonitorings = async params => {
    const { checked } = this.state

    await this.monitorStore.fetchMetrics({
      resources: checked,
      metrics: [this.metricType],
      ...this.resourceParams,
      ...params,
    })
  }
}
