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
import { Input, TextArea, RadioGroup, Radio, Select } from '@pitrix/lego-ui'
import { observer } from 'mobx-react'
import { Modal, Form } from 'components/Base'
import { isArray, isString, get } from 'lodash'
import PipelineStore from 'stores/devops/pipelines'

import style from './paramsModal.scss'

@observer
export default class ParamsModal extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    branches: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.store = new PipelineStore()
    this.state = {
      branches: [],
    }
  }

  static defaultProps = {
    branches: [],
    visible: false,
    name: '',
    onOk() {},
    onCancel() {},
    onBranchSelect() {},
  }

  get branchOptions() {
    const { branches, params } = this.props
    let _branches = branches
    if (this.state.branches.length) {
      _branches = this.state.branches
    }
    let _options = Array.isArray(_branches)
      ? _branches.map(branch => ({
          label: branch,
          value: branch,
        }))
      : []
    if (params && params.branch) {
      _options = [{ label: params.branch, value: params.branch }]
    }

    const options = _options.sort((a, b) => {
      if (isString(a.value) && a.value.toLowerCase() === 'master') {
        return -1
      }
      if (isString(b.value) && b.value.toLowerCase() === 'master') {
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

  componentDidUpdate(prevProps) {
    const { visible, branches } = this.props
    const { visible: prevVisible } = prevProps
    if (!prevVisible && visible && branches.length) {
      this.start = 1
      if (branches.length > 90) {
        // length > 90 ,branch list need new api to get
        this.getBranches()
      }
      this.props.onBranchSelect(get(this.branchOptions, '[0].value', ''))
    }
  }

  getBranches = async () => {
    const { params, name } = this.props
    const result = await this.store.getBranchLists({
      name,
      ...params,
      page: this.start,
    })
    if (isArray(result) && result.length) {
      const _branches = result.map(item => item.name)
      this.setState({ branches: { ...this.state.branches, ..._branches } })

      if (result.length === 100) {
        this.start = this.start + 1
        this.getBranches()
      }
      this.getBranchParameters()
    }
  }

  handleOk = () => {
    const { branch, ...parameters } = this.formRef.current.getData()
    this.formRef.current.validate(() => {
      const params = Object.keys(parameters).map(key => ({
        name: key,
        value: parameters[key],
      }))
      this.props.onOk(params, branch)
    })
  }

  getBranchParameters = () => {
    const { branch } = this.formRef.current.getData()

    this.props.onBranchSelect(branch)
  }

  renderParamsItem(param) {
    const type = param.type.toLowerCase().split('parameterdefinition')[0]
    switch (type) {
      case 'string':
        return (
          <Form.Item
            key={param.name}
            label={param.name}
            desc={param.description}
          >
            <Input
              defaultValue={param.defaultParameterValue.value}
              name={param.name}
            />
          </Form.Item>
        )
      case 'text':
        return (
          <Form.Item
            key={param.name}
            label={param.name}
            desc={param.description}
          >
            <TextArea
              defaultValue={param.defaultParameterValue.value}
              name={param.name}
            />
          </Form.Item>
        )
      case 'boolean':
        return (
          <Form.Item
            key={param.name}
            label={param.name}
            desc={param.description}
          >
            <RadioGroup
              name={param.name}
              defaultValue={String(param.defaultParameterValue.value)}
            >
              <Radio name={param.name} value={'true'}>
                True
              </Radio>
              <Radio name={param.name} value={'false'}>
                False
              </Radio>
            </RadioGroup>
          </Form.Item>
        )
      case 'choice':
        return (
          <Form.Item
            key={param.name}
            label={param.name}
            desc={param.description}
          >
            <Select
              name={param.name}
              options={param.choices.map(choice => ({
                label: choice,
                value: choice,
              }))}
              defaultValue={param.choices[0]}
            />
          </Form.Item>
        )
      case 'password':
        return (
          <Form.Item
            key={param.name}
            label={param.name}
            desc={param.description}
          >
            <Input
              defaultValue={param.defaultParameterValue.value}
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
            <Input
              defaultValue={param.defaultParameterValue.value}
              name={param.name}
            />
          </Form.Item>
        )
    }
  }

  render() {
    const { visible, onCancel, branches, parameters } = this.props

    return (
      <Modal
        width={680}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        title={t('Params input')}
      >
        <Form ref={this.formRef}>
          {branches && branches.length ? (
            <Form.Item
              label={t('Branch')}
              rules={[{ required: true, message: t('This param is required') }]}
            >
              <Select
                name="branch"
                options={this.branchOptions}
                defaultValue={
                  this.branchOptions[0] && this.branchOptions[0].value
                }
                onChange={this.props.onBranchSelect}
              />
            </Form.Item>
          ) : null}
          {parameters && parameters.length ? (
            <div className={style.desc}>{t('PARAMS_DESC')}</div>
          ) : null}
          {parameters && parameters.map(param => this.renderParamsItem(param))}
        </Form>
      </Modal>
    )
  }
}
