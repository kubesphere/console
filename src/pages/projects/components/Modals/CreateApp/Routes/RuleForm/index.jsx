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

import { get, isEmpty } from 'lodash'
import React from 'react'

import PropTypes from 'prop-types'
import { Form, Input, Select } from '@kube-design/components'

import { Modal } from 'components/Base'
import { ArrayInput, RulePath } from 'components/Inputs'

import { PATTERN_HOST } from 'utils/constants'

import ClusterSelect from 'components/Forms/Route/RouteRules/RuleForm/ClusterSelect'

export default class RuleForm extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    secrets: PropTypes.array,
    services: PropTypes.array,
    gateway: PropTypes.object,
  }

  static defaultProps = {
    data: {},
    secrets: [],
    services: [],
    gateway: {},
  }

  constructor(props) {
    super(props)

    this.state = {
      type: 'specify',
      service: '',
      protocol: get(props, 'data.protocol', 'http'),
    }

    this.formRef = React.createRef()
  }

  get protocols() {
    return [
      { label: 'HTTP', value: 'http' },
      { label: 'HTTPS', value: 'https' },
    ]
  }

  get secrets() {
    return this.props.secrets.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  get clusters() {
    return get(this.props, 'projectDetail.clusters', []).slice()
  }

  get defaultClusters() {
    return get(this.props, 'projectDetail.clusters', []).map(item => item.name)
  }

  getType(data) {
    const host = get(data, 'host')

    if (!host) {
      return 'auto'
    }

    const { gateway } = this.props
    const service = get(data, 'http.paths[0].backend.service.name')
    const ip = gateway.defaultIngress
    const namespace = gateway.namespace

    return host === `${service}.${namespace}.${ip}.nip.io` ? 'auto' : 'specify'
  }

  checkItemValid = item =>
    item.path &&
    item.backend &&
    item.backend.service.name &&
    item.backend.service.port

  pathValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (value.some(item => !this.checkItemValid(item))) {
      return callback({ message: t('INVALID_PATH_DESC'), field: rule.field })
    }

    const isExist = this.handlePathExistValidator(value)

    if (isExist) {
      return callback({ message: t('PATH_EXIST'), field: rule.field })
    }

    callback()
  }

  handlePathExistValidator = value => {
    const pathList = value.map(item => item.path)
    let isExist = false

    pathList.forEach(item => {
      const length = pathList.length
      let i = 0
      let count = 0

      while (i <= length) {
        if (item === pathList[i]) {
          count++
        }

        if (count > 1) {
          isExist = true
          break
        }

        i++
      }
    })
    return isExist
  }

  handleProtocolChange = value => {
    this.setState({ protocol: value })
  }

  handleModeChange = value => {
    this.setState({ type: value })
  }

  handleSubmit = data => {
    const { onOk } = this.props
    if (this.state.type === 'auto') {
      const { gateway, projectDetail, namespace: ns } = this.props
      const service = get(data, 'http.paths[0].backend.service.name')

      const namespace =
        get(
          projectDetail,
          '_originData.metadata.labels["kubesphere.io/namespace"]'
        ) || ns
      onOk({
        ...data,
        protocol: 'http',
        host: gateway.isHostName
          ? gateway.defaultIngress
          : `${service}.${namespace}.${gateway.defaultIngress}.nip.io`,
      })
    } else {
      onOk(data)
    }
  }

  renderForm() {
    const { type, protocol } = this.state
    const { services } = this.props

    return (
      <>
        {type === 'specify' && (
          <>
            <Form.Item
              label={t('DOMAIN_NAME_TCAP')}
              rules={[
                { required: true, message: t('DOMAIN_NAME_EMPTY_DESC') },
                {
                  pattern: PATTERN_HOST,
                  message: t('INVALID_DOMAIN_DESC'),
                },
              ]}
            >
              <Input name="host" autoFocus={true} />
            </Form.Item>
            <Form.Item label={t('PROTOCOL')}>
              <Select
                name="protocol"
                defaultValue="http"
                onChange={this.handleProtocolChange}
                options={this.protocols}
              />
            </Form.Item>
            {protocol === 'https' && (
              <Form.Item label={t('SECRET')}>
                <Select
                  name="secretName"
                  options={this.secrets}
                  placeholder=" "
                />
              </Form.Item>
            )}
          </>
        )}
        <Form.Item
          label={t('PATH_PL')}
          rules={[
            { required: true, message: t('PATH_EMPTY_DESC') },
            { validator: this.pathValidator, checkOnSubmit: true },
          ]}
        >
          <ArrayInput
            name="http.paths"
            itemType="object"
            addText={t('ADD')}
            checkItemValid={this.checkItemValid}
          >
            <RulePath services={services} />
          </ArrayInput>
        </Form.Item>
      </>
    )
  }

  render() {
    const { data, isFederated } = this.props

    return (
      <Modal.Form
        title={isEmpty(data) ? t('ADD_ROUTING_RULE') : t('EDIT_ROUTING_RULES')}
        width={920}
        {...this.props}
        onOk={this.handleSubmit}
      >
        {isFederated && (
          <Form.Group label={t('CLUSTER')}>
            <Form.Item>
              <ClusterSelect
                name="clusters"
                options={this.clusters}
                defaultValue={this.defaultClusters}
              />
            </Form.Item>
          </Form.Group>
        )}
        <Form.Group>{this.renderForm()}</Form.Group>
      </Modal.Form>
    )
  }
}
