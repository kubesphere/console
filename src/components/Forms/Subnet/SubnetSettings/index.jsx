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

import { get, set, isUndefined, indexOf, unset, intersection } from 'lodash'
import React from 'react'

import { observer } from 'mobx-react'
import { TypeSelect, CheckableText } from 'components/Base'
import { ArrayInput, ProjectSelect } from 'components/Inputs'

import { MODULE_KIND_MAP } from 'utils/constants'
import { Columns, Column, Input, Select, Form } from '@kube-design/components'
import NodeStore from 'stores/node'

import styles from './index.scss'

@observer
export default class SubnetSettings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gatewayType: 'distributed',
      centralGatewayNode: [],
    }

    this.nodeStore = new NodeStore()
  }

  componentWillMount() {
    if (isUndefined(get(this.formTemplate, 'spec.natOutgoing'))) {
      set(this.formTemplate, 'spec.natOutgoing', true)
    }
  }

  componentDidMount() {
    this.nodeStore.fetchList({
      cluster: this.props.cluster,
    })

    if (get(this.formTemplate, 'spec.gatewayNode', '') !== '') {
      this.setState({
        centralGatewayNode: get(
          this.formTemplate,
          'spec.gatewayNode',
          ''
        ).split(','),
      })
    }

    if (get(this.formTemplate, 'spec.gatewayType', '') !== '') {
      this.setState({ gatewayType: get(this.formTemplate, 'spec.gatewayType') })
    }
  }

  get formTemplate() {
    const { formTemplate, module } = this.props

    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get cidr() {
    return get(this.formTemplate, 'spec.cidrBlock')
  }

  get types() {
    return [
      {
        icon: 'cluster',
        label: t('SUBNET_DISTRIBUTED_TITLE'),
        description: t('SUBNET_DISTRIBUTED_DESC'),
        value: 'distributed',
      },
      {
        icon: 'blockchain',
        label: t('SUBNET_CENTRALIZED_TITLE'),
        description: t('SUBNET_CENTRALIZED_DESC'),
        value: 'centralized',
      },
    ]
  }

  handleGatewayTypeChange = type => {
    this.setState({ gatewayType: type }, () => {
      set(this.formTemplate, 'spec.gatewayType', type)
    })
    if (type === 'distributed') {
      unset(this.formTemplate, 'spec.gatewayNode')
    }
  }

  handerGatewayNode = nodes => {
    const gatewayNodes = []
    nodes.forEach((item, index) => {
      if (
        !isUndefined(item) &&
        item !== '' &&
        indexOf(gatewayNodes, item) === -1
      ) {
        gatewayNodes[index] = item
      }
    })

    this.setState({ centralGatewayNode: gatewayNodes }, () => {
      set(
        this.formTemplate,
        'spec.gatewayNode',
        Array.from(new Set(gatewayNodes)).toString()
      )
    })
  }

  handlerCIDRChange = cidrBlock => {
    set(this.formTemplate, 'spec.protocol', 'IPv4')
    if (cidrBlock.indexOf(':') >= 0) {
      set(this.formTemplate, 'spec.protocol', 'IPv6')
    }
  }

  cidrBlockValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    // ipv4 && ipv6 reg
    const reg = /((^(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\/([1-9]|[1-2]\d|3[0-2])$)|(^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$))/gi
    if (!reg.test(value)) {
      return callback({
        message: t('SUBNET_CIDRBLOCK_INVALID'),
        field: rule.field,
      })
    }

    this.props.store.list.data.forEach(subnet => {
      if (
        subnet.name !== this.formTemplate.metadata.name &&
        subnet.cidr === value
      ) {
        return callback({
          message: t('CREATE_EXISTS_CIDR'),
          field: rule.field,
        })
      }
    })

    return callback()
  }

  namespaceValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (value.length > 0) {
      const namespaces = []
      value.forEach(item => {
        if (namespaces.includes(item)) {
          return callback({
            message: t('CREATE_EXISTS_NAMESPACE'),
            field: rule.field,
          })
        }

        namespaces.push(item)
      })
    }

    if (!isUndefined(this.props.store.list)) {
      this.props.store.list.data.forEach(subnet => {
        if (
          subnet.name !== this.formTemplate.metadata.name &&
          intersection(subnet.namespaces, value).length > 0
        ) {
          return callback({
            message: t('CREATE_CONTAIN_NAMESPACE', {
              namespace: intersection(subnet.namespaces, value)[0],
              name: subnet.name,
            }),
            field: rule.field,
          })
        }
      })
    }

    return callback()
  }

  centralGatewayValidator = (rule, value, callback) => {
    if (this.state.centralGatewayNode.length === 0) {
      return callback({ message: t('Please Select Node'), field: rule.field })
    }

    return callback()
  }

  renderGatewayTypeSelect() {
    return (
      <Form.Item label={t('SUBNET_GATEWAY_TYPE')}>
        <TypeSelect
          className="margin-b12"
          value={this.state.gatewayType}
          onChange={this.handleGatewayTypeChange}
          options={this.types}
        />
      </Form.Item>
    )
  }

  renderCentralGatewayItem() {
    const { data, total } = this.nodeStore.list
    const nodes = []

    for (let i = 0; i < total; i++) {
      const item = data[i]
      if (!isUndefined(item.name)) {
        nodes[i] = {
          label: item.name,
          value: item.name,
        }
      }
    }

    if (this.state.centralGatewayNode.length > 0) {
      return (
        <Form.Item
          className={styles.namespaces}
          label={t('SUBNET_NODES')}
          rules={[
            { validator: this.centralGatewayValidator, checkOnSubmit: true },
          ]}
        >
          <ArrayInput
            itemType="object"
            addText={t('Add Nodes')}
            value={this.state.centralGatewayNode}
            onChange={this.handerGatewayNode}
          >
            <Select options={nodes} />
          </ArrayInput>
        </Form.Item>
      )
    }

    return (
      <Form.Item
        className={styles.namespaces}
        label={t('SUBNET_NODES')}
        rules={[
          { validator: this.centralGatewayValidator, checkOnSubmit: true },
        ]}
      >
        <ArrayInput addText={t('Add Nodes')} onChange={this.handerGatewayNode}>
          <Select options={nodes} />
        </ArrayInput>
      </Form.Item>
    )
  }

  renderNamespaceItem() {
    const { cluster } = this.props
    return (
      <Form.Item
        className={styles.namespaces}
        label={t('SUBNET_NAMESPACE')}
        rules={[
          { required: true, message: t('Please Select Namespace') },
          { validator: this.namespaceValidator },
        ]}
      >
        <ArrayInput
          name="spec.namespaces"
          itemType="string"
          addText={t('Add Namespace')}
        >
          <ProjectSelect name="spec.namespaces" cluster={cluster} limit={-1} />
        </ArrayInput>
      </Form.Item>
    )
  }

  renderNamespaces() {
    if (this.state.gatewayType === 'centralized') {
      return this.renderNamespaceColumns()
    }

    return this.renderNamespaceItem()
  }

  renderNamespaceColumns() {
    return (
      <Columns>
        <Column>{this.renderNamespaceItem()}</Column>
        <Column>{this.renderCentralGatewayItem()}</Column>
      </Columns>
    )
  }

  renderNatOutGoing() {
    return (
      <Form.Group>
        <Form.Item>
          <CheckableText
            name="spec.natOutgoing"
            title={t('SUBNET_NATOUTGOING_TITLE')}
            description={t('SUBNET_NATOUTGOING_DESC')}
          />
        </Form.Item>
      </Form.Group>
    )
  }

  renderCIDR() {
    let disabled = false
    if (!isUndefined(this.props.editdisabled) && this.props.editdisabled) {
      disabled = true
    }

    return (
      <Form.Item
        label={t('SUBNET_CIDRBLOCK')}
        rules={[
          { required: true, message: t('Please Input CIDRBlock') },
          { validator: this.cidrBlockValidator },
        ]}
      >
        <Input
          name="spec.cidrBlock"
          placeholder={t('SUBNET_CIDRBLOCK_PLACEHOLDER')}
          autoFocus={true}
          disabled={disabled}
          onChange={this.handlerCIDRChange}
        />
      </Form.Item>
    )
  }

  render() {
    const { formRef } = this.props

    return (
      <div className={styles.wrapper}>
        <Form data={this.formTemplate} ref={formRef}>
          {this.renderGatewayTypeSelect()}
          {this.renderCIDR()}
          {this.renderNamespaces()}
          {this.renderNatOutGoing()}
        </Form>
      </div>
    )
  }
}
