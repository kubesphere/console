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
import { get } from 'lodash'
import { parse } from 'qs'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import moment from 'moment-mini'
import {
  Button,
  Tabs,
  Tag,
  Columns,
  Column,
  Loading,
} from '@kube-design/components'
import { TypeSelect } from 'components/Base'

import VersionStore from 'stores/openpitrix/version'
import AppStore from 'stores/openpitrix/app'

import Banner from 'apps/components/Banner'
import AppInfo from 'apps/components/AppInfo'
import AppPreview from 'apps/components/AppPreview'
import AppBase from 'apps/components/AppBase'

import styles from './index.scss'

const { TabPanel } = Tabs

@inject('rootStore')
@observer
export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.params = parse(location.search.slice(1)) || {}
    this.htmlOrigBgColor = ''

    this.state = {
      tab: 'appInfo',
      selectAppVersion: '',
      showDeploy: false,
    }

    this.appId = this.props.match.params.appId
    this.appStore = new AppStore()
    this.versionStore = new VersionStore()
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get loggedIn() {
    return Boolean(globals.user)
  }

  get versionOptions() {
    const versions = this.versionStore.list.data
    return versions.map(({ version_id, name, create_time }) => ({
      label: name,
      description: moment(create_time).format(t('YYYY-MM-DD')),
      value: version_id,
    }))
  }

  componentDidMount() {
    this.fixBodyColor()
    this.getData()
  }

  componentWillUnmount() {
    // restore bg color
    document.querySelector('html').style.backgroundColor = this.htmlOrigBgColor
  }

  getData() {
    this.appStore.fetchDetail({ app_id: this.appId })

    this.versionStore
      .fetchList({
        app_id: this.appId,
        status: 'active',
      })
      .then(() => {
        const selectAppVersion = get(
          this.versionStore,
          'list.data[0].version_id',
          ''
        )
        this.setState({ selectAppVersion })
      })
  }

  handleTabChange = tab => {
    this.setState({ tab })
  }

  fixBodyColor() {
    const htmlElem = document.querySelector('html')
    this.htmlOrigBgColor = window.getComputedStyle(htmlElem).backgroundColor
    htmlElem.style.backgroundColor = 'white'
  }

  handleBack = () => {
    this.routing.push('/apps')
  }

  handleChangeAppVersion = version => {
    this.params.version = version
    this.setState({ selectAppVersion: version })
  }

  handleDeploy = () => {
    const link = `${this.props.match.url}/deploy${location.search}`
    if (!globals.user) {
      location.href = `/login?referer=${link}`
    } else {
      this.routing.push(link)
    }
  }

  renderAppFilePreview() {
    const { selectAppVersion } = this.state

    return <AppPreview versionId={selectAppVersion} appId={this.appId} />
  }

  renderKeywords() {
    const { detail } = this.appStore
    let { keywords = '' } = detail
    keywords = keywords
      .split(',')
      .map(v => v.trim())
      .filter(Boolean)

    return (
      <div className={styles.keywords}>
        <div className="h6 margin-b12">{t('Keywords')}</div>
        <div>
          {keywords.length === 0
            ? t('None')
            : keywords.map((v, idx) => (
                <Tag key={idx} type="secondary">
                  {v}
                </Tag>
              ))}
        </div>
      </div>
    )
  }

  renderDeployButton() {
    return (
      <div className={styles.deployButton}>
        <Button onClick={this.handleDeploy} type="control">
          {t('Deploy')}
        </Button>
      </div>
    )
  }

  renderContent() {
    const { tab } = this.state
    const { detail, isLoading } = this.appStore
    const { data } = this.versionStore.list

    if (isLoading) {
      return <Loading className={styles.loading} />
    }

    return (
      <Tabs
        className="tabs-new"
        activeName={tab}
        onChange={this.handleTabChange}
      >
        <TabPanel label={t('App Info')} name="appInfo">
          {this.renderDeployButton()}
          <Columns>
            <Column className="is-8">
              <AppInfo app={detail} versions={toJS(data)} />
            </Column>
            <Column>
              <AppBase app={detail} />
            </Column>
          </Columns>
        </TabPanel>
        <TabPanel label={t('App Details')} name="appDetails">
          {this.renderDeployButton()}
          <Columns>
            <Column className="is-8">{this.renderAppFilePreview()}</Column>
            <Column>
              <div className="h6 margin-b12">{t('Versions')}</div>
              <TypeSelect
                value={this.state.selectAppVersion}
                options={this.versionOptions}
                onChange={this.handleChangeAppVersion}
              />
              {this.renderKeywords()}
            </Column>
          </Columns>
        </TabPanel>
      </Tabs>
    )
  }

  render() {
    return (
      <div className={styles.main}>
        <Banner
          className={styles.banner}
          detail={this.appStore.detail}
          onBack={this.handleBack}
        />
        <div className={styles.content}>{this.renderContent()}</div>
      </div>
    )
  }
}
