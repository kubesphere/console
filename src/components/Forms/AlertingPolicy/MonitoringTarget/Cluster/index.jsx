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

import { RadioButton, RadioGroup, Input, Select } from '@pitrix/lego-ui'
import { Form, ScrollLoad } from 'components/Base'
import { ArrayInput, ObjectInput } from 'components/Inputs'
import NodeItem from './NodeItem'
import ServiceComponentItem from './SCItem'

import styles from './index.scss'

const NodeMetrics = {
  cpu_usage: 'node_cpu_usage',
  cpu_total: 'node_cpu_total',
  cpu_utilisation: 'node_cpu_utilisation',
  memory_usage: 'node_memory_usage_wo_cache',
  memory_total: 'node_memory_total',
  memory_utilisation: 'node_memory_utilisation',
  pod_count: 'node_pod_running_count',
  pod_total: 'node_pod_quota',
  pod_utilisation: 'node_pod_utilisation',
}

@observer
export default class ClusterTarget extends React.Component {
  static contextTypes = {
    updateResource: PropTypes.func,
    showFormError: PropTypes.func,
    hideFormError: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      type: this.getType(props),
      role: 'all',
      sortType: 'cpu_utilisation',
      selectedNodes: this.getSelectedNodes(props),
      selectors: this.getSelectors(props),
      selectedComponent: this.getSelectedComponent(props),
    }

    this.store = new TargetResourceStore()
  }

  get roleOptions() {
    return [
      {
        label: t('节点角色: 全部'),
        value: 'all',
      },
      {
        label: t('节点角色: master'),
        value: 'master',
      },
      {
        label: t('节点角色: log'),
        value: 'log',
      },
    ]
  }

  get sortTypeOptions() {
    return [
      {
        label: t('Sort By node_cpu_utilisation'),
        value: 'cpu_utilisation',
      },
      {
        label: t('Sort By node_memory_utilisation'),
        value: 'memory_utilisation',
      },
      {
        label: t('Sort By node_pod_utilisation'),
        value: 'pod_utilisation',
      },
    ]
  }

  getType = (props = {}) =>
    get(props.formTemplate, 'resource_filter._type') || 'node'

  getSelectedNodes = (props = {}) =>
    get(props.formTemplate, 'resource_filter._nodes') || []

  getSelectors = (props = {}) =>
    get(props.formTemplate, 'resource_filter._selectors') || [{}]

  getSelectedComponent = (props = {}) =>
    get(props.formTemplate, 'resource_filter._component') || ''

  isNodeChecked = node => this.state.selectedNodes.indexOf(node) !== -1

  isComponentChecked = component => this.state.selectedComponent === component

  checkItemValid = item => !(isEmpty(item) || (!item.key && !item.value))

  fetchNodes = (params = {}) => {
    const { sortType } = this.state

    this.store.fetchNodes({
      cluster: this.props.cluster,
      metrics: Object.values(NodeMetrics),
      sort_metric: NodeMetrics[sortType],
      ...params,
    })
  }

  fetchComponents = () => {
    this.store.fetchComponents()
  }

  handleTypeChange = type => {
    this.setState({ type }, () => {
      this.context.hideFormError()
    })
  }

  handleRoleChange = role => {
    this.setState({ role })
  }

  handleSortChange = sortType => {
    this.setState({ sortType }, () => {
      this.fetchNodes()
    })
  }

  handleSelectNode = node => {
    this.setState(
      ({ selectedNodes }) => {
        if (this.isNodeChecked(node)) {
          remove(selectedNodes, item => item === node)
        } else {
          selectedNodes.push(node)
        }
        return { selectedNodes }
      },
      () => {
        if (!isEmpty(this.state.selectedNodes)) {
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

  handleSelectComponent = component => {
    this.setState({ selectedComponent: component })
  }

  resourceValidator = (rule, value, callback) => {
    const { type } = this.state
    let data = {}

    if (type === 'node') {
      const { selectedNodes } = this.state
      const node_id = selectedNodes.join('|')

      if (isEmpty(selectedNodes)) {
        this.context.showFormError({ message: t('RESOURCE_NODE_FORM_TIP') })
        return callback({ message: '', field: 'resource_filter._nodes' })
      }

      data = {
        rs_filter_param: { node_id },
        _nodes: [...selectedNodes],
        _type: 'node',
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
        rs_filter_param: { selector },
        _selectors: selectors,
        _type: 'selector',
      }
    }

    this.context.updateResource('node', data)
    return callback()
  }

  renderNodes() {
    const { data, total, page, isLoading } = this.store.nodes
    const nodes = toJS(data)
    return (
      <div className={styles.box}>
        <ScrollLoad
          className={styles.nodes}
          data={nodes}
          total={total}
          page={page}
          loading={isLoading}
          onFetch={this.fetchNodes}
        >
          {nodes.map(node => (
            <NodeItem
              key={node.node}
              data={node}
              checked={this.isNodeChecked(node.node)}
              onClick={this.handleSelectNode}
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

  renderComponents() {
    const { data, total, page, isLoading } = this.store.components
    const components = toJS(data)

    return (
      <div className={styles.box}>
        <ScrollLoad
          className={styles.components}
          data={components}
          total={total}
          page={page}
          loading={isLoading}
          onFetch={this.fetchComponents}
        >
          {components.map(component => (
            <ServiceComponentItem
              key={component.name}
              data={component}
              checked={this.isComponentChecked(component.name)}
              onClick={this.handleSelectComponent}
            />
          ))}
        </ScrollLoad>
      </div>
    )
  }

  render() {
    const { type, sortType } = this.state

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
            <RadioButton value="node">{t('Cluster Nodes')}</RadioButton>
            <RadioButton value="selector">{t('Node Selector')}</RadioButton>
          </RadioGroup>
          {type === 'node' && (
            <div className={styles.actions}>
              <Select
                className={styles.select}
                value={sortType}
                options={this.sortTypeOptions}
                onChange={this.handleSortChange}
              />
            </div>
          )}
        </div>
        <div className={styles.content}>
          <Form.Item rules={[{ validator: this.resourceValidator }]}>
            {type === 'node' ? this.renderNodes() : this.renderSelector()}
          </Form.Item>
        </div>
      </div>
    )
  }
}
