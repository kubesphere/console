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
import { get } from 'lodash'

import { Columns, Column } from '@pitrix/lego-ui'

import { Button, RadioGroup } from 'components/Base'
import AppPreview from 'appStore/components/AppPreview'
import AppBase from 'appStore/components/AppBase'
import VersionSelect from 'apps/components/VersionSelect'

import AppStore from 'stores/openpitrix/app'
import VersionStore from 'stores/openpitrix/version'

import Banner from './Banner'

import styles from './index.scss'

@observer
class AppDetail extends Component {
  static propTypes = {
    app: PropTypes.object,
    setType: PropTypes.func,
    workspace: PropTypes.string,
  }

  static defaultProps = {
    app: {},
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

  get tabs() {
    return [
      {
        label: t('App Info'),
        value: 'versionInfo',
      },
      {
        label: t('Chart Files'),
        value: 'chartFiles',
      },
    ]
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
    this.props.onDeploy({
      app: this.appStore.detail,
      store: this.appStore,
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

  render() {
    const { app } = this.props
    const { selectAppVersion, tab } = this.state
    const { detail } = this.appStore

    return (
      <>
        <Banner
          onClickBack={this.handleClickBack}
          title={app.name}
          desc={app.description}
          icon={app.icon}
        />
        <div className={styles.bar}>
          <RadioGroup
            value={tab}
            options={this.tabs}
            onChange={this.handleTabChange}
          />
          <Button type="control" onClick={this.showDeploy} noShadow>
            {t('Deploy')}
          </Button>
        </div>
        <div className={styles.content}>
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
        </div>
      </>
    )
  }
}

export default AppDetail
