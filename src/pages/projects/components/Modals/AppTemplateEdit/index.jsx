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
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { get, set, pick } from 'lodash'

import {
  Input,
  Select,
  Tag,
  Columns,
  Column,
  Loading,
} from '@kube-design/components'

import { CodeEditor, Modal } from 'components/Base'

import VersionStore from 'stores/openpitrix/version'
import AppFileStore from 'stores/openpitrix/file'

import { compareVersion } from 'utils/app'

import styles from './index.scss'

@observer
export default class AppDeploy extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    detail: PropTypes.object,
    store: PropTypes.object,
    cluster: PropTypes.string,
    workspace: PropTypes.string,
    namespace: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    detail: {},
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      currentStep: 0,
      formData: {
        ...pick(props.detail, [
          'app_id',
          'cluster_id',
          'description',
          'name',
          'owner',
          'version_id',
        ]),
        namespace: props.namespace,
        cluster: props.cluster,
        workspace: props.workspace,
      },
      valuesYaml: '',
      conf: get(props.detail, 'env', ''),
      loadingFile: false,
    }

    this.versionStore = new VersionStore()
    this.fileStore = new AppFileStore()
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.setState({ loadingFile: true })
    this.versionStore.fetchList({
      app_id: this.props.detail.app_id,
    })
    this.fileStore
      .fetch({
        app_id: this.props.detail.app_id,
        version_id: this.state.formData.version_id,
      })
      .then(() => {
        this.updateValuesYaml()
      })
  }

  updateValuesYaml = () => {
    const packageFiles = this.fileStore.files

    if (packageFiles && packageFiles['values.yaml']) {
      set(this.state.formData, 'conf', packageFiles['values.yaml'])
      this.setState({
        valuesYaml: packageFiles['values.yaml'],
        loadingFile: false,
      })
    }
  }

  @computed
  get sortedVersions() {
    return this.versionStore.list.data
      .map(version => ({
        label: version.name,
        value: version.version_id,
      }))
      .sort((v1, v2) => compareVersion(v2.name, v1.name))
  }

  @computed
  get latestVersion() {
    return get(this.sortedVersions, '[0].value', '')
  }

  versionOptionRender = ({ label, value }) => (
    <span style={{ display: 'flex', alignItem: 'center' }}>
      {label}&nbsp;&nbsp;
      {value === this.latestVersion && (
        <Tag type="warning">{t('Latest Version')}</Tag>
      )}
    </span>
  )

  fetchVersions = async (params = {}) => {
    const { detail } = this.props
    return this.versionStore.fetchList({
      ...params,
      app_id: detail.app_id,
    })
  }

  handleVersionChange = version_id => {
    const { detail } = this.props
    set(this.state.formData, 'version_id', version_id)
    this.setState({ loadingFile: true, valuesYaml: '' })
    this.fileStore.fetch({ app_id: detail.app_id, version_id }).then(() => {
      this.updateValuesYaml()
    })
  }

  handleYamlChange = value => {
    const { formData } = this.state
    this.setState({ valuesYaml: value }, () => {
      set(formData, 'conf', value)
    })
  }

  handleOk = () => {
    this.props.onOk(this.state.formData)
  }

  render() {
    const { detail } = this.props
    const { valuesYaml, conf, loadingFile } = this.state

    return (
      <Modal
        title={`${t('Edit')} ${detail.name}`}
        {...this.props}
        onOk={this.handleOk}
        width={1280}
        okText={t('Update')}
      >
        <Columns>
          <Column>
            <div className={styles.label}>{t('Current App Version')}</div>
            <Input
              className="margin-b12"
              value={detail.version.name}
              readOnly
            />
            <div className={styles.label}>{`${t('Current App Config')} (${t(
              'ReadOnly'
            )})`}</div>
            <Loading spinning={false}>
              <CodeEditor
                mode="yaml"
                className={styles.readOnly}
                value={conf}
                options={{ readOnly: true }}
              />
            </Loading>
          </Column>
          <Column>
            <div className={styles.label}>{t('App Version')}</div>
            <Select
              name="version_id"
              className="margin-b12"
              value={this.state.formData.version_id}
              options={this.sortedVersions}
              placeholder={t('Please select version')}
              pagination={pick(this.versionStore.list, [
                'page',
                'limit',
                'total',
              ])}
              isLoading={this.versionStore.list.isLoading}
              onFetch={this.fetchVersions}
              onChange={this.handleVersionChange}
              optionRenderer={this.versionOptionRender}
              valueRenderer={this.versionOptionRender}
            />
            <div className={styles.label}>{t('New App Config')}</div>
            <Loading spinning={loadingFile}>
              <CodeEditor
                mode="yaml"
                value={valuesYaml}
                onChange={this.handleYamlChange}
              />
            </Loading>
          </Column>
        </Columns>
      </Modal>
    )
  }
}
