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
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import { observer } from 'mobx-react'
import { Loading } from '@kube-design/components'

import WorkloadStore from 'stores/workload'

import { Panel } from 'components/Base'

import { joinSelector } from 'utils'

import Item from './Item'

import styles from './index.scss'

@observer
export default class WorkloadsCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    selector: PropTypes.object,
  }

  static defaultProps = {
    prefix: '',
    selector: {},
  }

  store = new WorkloadStore()

  state = {
    workloads: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const { selector, cluster, namespace } = this.props
    if (!isEmpty(selector)) {
      this.setState({ isLoading: true })
      const labelSelector = joinSelector(selector)
      const [deployments, statefulsets, daemonsets] = await Promise.all([
        this.store.fetchListByK8s({
          cluster,
          namespace,
          labelSelector,
          module: 'deployments',
        }),
        this.store.fetchListByK8s({
          cluster,
          namespace,
          labelSelector,
          module: 'statefulsets',
        }),
        this.store.fetchListByK8s({
          cluster,
          namespace,
          labelSelector,
          module: 'daemonsets',
        }),
      ])
      this.setState({
        workloads: [...deployments, ...statefulsets, ...daemonsets],
        isLoading: false,
      })
    }
  }

  renderContent() {
    const { prefix } = this.props
    const { workloads, isLoading } = this.state

    if (isEmpty(workloads) && !isLoading) {
      return (
        <div className={styles.empty}>
          {t('NOT_AVAILABLE', { resource: t('Workload') })}
        </div>
      )
    }

    return (
      <Loading spinning={isLoading}>
        <div className={styles.content}>
          {workloads.map(workload => (
            <Item
              key={`${workload.module}-${workload.name}`}
              prefix={prefix}
              detail={workload}
            />
          ))}
        </div>
      </Loading>
    )
  }

  render() {
    const { className } = this.props

    return (
      <Panel
        className={classnames(styles.main, className)}
        title={t('Workloads')}
      >
        {this.renderContent()}
      </Panel>
    )
  }
}
