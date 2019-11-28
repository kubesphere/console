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

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import pathToReg from 'path-to-regexp'
import { get } from 'lodash'

import { Tabs, Columns, Column } from '@pitrix/lego-ui'

import { Button, Notify } from 'components/Base'
import AppPreview from 'appStore/components/AppPreview'
import AppDeployForm from 'components/Forms/AppTemplate'
import AppBase from 'appStore/components/AppBase'
import VersionSelect from 'apps/components/VersionSelect'

import AppStore from 'stores/openpitrix/app'
import VersionStore from 'stores/openpitrix/version'
import Banner from './Banner'

import styles from './index.scss'

const { TabPanel } = Tabs

@observer
class AppDetail extends Component {
  static propTypes = {
    app: PropTypes.object,
    setType: PropTypes.func,
    workspace: PropTypes.string,
    onDeploySuccess: PropTypes.func,
  }

  static defaultProps = {
    app: {},
    onDeploySuccess() {},
  }

  constructor(props) {
    super(props)
    this.state = {
      tab: 'versionInfo',
      selectAppVersion: '',
      showDeploy: false,
    }

    this.appStore = new AppStore()
    this.versionStore = new VersionStore()
  }

  get appId() {
    return this.props.app.app_id
  }

  async componentDidMount() {
    await this.fetchVersions()
    const selectAppVersion = get(
      this.versionStore,
      'list.data[0].version_id',
      ''
    )
    this.setState(() => ({ selectAppVersion }))

    this.appStore.fetchDetail({ app_id: [this.appId] })
  }

  componentWillUnmount() {
    this.props.setType()
  }

  fetchVersions = async (params = {}) => {
    await this.versionStore.fetchList({
      ...params,
      app_id: this.appId,
    })
  }

  handleTabChange = tab => {
    this.setState({ tab })
  }

  handleClickBack = () => {
    const { app } = this.props
    this.props.setType('appList', app.repo_id)
  }

  showDeploy = () => {
    this.setState({ showDeploy: true })
  }

  hideDeploy = () => {
    this.setState({ showDeploy: false })
  }

  handleDeploy = params => {
    const { namespace, ...rest } = params
    this.appStore.deploy(rest, { namespace }).then(() => {
      this.hideDeploy()
      Notify.success({
        content: `${t('Deploy Successfully')}!`,
      })
      this.props.onDeploySuccess()
    })
  }

  handleChangeAppVersion = version => {
    this.setState({ selectAppVersion: version })
  }

  renderVersionList() {
    return (
      <VersionSelect
        versionStore={this.versionStore}
        selectVersion={this.state.selectAppVersion}
        fetchVersions={this.fetchVersions}
        handleChangeVersion={this.handleChangeAppVersion}
      />
    )
  }

  renderDeployForm() {
    const urlParts = pathToReg(`/projects/:namespace/:module/:type?`).exec(
      location.pathname
    )
    return (
      <AppDeployForm
        app={this.appStore.detail}
        onOk={this.handleDeploy}
        onCancel={this.hideDeploy}
        isSubmitting={this.appStore.isSubmitting}
        noHeader
        fromProjectApp
        contentClass={styles.content}
        footerClass={styles.footer}
        className={styles.deployForm}
        params={{
          version: this.state.selectAppVersion,
          workspace: this.props.workspace,
          namespace: urlParts[1] || '',
          module: urlParts[2] || '',
        }}
      />
    )
  }

  renderDeployButton() {
    return (
      <div className={styles.deployButton}>
        <Button type="control" onClick={this.showDeploy} noShadow>
          {t('Deploy')}
        </Button>
      </div>
    )
  }

  renderContent() {
    const { selectAppVersion, tab } = this.state
    const { detail } = this.appStore

    return (
      <div className={styles.appContent}>
        <Tabs
          className="tabs-new"
          activeName={tab}
          onChange={this.handleTabChange}
        >
          <TabPanel label={t('App Info')} name="versionInfo">
            {this.renderDeployButton()}
            <Columns>
              <Column className="is-9">
                <AppPreview
                  appId={this.appId}
                  versionId={selectAppVersion}
                  currentTab={tab}
                />
              </Column>
              <Column>
                {this.renderVersionList()}
                <AppBase app={detail} />
              </Column>
            </Columns>
          </TabPanel>
          <TabPanel label={t('Chart File')} name="chartFiles">
            {this.renderDeployButton()}
            <Columns>
              <Column className="is-9">
                <AppPreview
                  appId={this.appId}
                  versionId={selectAppVersion}
                  currentTab={tab}
                />
              </Column>
              <Column>
                {this.renderVersionList()}
                <AppBase app={detail} />
              </Column>
            </Columns>
          </TabPanel>
        </Tabs>
      </div>
    )
  }

  render() {
    const { app } = this.props
    const { showDeploy } = this.state

    return (
      <>
        <div className={styles.header}>
          <Banner
            onClickBack={this.handleClickBack}
            title={app.name}
            desc={app.description}
            icon={app.icon}
          />
        </div>
        {showDeploy ? this.renderDeployForm() : this.renderContent()}
      </>
    )
  }
}

export default AppDetail
