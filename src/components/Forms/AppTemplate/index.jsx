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
import { get, isEmpty, find } from 'lodash'

import { generateId, getDisplayName } from 'utils'
import { PATTERN_NAME } from 'utils/constants'
import { compareVersion } from 'utils/app'
import WorkspaceStore from 'stores/workspace'
import AppVersionStore from 'stores/openpitrix/version'
import AppFileStore from 'stores/openpitrix/file'

import { Columns, Column, Input, TextArea, Loading } from '@pitrix/lego-ui'
import { Form, Button, Image, Notify, SearchSelect } from 'components/Base'
import TextPreview from 'components/TextPreview'
import ValuesYamlForm from 'components/Forms/ValuesYamlForm'

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
    footerClass: PropTypes.string,
    contentClass: PropTypes.string,
    noHeader: PropTypes.bool,
    fromProjectApp: PropTypes.bool,
    params: PropTypes.object,
  }
  static defaultProps = {
    params: {},
    noHeader: false,
    fromProjectApp: false,
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

  get sortedVersions() {
    return this.versions.sort((v1, v2) => compareVersion(v2.name, v1.name))
  }

  get latestVersion() {
    return get(this.sortedVersions, '[0].value', '')
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
    const { workspace, version } = this.props.params
    const { app, fromProjectApp } = this.props
    const conf = {
      name: `${app.name.slice(0, 7)}-${generateId()}`,
      version_id: version || '',
      runtime_id: '',
      desc: '',
    }
    if (!fromProjectApp) {
      return {
        ...conf,
        workspace: globals.app.workspaces.includes(workspace)
          ? workspace
          : globals.app.workspaces[0],
      }
    }

    return {
      ...conf,
      alias: `${app.name.slice(0, 7)}-alias`,
      // runtime_id: namespace,
      workspace,
    }
  }

  componentDidMount() {
    this.fetchAll()
  }

  async fetchAll() {
    await this.fetchVersions()
    if (!this.props.fromProjectApp) {
      this.fetchNamespaces({
        workspace: this.baseFormData.workspace,
      })
      this.fetchWorkspaces()
    }
    this.fetchFiles()
  }

  @action
  fetchVersions = async (params = {}) => {
    await this.versionStore.fetchList({
      ...params,
      app_id: this.props.app.app_id,
    })

    const { version } = this.props.params
    const isExisted = find(this.versions, { value: version })
    const { page, total, data } = this.versionStore.list
    if (!version) {
      const firstVersion = this.versionStore.list.data[0] || {}
      this.baseFormData.version_id = firstVersion.version_id
    } else if (!isExisted && total > data.length) {
      await this.fetchVersions({
        more: true,
        page: page + 1,
      })
    }
  }

  @action
  fetchWorkspaces = async (params = {}) => {
    await this.workspaceStore.fetchList(params)

    const { workspace } = this.props.params
    if (workspace) {
      const { page, total, data } = this.workspaceStore.list
      const isExisted = data.find(item => item.name === workspace)

      if (!isExisted && total > data.length) {
        await this.fetchWorkspaces({
          more: true,
          page: page + 1,
        })
      }
    }
  }

  @action
  fetchNamespaces = async (params = {}) => {
    await this.workspaceStore.fetchNamespaces({
      workspace: this.baseFormData.workspace,
      ...params,
    })

    const { namespace } = this.props.params
    const { data } = toJS(this.workspaceStore.namespaces)
    let selectNamespace
    if (namespace) {
      selectNamespace = data.find(item => item.name === namespace)
      const { page, total } = this.workspaceStore.namespaces

      if (!selectNamespace && total > data.length) {
        await this.fetchNamespaces({
          more: true,
          page: page + 1,
        })
      }
    }

    this.baseFormData = {
      ...this.baseFormData,
      runtime_id:
        get(selectNamespace, 'opRuntime', '') ||
        get(this.namespaces[0], 'value', ''),
    }
  }

  @action
  async fetchFiles() {
    await this.fileStore.fetch({
      version_id: this.baseFormData.version_id,
    })

    const packageFiles = this.fileStore.files
    const valuesYaml = packageFiles['values.yaml']
    this.valuesYaml = valuesYaml
    this.valuesSchema = packageFiles['values.schema.json']
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
    if (this.props.isSubmitting) {
      return
    }
    this.baseFormRef.validate(() => {
      const conf = this.getConf()

      const { version_id, runtime_id, workspace } = this.baseFormData

      const { data } = toJS(this.workspaceStore.namespaces)
      const namespace = data.find(item => item.opRuntime === runtime_id) || {}

      if (!namespace.name) {
        Notify.error({
          content: t('NO_DEPLOY_RUNTIME_NOTE'),
        })
        return
      }

      const params = {
        app_id: this.props.app.app_id,
        version_id,
        runtime_id,
        namespace: namespace.name,
        workspace,
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

    return (
      <div className={styles.header}>
        <span className={styles.logo}>
          <Image src={app.icon} iconLetter={app.name} iconSize={40} />
        </span>
        <div>
          <h3 className={styles.name}>{app.name}</h3>
          <p className={styles.description}>{app.description}</p>
        </div>
      </div>
    )
  }

  renderFooter() {
    const { footerClass, isSubmitting } = this.props
    return (
      <footer className={classnames('clearfix', styles.footer, footerClass)}>
        <div className="float-right">
          <Button onClick={this.props.onCancel}>{t('Cancel')}</Button>
          <Button
            type="control"
            onClick={this.submit}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {t('Deploy')}
          </Button>
        </div>
      </footer>
    )
  }

  renderBaseDeployForm() {
    return (
      <>
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
              rules={[{ required: true, message: t('Please select version') }]}
            >
              <SearchSelect
                name="version_id"
                placeholder={t('Please select version')}
                page={this.versionStore.list.page}
                total={this.versionStore.list.total}
                isLoading={this.versionStore.list.isLoading}
                options={this.sortedVersions}
                currentLength={this.versionStore.list.data.length}
                onFetch={this.fetchVersions}
                onChange={this.handleVersionChange}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item
              label={t('Workspace')}
              desc={t('WORKSPACE_DESC')}
              rules={[
                { required: true, message: t('Please select workspace') },
              ]}
            >
              <SearchSelect
                name="workspace"
                placeholder={t('Please select workspace')}
                page={this.workspaceStore.list.page}
                total={this.workspaceStore.list.total}
                isLoading={this.workspaceStore.list.isLoading}
                options={this.workspaces}
                currentLength={this.workspaceStore.list.data.length}
                onFetch={this.fetchWorkspaces}
                onChange={this.handleWorkspaceChange}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('Project')}
              desc={t('PROJECT_DESC')}
              rules={[{ required: true, message: t('Please select project') }]}
            >
              <SearchSelect
                name="runtime_id"
                placeholder={t('Please select project')}
                page={this.workspaceStore.namespaces.page}
                total={this.workspaceStore.namespaces.total}
                isLoading={this.workspaceStore.namespaces.isLoading}
                options={this.namespaces}
                currentLength={this.workspaceStore.namespaces.data.length}
                onFetch={this.fetchNamespaces}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item label={t('Description')}>
              <TextArea name="desc" />
            </Form.Item>
          </Column>
        </Columns>
      </>
    )
  }

  versionOptionRender = ({ label, value }) => (
    <span style={{ display: 'flex', alignItem: 'center' }}>
      {label}
      {value === this.latestVersion && (
        <span className={styles.latestVer}>{t('Latest Version')}</span>
      )}
    </span>
  )

  renderProjectAppDeployForm() {
    return (
      <>
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
              <Input name="name" maxLength={15} autoFocus={true} />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('Version')}
              rules={[{ required: true, message: t('Please select version') }]}
            >
              <SearchSelect
                name="version_id"
                placeholder={t('Please select version')}
                page={this.versionStore.list.page}
                total={this.versionStore.list.total}
                isLoading={this.versionStore.list.isLoading}
                options={this.sortedVersions}
                currentLength={this.versionStore.list.data.length}
                onFetch={this.fetchVersions}
                onChange={this.handleVersionChange}
                optionRenderer={this.versionOptionRender}
                valueRenderer={this.versionOptionRender}
                defaultValue={this.baseFormData.version_id}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item label={t('Description')}>
              <TextArea name="desc" />
            </Form.Item>
          </Column>
        </Columns>
      </>
    )
  }

  renderBaseForm() {
    const { fromProjectApp } = this.props
    return (
      <div>
        <div className="h5">{t('Basic Info')}</div>
        <Form
          data={this.baseFormData}
          ref={ref => {
            this.baseFormRef = ref
          }}
        >
          {!fromProjectApp && this.renderBaseDeployForm()}
          {fromProjectApp && this.renderProjectAppDeployForm()}
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
        {this.valuesSchema && (
          <ValuesYamlForm
            schema={JSON.parse(this.valuesSchema)}
            yaml={formatYaml(this.valuesYaml)}
          />
        )}
        <TextPreview
          files={{ 'values.yaml': this.valuesYaml }}
          type="values.yaml"
          editorOptions={{
            onChange: this.handleYamlChange,
          }}
          hideOverlayBtns
        />
      </div>
    )
  }

  render() {
    const { noHeader, contentClass, className } = this.props
    return (
      <div className={classnames(styles.wrapper, className)}>
        {!noHeader && this.renderHeader()}
        {this.renderPane(
          <div className={classnames(styles.content, contentClass)}>
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
