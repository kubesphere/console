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

import { RadioButton, RadioGroup } from '@kube-design/components'
import { ReactComponent as BackIcon } from 'assets/back.svg'
import { set } from 'lodash'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import WorkloadStore from 'stores/workload'

import styles from './index.scss'
import WorkloadTable from './WorkloadTable'

const SCALED_OBJECT_MAPPER = {
  deployments: 'Deployment',
  statefulsets: 'StatefulSet',
}

@observer
export default class WorkloadTableForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      type: 'deployments',
      workloadData: undefined,
    }

    this.store = new WorkloadStore('deployments')
  }

  static contextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  componentDidMount() {
    const { onCancel } = this.props
    const { registerSubRoute } = this.context

    registerSubRoute && registerSubRoute(this.handleSubmit, onCancel)

    const { formTemplate } = this.props

    set(
      formTemplate,
      'spec.scaleTargetRef.kind',
      SCALED_OBJECT_MAPPER['deployments']
    )
  }

  handleGoBack = () => {
    const { resetSubRoute } = this.context

    resetSubRoute && resetSubRoute()

    this.props.onCancel()
  }

  handleSubmit = callback => {
    const { onSave } = this.props
    const { workloadData } = this.state
    onSave(workloadData)
    callback && callback()
  }

  handleTypeChange = value => {
    const { formTemplate } = this.props
    set(formTemplate, 'spec.scaleTargetRef.kind', SCALED_OBJECT_MAPPER[value])
    this.store = new WorkloadStore(value)
    this.setState({ type: value, workloadData: undefined })
  }

  fetchList = param => {
    const { namespace, cluster } = this.props
    this.store.fetchList({
      cluster,
      namespace,
      labelSelector: '!autoscaling.kubeshpere.io/name',
      annotation: '!kubesphere.io/relatedHPA',
      ...param,
    })
  }

  handleSelectWorkload = data => {
    this.setState({ workloadData: data })
  }

  render() {
    const { type, workloadData } = this.state
    return (
      <div className={styles.wrapper}>
        <div className="h6">
          <a className="icon" onClick={this.handleGoBack}>
            <BackIcon />
          </a>
          {t('ADD_WORKLOAD')}
        </div>
        <div className={styles.content}>
          <RadioGroup
            mode="button"
            buttonWidth={155}
            value={type}
            onChange={this.handleTypeChange}
          >
            <RadioButton value="deployments">{t('DEPLOYMENT_PL')}</RadioButton>
            <RadioButton value="statefulsets">
              {t('STATEFULSET_PL')}
            </RadioButton>
          </RadioGroup>

          <div className={styles.tableWrapper}>
            <WorkloadTable
              key={type}
              fetchList={this.fetchList}
              list={toJS(this.store.list)}
              module={type}
              checkedValue={workloadData}
              handleSelectWorkload={this.handleSelectWorkload}
            />
          </div>
        </div>
      </div>
    )
  }
}
