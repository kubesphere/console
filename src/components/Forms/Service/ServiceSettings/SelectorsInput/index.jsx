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

import { isEmpty, debounce } from 'lodash'
import React from 'react'
import isEqual from 'react-fast-compare'
import { Alert, Button, Tooltip, Popper } from '@kube-design/components'

import { PropertiesInput } from 'components/Inputs'
import WorkloadStore from 'stores/workload'
import { joinSelector, isValidLabel } from 'utils'

import WorkloadSelect from '../WorkloadSelect'

import styles from './index.scss'

export default class SelectorsInput extends React.Component {
  constructor(props) {
    super(props)

    this.store = new WorkloadStore()

    this.state = {
      relatedDeployments: [],
      relatedDaemonSets: [],
      relatedStatefulSets: [],
    }

    if (!isEmpty(props.value)) {
      this.fetchRelatedWorkloads(props)
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.value, this.props.value)) {
      this.fetchRelatedWorkloads(this.props)
    }
  }

  fetchRelatedWorkloads = debounce(props => {
    const { value, cluster, namespace } = props

    if (
      isEmpty(value) ||
      Object.keys(value).some(isEmpty) ||
      Object.values(value).some(isEmpty)
    ) {
      this.setState({
        relatedDeployments: [],
        relatedDaemonSets: [],
        relatedStatefulSets: [],
      })
      return
    }

    if (!isValidLabel(value)) {
      return
    }

    const labelSelector = joinSelector(value)

    Promise.all([
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
        module: 'daemonsets',
      }),
      this.store.fetchListByK8s({
        cluster,
        namespace,
        labelSelector,
        module: 'statefulsets',
      }),
    ]).then(([relatedDeployments, relatedDaemonSets, relatedStatefulSets]) => {
      this.setState({
        relatedDeployments,
        relatedDaemonSets,
        relatedStatefulSets,
      })
    })
  }, 500)

  handleWorkloadSelect = labels => {
    const { onChange } = this.props
    onChange && onChange(labels)
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  renderRelatedTips() {
    const { value: selector } = this.props

    const {
      relatedDeployments,
      relatedDaemonSets,
      relatedStatefulSets,
    } = this.state
    const count =
      relatedDeployments.length +
      relatedDaemonSets.length +
      relatedStatefulSets.length

    if (isEmpty(selector)) {
      return null
    }

    if (count === 0) {
      const tips = t('NO_WORKLOAD_MATCH_SELECTOR')
      return <Alert className={styles.alert} message={tips} type="warning" />
    }

    const labelStr = Object.entries(selector)
      .map(([key, value]) => `${key}=${value}`)
      .join(', ')

    const tips =
      count === 1
        ? t('WORKLOADS_MATCH_SELECTOR_SI', { selector: labelStr, count })
        : t('WORKLOADS_MATCH_SELECTOR_PL', { selector: labelStr, count })

    const popContent = (
      <div>
        <p>{t('TOTAL_WORKLOADS_VALUE', { count })}</p>
        {relatedDeployments.map(({ name }) => (
          <p key={`deploy-${name}`}>
            {t('DEPLOYMENTS_VALUE', { value: name })}
          </p>
        ))}
        {relatedDaemonSets.map(({ name }) => (
          <p key={`ds-${name}`}>{t('STATEFULSETS_VALUE', { value: name })}</p>
        ))}
        {relatedStatefulSets.map(({ name }) => (
          <p key={`sts-${name}`}>{t('STATEFULSETS_VALUE', { value: name })}</p>
        ))}
      </div>
    )

    const message = (
      <div>
        <p className="inline-block">{tips}</p>
        &nbsp;
        <Tooltip content={popContent} trigger="click">
          <a className="text-green">{t('VIEW_DETAILS')}</a>
        </Tooltip>
      </div>
    )

    return <Alert className={styles.alert} message={message} type="warning" />
  }

  renderWorkloadSelectForm() {
    const { cluster, namespace } = this.props
    return (
      <WorkloadSelect
        cluster={cluster}
        namespace={namespace}
        onSelect={this.handleWorkloadSelect}
        onCancel={this.handleCancel}
      />
    )
  }

  render() {
    const { visible } = this.state
    return (
      <div className={styles.wrapper}>
        {this.renderRelatedTips()}
        <PropertiesInput {...this.props} controlled />
        <Popper
          className={styles.popper}
          trigger="click"
          visible={visible}
          placement="right"
          content={this.renderWorkloadSelectForm()}
          closeAfterClick={false}
        >
          <Button className={styles.workload}>{t('SPECIFY_WORKLOAD')}</Button>
        </Popper>
      </div>
    )
  }
}
