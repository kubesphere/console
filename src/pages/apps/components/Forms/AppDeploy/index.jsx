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
import { extendObservable, action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import classnames from 'classnames'
import yaml from 'js-yaml/dist/js-yaml'
import { get, isEmpty } from 'lodash'

import { generateId, safeParseJSON, getDisplayName } from 'utils'
import { PATTERN_NAME } from 'utils/constants'
import WorkspaceStore from 'stores/workspace'
import AppVersionStore from 'stores/openpitrix/version'
import AppFileStore from 'stores/openpitrix/file'

import {
  Columns,
  Column,
  Input,
  Select,
  TextArea,
  Loading,
} from '@pitrix/lego-ui'
import { Form, Button, CodeEditor } from 'components/Base'

import styles from './index.scss'

const formatYaml = (yamlString = '{}') => {
  let valuesData
  try {
    valuesData = yaml.safeLoad(yamlString)
  } catch (e) {
    valuesData = {}
  }

  return valuesData
}

@observer
export default class AppTemplateForm extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    app: PropTypes.object,
    versionId: PropTypes.string,
  }

  static defaultProps = {
    params: {},
    app: {},
    versionId: '',
  }

  constructor(props) {
    super(props)

    this.workspaceStore = new WorkspaceStore()
    this.versionStore = new AppVersionStore()
    this.fileStore = new AppFileStore()

    extendObservable(this, {
      baseFormData: this.initBaseFormData(),
      mode: 'yaml',
      fetchValuesYaml: true,
    })
  }

  get versions() {
    const { data } = toJS(this.versionStore.list)

    return data.map(version => ({
      label: version.name,
      value: version.version_id,
    }))
  }

  get workspaces() {
    const { data } = toJS(this.workspaceStore.list)

    return data
      .filter(item => item.name !== globals.config.systemWorkspace)
      .map(({ name }) => ({ label: name, value: name }))
  }

  get namespaces() {
    const { data } = toJS(this.workspaceStore.namespaces)

    return data
      .filter(namespace => !isEmpty(namespace.opRuntime))
      .map(namespace => ({
        label: getDisplayName(namespace),
        value: namespace.opRuntime,
      }))
  }

  initBaseFormData() {
    const { workspace } = this.props.params
    const { app } = this.props
    return {
      name: `${app.name.slice(0, 7)}-${generateId()}`,
      version_id: this.props.versionId || '',
      runtime_id: '',
      workspace: globals.app.workspaces.includes(workspace)
        ? workspace
        : globals.app.workspaces[0],
      desc: '',
    }
  }

  componentDidMount() {
    this.fetchAll()
  }

  async fetchAll() {
    await Promise.all([
      this.fetchVersions(),
      this.fetchNamespaces({
        workspace: this.baseFormData.workspace,
      }),
      this.workspaceStore.fetchList(),
    ])
    await this.fetchFiles()
  }

  @action
  async fetchVersions() {
    await this.versionStore.fetchList({
      app_id: this.props.app.app_id,
      noLimit: true,
    })

    if (!this.props.params.version) {
      const firstVersion = this.versionStore.list.data[0] || {}
      this.baseFormData.version_id =
        get(this.props, 'versionId') || firstVersion.version_id
    }
  }

  @action
  async fetchNamespaces(params = {}) {
    await this.workspaceStore.fetchNamespaces(params)

    const { namespace } = this.props.params
    const { data } = toJS(this.workspaceStore.namespaces)
    let selectNamespace
    if (namespace) {
      selectNamespace = data.find(item => item.name === namespace)
    }

    this.baseFormData = {
      ...this.baseFormData,
      runtime_id: get(selectNamespace || this.namespaces[0], 'value', ''),
    }
  }

  @action
  async fetchFiles() {
    await this.fileStore.fetch({
      app_id: this.props.app.app_id,
      version_id: this.baseFormData.version_id,
    })

    const packageFiles = this.fileStore.files
    const valuesYaml = packageFiles['values.yaml']

    this.valuesYaml = valuesYaml
    this.fetchValuesYaml = false
  }

  @action
  handleWorkspaceChange = workspace => {
    this.baseFormData.workspace = workspace
    this.fetchNamespaces({ workspace })
  }

  @action
  handleVersionChange = version => {
    this.baseFormData.version_id = version
    this.fetchFiles()
  }

  handleWorkspaceScrollToBottom = () => {
    if (
      !this.scrolling &&
      this.workspaceStore.list.total !== this.workspaceStore.list.data.length
    ) {
      this.scrolling = true
      this.workspaceStore
        .fetchList({
          page: this.workspaceStore.list.page + 1,
          more: true,
        })
        .then(() => {
          this.scrolling = false
        })
    }
  }

  handleProjectScrollToBottom = () => {
    if (
      !this.scrolling &&
      this.workspaceStore.namespaces.total !==
        this.workspaceStore.namespaces.data.length
    ) {
      this.scrolling = true
      this.workspaceStore
        .fetchNamespaces({
          workspace: this.baseFormData.workspace,
          more: true,
          page: this.workspaceStore.namespaces.page + 1,
        })
        .then(() => {
          this.scrolling = false
        })
    }
  }

  getConf() {
    const { desc, name } = this.baseFormData
    const values = formatYaml(this.valuesYaml)

    return yaml.safeDump(
      Object.assign({}, values, {
        Name: name,
        Description: desc,
      })
    )
  }

  submit = () => {
    this.baseFormRef.validate(() => {
      const conf = this.getConf()

      const { version_id, runtime_id, workspace } = this.baseFormData

      const { data } = toJS(this.workspaceStore.namespaces)
      const namespace = data.find(item => item.opRuntime === runtime_id) || {}

      const params = {
        app_id: this.props.app.app_id,
        version_id,
        runtime_id,
        namespace: namespace.name,
        workspace: get(this.props, 'params.workspace', workspace),
        conf,
      }
      this.props.onOk(params)
    })
  }

  handleModeChange = value => {
    this.mode = value
  }

  handleYamlChange = value => {
    this.valuesYaml = value
  }

  renderPane(children, className) {
    return (
      <div className={classnames(styles.pane, className)}>
        <div className={styles.pane_content}>{children}</div>
      </div>
    )
  }

  renderHeader() {
    const { app } = this.props
    const sources = safeParseJSON(app.sources, ['None'])

    return this.renderPane(
      <div>
        <img
          className={classnames('float-left', styles.logo)}
          src={app.icon || '/assets/default-app.svg'}
        />
        <h3 className={styles.app_name}>{app.name}</h3>
        <p className={styles.source}>
          {t('Source')}: {sources[0] || '-'}
        </p>
      </div>,
      styles.header
    )
  }

  renderFooter() {
    return (
      <footer className={classnames('clearfix', styles.footer)}>
        <div className="float-right">
          <Button onClick={this.props.onCancel}>{t('Cancel')}</Button>
          <Button
            type="control"
            onClick={this.submit}
            loading={this.props.isSubmitting}
          >
            {t('Deploy')}
          </Button>
        </div>
      </footer>
    )
  }

  renderBaseForm() {
    const hideWorkspace = Boolean(get(this.props, 'params.workspace'))

    return (
      <div>
        <div className="h5">{t('Basic Info')}</div>
        <Form
          data={this.baseFormData}
          ref={ref => {
            this.baseFormRef = ref
          }}
        >
          <Columns>
            <Column>
              <Form.Item
                label={t('Name')}
                desc={t('CLUSTER_NAME_DESC')}
                rules={[
                  { required: true, message: t('Please input name') },
                  {
                    pattern: PATTERN_NAME,
                    message: `${t('Invalid name')}, ${t('CLUSTER_NAME_DESC')}`,
                  },
                ]}
              >
                <Input name="name" maxLength={14} autoFocus={true} />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item
                label={t('Version')}
                rules={[
                  { required: true, message: t('Please select version') },
                ]}
              >
                <Select
                  name="version_id"
                  placeholder={t('Please select version')}
                  options={this.versions}
                  onChange={this.handleVersionChange}
                />
              </Form.Item>
            </Column>
          </Columns>
          <Columns>
            {!hideWorkspace && (
              <Column>
                <Form.Item
                  label={t('Workspace')}
                  desc={t('WORKSPACE_DESC')}
                  rules={[
                    { required: true, message: t('Please select workspace') },
                  ]}
                >
                  <Select
                    name="workspace"
                    placeholder={t('Please select workspace')}
                    options={this.workspaces}
                    onChange={this.handleWorkspaceChange}
                    onBlurResetsInput={false}
                    onCloseResetsInput={false}
                    openOnClick={true}
                    isLoadingAtBottom
                    isLoading={this.workspaceStore.list.isLoading}
                    bottomTextVisible={
                      this.workspaceStore.list.total ===
                      this.workspaceStore.list.data.length
                    }
                    onMenuScrollToBottom={this.handleWorkspaceScrollToBottom}
                  />
                </Form.Item>
              </Column>
            )}
            <Column>
              <Form.Item
                label={t('Project')}
                desc={t('PROJECT_DESC')}
                rules={[
                  { required: true, message: t('Please select project') },
                ]}
              >
                <Select
                  name="runtime_id"
                  placeholder={t('Please select project')}
                  options={this.namespaces}
                  onBlurResetsInput={false}
                  onCloseResetsInput={false}
                  openOnClick={true}
                  isLoadingAtBottom
                  isLoading={this.workspaceStore.namespaces.isLoading}
                  bottomTextVisible={
                    this.workspaceStore.namespaces.total ===
                    this.workspaceStore.namespaces.data.length
                  }
                  onMenuScrollToBottom={this.handleProjectScrollToBottom}
                />
              </Form.Item>
            </Column>
            {hideWorkspace && (
              <Column>
                <Form.Item label={t('Description')}>
                  <TextArea name="desc" />
                </Form.Item>
              </Column>
            )}
          </Columns>
          {!hideWorkspace && (
            <Columns>
              <Column>
                <Form.Item label={t('Description')}>
                  <TextArea name="desc" />
                </Form.Item>
              </Column>
            </Columns>
          )}
        </Form>
      </div>
    )
  }

  renderParamsForm() {
    if (this.fetchValuesYaml) {
      return (
        <div className="text-center padding-20">
          <Loading />
        </div>
      )
    }

    return (
      <div className={styles.params}>
        <div className="h5">{t('Params Configuration')}</div>
        <CodeEditor value={this.valuesYaml} onChange={this.handleYamlChange} />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderPane(
          <div className={styles.content}>
            {this.renderBaseForm()}
            {this.renderParamsForm()}
          </div>,
          styles.form_content
        )}
        {this.renderFooter()}
      </div>
    )
  }
}
