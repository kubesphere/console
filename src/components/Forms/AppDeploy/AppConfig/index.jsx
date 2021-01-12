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
import { set } from 'lodash'
import { reaction } from 'mobx'
import { observer } from 'mobx-react'
import { Loading, Alert } from '@kube-design/components'

import { CodeEditor, Switch } from 'components/Base'
import { safeParseJSON } from 'utils'
import { getValueObj, getValue } from 'utils/yaml'

import SchemaForm from './SchemaForm'

import styles from './index.scss'

@observer
export default class AppConfig extends React.Component {
  state = {
    valuesYaml: '',
    valuesJSON: {},
    valuesSchema: undefined,
    loadingFile: true,
    isCodeMode: false,
  }

  componentDidMount() {
    this.updateState()

    if (!this.props.fileStore.files.packageFiles) {
      this.dispather = reaction(
        () => this.props.fileStore.files,
        this.updateState
      )
    }
  }

  componentWillUnmount() {
    this.dispather && this.dispather()
  }

  validate(callback) {
    this.updateFormData()
    callback && callback()
  }

  updateState = () => {
    const packageFiles = this.props.fileStore.files

    if (packageFiles && packageFiles['values.yaml']) {
      this.setState({
        valuesYaml: packageFiles['values.yaml'],
        valuesJSON: getValueObj(packageFiles['values.yaml']),
        valuesSchema: safeParseJSON(packageFiles['values.schema.json']),
        loadingFile: false,
      })
    }
  }

  updateFormData = () => {
    const { formData } = this.props
    const { isCodeMode, valuesYaml, valuesJSON, valuesSchema } = this.state

    set(
      formData,
      'conf',
      getValue(
        isCodeMode || !valuesSchema ? getValueObj(valuesYaml) : valuesJSON
      )
    )
  }

  handleModeChange = () => {
    const { isCodeMode } = this.state
    this.setState({
      isCodeMode: !isCodeMode,
    })
  }

  handleValueChange = value => {
    this.setState({ valueJSON: value })
  }

  handleYamlChange = value => {
    this.setState({ valuesYaml: value })
  }

  renderYamlEdit() {
    const { valuesYaml } = this.state
    return (
      <div className={styles.codeWrapper}>
        <CodeEditor
          mode="yaml"
          value={valuesYaml}
          onChange={this.handleYamlChange}
        />
      </div>
    )
  }

  renderSchemaForm() {
    const { valuesJSON, valuesSchema } = this.state
    return (
      <div className={styles.schemaWrapper}>
        <SchemaForm
          schema={valuesSchema}
          value={valuesJSON}
          onChange={this.handleValueChange}
        />
      </div>
    )
  }

  render() {
    const { valuesSchema, loadingFile, isCodeMode } = this.state
    const showCodeEditor = isCodeMode || !valuesSchema

    if (loadingFile) {
      return <Loading className={styles.loading} />
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <div>{t('App Config')}</div>
          {valuesSchema && (
            <Switch
              className={styles.switch}
              text="YAML"
              onChange={this.handleModeChange}
              checked={isCodeMode}
            />
          )}
        </div>
        {valuesSchema && (
          <Alert
            className="margin-b12"
            type="warning"
            message={t('HELM_APP_SCHEMA_FORM_TIP')}
          />
        )}
        {showCodeEditor ? this.renderYamlEdit() : this.renderSchemaForm()}
      </div>
    )
  }
}
