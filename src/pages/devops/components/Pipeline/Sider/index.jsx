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

import { Button, Form, Input, Select } from '@kube-design/components'
import { get, set } from 'lodash'
import { action, computed, observable, toJS } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import { compareVersion } from 'utils'

import YamlEditor from '../StepModals/kubernetesYaml'
import StepsEditor from '../StepsEditor'
import styles from './index.scss'

const AgentType = [
  { label: 'Any', value: 'any' },
  { label: 'node', value: 'node' },
  { label: 'kubernetes', value: 'kubernetes' },
]

@observer
export default class Sider extends React.Component {
  @observable
  stageName

  @observable
  formData = {}

  @observable
  showYaml = false

  @observable
  loading = false

  componentDidMount() {
    const args = toJS(
      get(this.props.store.jsonData, 'json.pipeline.agent.arguments', [])
    )

    this.formData = args.reduce((data, arg) => {
      if (Array.isArray(arg.value)) {
        const result = arg.value.reduce((_data, _arg) => {
          const _argObj = {}
          _argObj[_arg.key] = _arg.value.value
          _data.push(_argObj)
          return _data
        }, [])
        data[arg.key] = result
      } else {
        data[arg.key] = arg.value.value
      }
      return data
    }, {})
  }

  @action
  handleSetYaml = value => {
    this.formData.yaml = value
    this.showYaml = false
  }

  @action
  hideYamlEditor = () => {
    this.showYaml = false
  }

  @action
  showEditor = () => {
    this.showYaml = true
  }

  @computed
  get agentType() {
    return get(this.props.store.jsonData, 'json.pipeline.agent.type', '')
  }

  get ksVersion() {
    const { cluster } = this.props
    return globals.app.isMultiCluster
      ? get(globals, `clusterConfig.${cluster}.ksVersion`)
      : get(globals, 'ksConfig.ksVersion')
  }

  get isOld() {
    return compareVersion(this.ksVersion, '3.4.0') < 0
  }

  @computed
  get labelDataList() {
    return get(this.props.store, 'labelDataList', [])
  }

  handleDelete = () => {
    this.props.store.deleteStage()
  }

  handleCancel = () => {
    this.props.onCancel()
  }

  @action
  handleAgentTypeChange = type => {
    this.formData = {}
    set(this.props.store.jsonData, 'json.pipeline.agent.type', type)
  }

  handleConfirm = async () => {
    this.getAgentArguments()
    this.loading = true
    const jenkinsFile = await this.props.store.saveJenkinsFile(
      this.props.store.params
    )
    jenkinsFile && this.props.onOk(jenkinsFile)
  }

  handleConfirmOld = async () => {
    this.getAgentArguments()
    this.loading = true
    const result = await this.props.store
      .convertJsonToJenkinsFile(this.props.store.params)
      .finally(() => {
        this.loading = false
      })
    if (result && get(result, 'data.result') === 'success') {
      this.props.onOk(get(result, 'data.jenkinsfile', ''))
    }
  }

  getAgentArguments() {
    const _arguments = Object.keys(this.formData).map(key => {
      const value = toJS(this.formData[key])

      if (Array.isArray(value)) {
        const _value = value.map(item => {
          const a = Object.keys(item).map(_key => ({
            key: _key,
            value: { isLiteral: true, value: item[_key] },
          }))
          return a[0]
        })

        return {
          key,
          value: _value,
        }
      }
      return {
        key,
        value: { isLiteral: true, value },
      }
    })

    set(this.props.store.jsonData, 'json.pipeline.agent.arguments', _arguments)
  }

  renderAgentForms = () => {
    const labelDataList = toJS(this.labelDataList)
    const labelDefaultValue = get(labelDataList, '0.value', '')

    switch (this.agentType) {
      case 'node':
        return (
          <Form data={this.formData} ref={this.formRef}>
            <Form.Item
              label={t('label')}
              desc={t(
                'The label on which to run the Pipeline or individual stage'
              )}
            >
              <Select
                name="label"
                options={labelDataList}
                defaultValue={labelDefaultValue}
              />
            </Form.Item>
          </Form>
        )
      case 'kubernetes':
        return (
          <Form data={this.formData} ref={this.formRef}>
            <Form.Item label={t('label')} desc={t('')}>
              <Input name="label" />
            </Form.Item>
            <Form.Item
              label={t('yaml')}
              desc={
                <span className={styles.clickable} onClick={this.showEditor}>
                  {t('show yaml editor')}
                </span>
              }
            >
              <Input name="yaml" />
            </Form.Item>
            <Form.Item label={t('defaultContainer')} desc={t('')}>
              <Input name="defaultContainer" />
            </Form.Item>
          </Form>
        )
      default:
        return null
    }
  }

  render() {
    const { activeStage, jsonData } = this.props.store
    const { pipeline = {} } = jsonData.json
    const { isSubmitting } = this.props

    return (
      <div className={styles.sider}>
        <div className={styles.sheet}>
          <div className={styles.title}>{t('AGENT')}</div>
          <Form.Item desc={t('AGENT_TYPE_DESC')} label={t('TYPE')}>
            <Select
              options={AgentType}
              value={pipeline.agent.type}
              onChange={this.handleAgentTypeChange}
            />
          </Form.Item>
          {this.renderAgentForms()}
          <div className={styles.footer}>
            <Button onClick={this.handleCancel}>{t('CANCEL')}</Button>
            <Button
              disabled={!pipeline || !pipeline.stages.length}
              loading={isSubmitting || this.loading}
              type="control"
              onClick={!this.isOld ? this.handleConfirm : this.handleConfirmOld}
            >
              {t('OK')}
            </Button>
          </div>
        </div>
        {activeStage ? (
          <div className={styles.content}>
            <StepsEditor activeStage={activeStage} store={this.props.store} />
          </div>
        ) : null}
        <YamlEditor
          value={this.formData.yaml || ''}
          visible={this.showYaml}
          onCancel={this.hideYamlEditor}
          onOk={this.handleSetYaml}
        />
      </div>
    )
  }
}
