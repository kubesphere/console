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
import {
  Form,
  Input,
  Radio,
  RadioGroup,
  Select,
  TextArea,
} from '@kube-design/components'
import { observer } from 'mobx-react'
import { Modal } from 'components/Base'
import { isString, get, isEmpty } from 'lodash'
import PipelineStore from 'stores/devops/pipelines'

import style from './index.scss'

@observer
export default class ParamsFormModal extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    branches: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.store = new PipelineStore()
    this.state = {
      parameters: null,
      currentBranch: this.branch,
    }
  }

  static defaultProps = {
    branches: [],
    visible: false,
    name: '',
    onOk() {},
    onCancel() {},
  }

  get branch() {
    const { branches, params } = this.props
    let currentBranch = params ? params.branch : ''
    if (!isEmpty(branches)) {
      currentBranch = get(this.branchOptions, '[0].value')
    }
    return currentBranch
  }

  get branchOptions() {
    const { branches, params } = this.props
    let _options = Array.isArray(branches)
      ? branches.map(branch => ({
          label: decodeURIComponent(branch),
          value: branch,
        }))
      : []

    if (params && params.branch) {
      _options = [
        { label: decodeURIComponent(params.branch), value: params.branch },
      ]
    }

    const options = _options.sort((a, b) => {
      if (
        isString(a.value) &&
        ['master', 'main'].includes(a.value.toLowerCase())
      ) {
        return -1
      }

      if (
        isString(b.value) &&
        ['master', 'main'].includes(b.value.toLowerCase())
      ) {
        return 1
      }

      if (a.value < b.value) {
        return -1
      }

      if (a.value > b.value) {
        return 1
      }

      return 0
    })

    return options
  }

  componentDidMount() {
    this.init()
  }

  init = async () => {
    const parameters = this.branch
      ? await this.getParametersFromBranch(this.branch)
      : this.props.parameters

    this.setState({
      currentBranch: this.branch,
      parameters,
    })
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props
    const { visible: prevVisible } = prevProps

    if (!prevVisible && visible) {
      this.init()
    }
  }

  handleOk = () => {
    const { branch, ...formParameters } = this.formRef.current.getData()
    const { parameters } = this.state

    this.formRef.current.validate(() => {
      const params = isEmpty(formParameters)
        ? !isEmpty(parameters) && Array.isArray(parameters)
          ? parameters.map(item => ({
              name: item.name,
              value: '',
            }))
          : null
        : Object.keys(formParameters).map(key => ({
            name: key,
            value: formParameters[key],
          }))
      this.props.onOk(params, branch)
    })
  }

  renderParamsItem(param) {
    const type = param.type.toLowerCase().split('parameterdefinition')[0]
    const defaultValue = get(param, 'defaultParameterValue.value')
    switch (type) {
      case 'string':
        return (
          <Form.Item
            key={param.name}
            label={param.name}
            desc={param.description}
          >
            <Input defaultValue={defaultValue} name={param.name} />
          </Form.Item>
        )
      case 'text':
        return (
          <Form.Item
            key={param.name}
            label={param.name}
            desc={param.description}
          >
            <TextArea defaultValue={defaultValue} name={param.name} />
          </Form.Item>
        )
      case 'boolean':
        return (
          <Form.Item
            key={param.name}
            label={param.name}
            desc={param.description}
          >
            <RadioGroup name={param.name} defaultValue={String(defaultValue)}>
              <Radio name={param.name} value={'true'}>
                True
              </Radio>
              <Radio name={param.name} value={'false'}>
                False
              </Radio>
            </RadioGroup>
          </Form.Item>
        )
      case 'choice': {
        const choicesOption = get(param, 'choices', [])
        const defaultChoicesValue = get(
          param,
          'defaultParameterValue.value',
          ''
        )
        return (
          <Form.Item
            key={param.name}
            label={param.name}
            desc={param.description}
          >
            {!isEmpty(choicesOption) ? (
              <Select
                name={param.name}
                options={choicesOption.map(choice => ({
                  label: choice,
                  value: choice,
                }))}
                defaultValue={defaultChoicesValue || choicesOption[0]}
              />
            ) : (
              <Input name={param.name} defaultValue={defaultChoicesValue} />
            )}
          </Form.Item>
        )
      }
      case 'password':
        return (
          <Form.Item
            key={param.name}
            label={param.name}
            desc={param.description}
          >
            <Input
              defaultValue={defaultValue}
              type="password"
              name={param.name}
            />
          </Form.Item>
        )
      default:
        return (
          <Form.Item
            key={param.name}
            label={param.name}
            desc={param.description}
          >
            <Input defaultValue={defaultValue} name={param.name} />
          </Form.Item>
        )
    }
  }

  handleBranchChange = async branch => {
    const parameters = await this.getParametersFromBranch(branch)
    this.setState({ currentBranch: branch, parameters })
  }

  getParametersFromBranch = async branch => {
    const { params } = this.props
    const result = await this.store.getBranchDetail({ branch, ...params })
    return get(result, 'parameters', null)
  }

  render() {
    const { visible, onCancel, branches } = this.props
    const { parameters, currentBranch } = this.state

    return (
      <Modal
        width={680}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        title={t('Params Input')}
      >
        <Form ref={this.formRef}>
          {!isEmpty(branches) ? (
            <Form.Item
              label={t('Branch')}
              rules={[{ required: true, message: t('This param is required') }]}
            >
              <Select
                name="branch"
                options={this.branchOptions}
                defaultValue={currentBranch}
                onChange={this.handleBranchChange}
              />
            </Form.Item>
          ) : null}
          {!isEmpty(parameters) ? (
            <div className={style.desc}>{t('PARAMS_DESC')}</div>
          ) : null}
          {Array.isArray(parameters) &&
            parameters.map(param => this.renderParamsItem(param))}
        </Form>
      </Modal>
    )
  }
}
