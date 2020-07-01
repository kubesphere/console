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
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty, get, remove } from 'lodash'

import TargetResourceStore from 'stores/alerting/resource'

import {
  RadioButton,
  RadioGroup,
  Input,
  Select,
  Tooltip,
  Icon,
} from '@pitrix/lego-ui'
import { Form, ScrollLoad } from 'components/Base'
import { ArrayInput, ObjectInput } from 'components/Inputs'
import WorkloadItem from './WorkloadItem'

import styles from './index.scss'

@observer
export default class ResourceTarget extends React.Component {
  static contextTypes = {
    updateResource: PropTypes.func,
    showFormError: PropTypes.func,
    hideFormError: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      type: this.getType(props),
      filterType: this.getFilterType(),
      selectedWorkloads: this.getSelectedWorkloads(props),
      selectors: this.getSelectors(props),
    }

    this.store = new TargetResourceStore()
  }

  get namespace() {
    return this.props.namespace
  }

  get filterTypeOptions() {
    return [
      {
        label: t('Deployments'),
        value: 'deployments',
      },
      {
        label: t('StatefulSets'),
        value: 'statefulsets',
      },
      {
        label: t('DaemonSets'),
        value: 'daemonsets',
      },
    ]
  }

  isWorkloadChecked = workload =>
    !isEmpty(
      this.state.selectedWorkloads.find(item => item.uid === workload.uid)
    )

  getFilterType = () => {
    const type = get(
      this.props,
      'formTemplate.resource_filter.rs_filter_param.workload_kind',
      'deployment'
    )
    return `${type}s`
  }

  getType = (props = {}) =>
    get(props.formTemplate, 'resource_filter._type') || 'workload'

  getSelectedWorkloads = (props = {}) =>
    get(props.formTemplate, 'resource_filter._workloads') || []

  getSelectors = (props = {}) =>
    get(props.formTemplate, 'resource_filter._selectors') || [{}]

  checkItemValid = item => !(isEmpty(item) || (!item.key && !item.value))

  fetchWorkloads = (params = {}) => {
    const { cluster, namespace } = this.props
    const { filterType } = this.state

    this.store.fetchWorkloads({
      type: filterType,
      cluster,
      namespace,
      ...params,
    })
  }

  handleTypeChange = type => {
    this.setState({ type }, () => {
      this.context.hideFormError()
    })
  }

  handleFilterChange = filterType => {
    this.setState({ filterType }, () => {
      if (this.state.type === 'workload') {
        this.fetchWorkloads()
      }
    })
  }

  handleSelectWorkload = (name, workload) => {
    this.setState(
      ({ selectedWorkloads }) => {
        if (this.isWorkloadChecked(workload)) {
          remove(selectedWorkloads, item => item.name === name)
        } else {
          selectedWorkloads.push(workload)
        }
        return { selectedWorkloads }
      },
      () => {
        if (!isEmpty(this.state.selectedWorkloads)) {
          this.context.hideFormError()
        }
      }
    )
  }

  handleSelectorChange = (selectors = []) => {
    this.setState({ selectors }, () => {
      if (!isEmpty(this.state.selectors)) {
        this.context.hideFormError()
      }
    })
  }

  resourceValidator = (rule, value, callback) => {
    const { filterType, type } = this.state
    const workload_kind = filterType.slice(0, -1)
    let data = {}

    if (type === 'workload') {
      const { selectedWorkloads } = this.state
      const workload_name = selectedWorkloads.map(item => item.name).join('|')

      if (isEmpty(selectedWorkloads)) {
        this.context.showFormError({ message: t('RESOURCE_WORKLOAD_FORM_TIP') })
        return callback({
          message: '',
          field: '_workloads',
        })
      }

      data = {
        rs_filter_param: {
          ns_name: this.namespace,
          workload_name,
          workload_kind,
        },
        _workloads: [...selectedWorkloads],
        _type: 'workload',
      }
    }

    if (type === 'selector') {
      const { selectors = [] } = this.state
      const selector = selectors
        .filter(item => !isEmpty(item.key))
        .map(item => ({
          [item.key]: item.value,
        }))

      if (isEmpty(selector)) {
        this.context.showFormError({ message: t('RESOURCE_SELECTOR_FORM_TIP') })
        return callback({
          message: '',
          field: '_selectors',
        })
      }

      data = {
        rs_filter_param: {
          ns_name: this.namespace,
          selector,
          workload_kind,
        },
        _selectors: selectors,
        _type: 'selector',
      }
    }

    this.context.updateResource('workload', data)
    return callback()
  }

  renderWorkloads() {
    const { data, total, page, isLoading } = this.store.workloads
    const workloads = toJS(data)

    return (
      <div className={styles.box}>
        <ScrollLoad
          className={styles.workloads}
          data={workloads}
          total={total}
          page={page}
          loading={isLoading}
          onFetch={this.fetchWorkloads}
        >
          {workloads.map(workload => (
            <WorkloadItem
              key={workload.name}
              type={this.state.filterType}
              data={workload}
              checked={this.isWorkloadChecked(workload)}
              onClick={this.handleSelectWorkload}
            />
          ))}
        </ScrollLoad>
      </div>
    )
  }

  renderSelector() {
    const { selectors } = this.state

    return (
      <div className={classnames(styles.box, styles.selectors)}>
        <ArrayInput
          className={styles.inputs}
          itemType="object"
          value={selectors}
          onChange={this.handleSelectorChange}
          checkItemValid={this.checkItemValid}
          addText={t('Add Selector')}
        >
          <ObjectInput>
            <Input name="key" placeholder={t('key')} />
            <Input name="value" rows="1" placeholder={t('value')} />
          </ObjectInput>
        </ArrayInput>
      </div>
    )
  }

  render() {
    const { type, filterType, selectedWorkloads } = this.state

    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <RadioGroup
            wrapClassName="radio-default"
            buttonWidth={155}
            value={type}
            onChange={this.handleTypeChange}
            size="small"
          >
            <RadioButton value="workload">{t('Workloads')}</RadioButton>
            <RadioButton value="selector">{t('Selector')}</RadioButton>
          </RadioGroup>
          <div className={styles.actions}>
            <Select
              className={styles.select}
              value={filterType}
              options={this.filterTypeOptions}
              onChange={this.handleFilterChange}
              disabled={!isEmpty(selectedWorkloads)}
            />
            <Tooltip content={t('PROJECT_MONITOR_TARGET_TIPS')}>
              <Icon className={styles.monitorTargetTips} name="question" />
            </Tooltip>
          </div>
        </div>
        <div className={styles.content}>
          <Form.Item rules={[{ validator: this.resourceValidator }]}>
            {type === 'workload'
              ? this.renderWorkloads()
              : this.renderSelector()}
          </Form.Item>
        </div>
      </div>
    )
  }
}
