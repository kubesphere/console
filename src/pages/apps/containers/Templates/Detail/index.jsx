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

import { get } from 'lodash'
import React from 'react'
import classNames from 'classnames'
import { parse } from 'qs'
import { inject, observer } from 'mobx-react'

import AppVersionStore from 'stores/openpitrix/version'
import AppStore from 'stores/openpitrix/app'
import { safeParseJSON } from 'utils'
import { Loading, Icon } from '@pitrix/lego-ui'
import { Link } from 'react-router-dom'
import { ReactComponent as BackIcon } from 'src/assets/back.svg'
import { Button, Modal } from 'components/Base'

import AppDeployForm from 'components/Forms/AppTemplate'

import AppPreview from 'apps/components/AppPreview'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.params = parse(location.search.slice(1)) || {}

    this.state = {
      selectAppVersion: '',
      filePreviewType: 'ReadME',
      showDeploy: !!(this.params.workspace || this.params.namespace),
    }

    this.appID = this.props.match.params.appID
    this.appStore = new AppStore()
    this.appVersionStore = new AppVersionStore()
  }

  get routing() {
    return this.props.rootStore.routing
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    this.appStore.fetchDetail({ app_id: [this.appID] }).then(() => {
      const selectAppVersion = get(
        this.appStore.detail,
        'latest_app_version.version_id',
        ''
      )
      this.setState({ selectAppVersion })
    })

    this.appVersionStore.fetchList({
      app_id: [this.appID],
      status: 'active',
    })
  }

  changeFilePreviewType = type => () => {
    this.setState({ filePreviewType: type })
  }

  showDeploy = () => {
    this.setState({ showDeploy: true })
  }

  hideDeploy = () => {
    this.setState({ showDeploy: false })
  }

  handleDeploy = params => {
    const { cluster, workspace, namespace, ...rest } = params
    this.appStore.deploy(rest, { namespace }).then(() => {
      this.hideDeploy()
      this.routing.push(
        `/cluster/${cluster}/projects/${namespace}/applications/template`
      )
    })
  }

  renderContent() {
    if (this.appStore.isLoading) {
      return <Loading className={styles.loading} />
    }

    if (this.appStore.detail) {
      return this.renderAppTemplate()
    }

    return <p>404</p>
  }

  renderAppTemplate() {
    return (
      <div className={styles.appTemplate}>
        <div className={styles.appArticle}>
          {this.renderAppOutLine()}
          {this.renderAppFilePreview()}
        </div>
        <div className={styles.appBasic}>
          {this.renderBaseInfo()}
          {this.renderVersionInfo()}
        </div>
        {this.renderDeployModal()}
      </div>
    )
  }

  renderAppOutLine() {
    const detail = this.appStore.detail

    return (
      <div className={classNames(styles.appHeader, styles.appBlock)}>
        <div className={styles.appOutline}>
          <img
            className={styles.appLogo}
            src={detail.icon || '/assets/default-app.svg'}
          />
          <div className={styles.text}>
            <div className="h3">
              {detail.name}
              <small>Version: {detail.latest_app_version.name}</small>
            </div>
            <p>{detail.description}</p>
          </div>
        </div>
        <div className={styles.toolbar}>
          <Button
            type={this.state.filePreviewType === 'ReadME' ? 'default' : 'flat'}
            onClick={this.changeFilePreviewType('ReadME')}
            noShadow
          >
            {t('App README')}
          </Button>
          <Button
            type={this.state.filePreviewType === 'Setting' ? 'default' : 'flat'}
            onClick={this.changeFilePreviewType('Setting')}
            noShadow
          >
            {t('Configuration Files')}
          </Button>
          <Button
            type="control"
            className="float-right"
            onClick={this.showDeploy}
            noShadow
          >
            {t('Deploy App')} <Icon name="next" type="light" />
          </Button>
        </div>
      </div>
    )
  }

  renderAppFilePreview() {
    const { selectAppVersion, filePreviewType } = this.state

    return (
      selectAppVersion && (
        <AppPreview
          previewType={filePreviewType}
          appVersion={selectAppVersion}
        />
      )
    )
  }

  renderBaseInfo() {
    const appMessage = this.appStore.detail || {}
    const latestAppVersion = appMessage.latest_app_version || {}
    const maintainers = safeParseJSON(appMessage.maintainers, []).map(
      maintainer => maintainer.name
    )
    const sources = safeParseJSON(appMessage.sources, ['None'])

    return (
      <div className={styles.appBlock}>
        <div className={styles.appBasic}>
          <h3>{t('Basic Info')}</h3>
          <dl>
            <dt>{t('Version Info')}</dt>
            <dd>{latestAppVersion.name} </dd>
            <dt>{t('Homepage')}</dt>
            <dd>{appMessage.home || 'None'} </dd>
            <dt>{t('Creator')}</dt>
            <dd>{appMessage.owner || 'None'} </dd>
            <dt>{t('Maintainers')}</dt>
            <dd>{maintainers.join(',') || 'None'} </dd>
            <dt>{t('Source')}</dt>
            <dd>
              {sources.map(source => (
                <div key={source}>{source}</div>
              ))}
            </dd>
          </dl>
        </div>
      </div>
    )
  }

  renderVersionInfo() {
    const detail = this.appStore.detail

    return (
      <Loading spinning={this.appVersionStore.list.isLoading}>
        <div className={styles.appBlock}>
          <h3>{t('Version Info')}</h3>
          {this.appVersionStore.list.data.map(version => (
            <p
              key={version.version_id}
              className={classNames({
                [styles.selectVersion]:
                  version.version_id === detail.latest_app_version.version_id,
              })}
            >
              {version.name}
            </p>
          ))}
        </div>
      </Loading>
    )
  }

  renderDeployModal() {
    return (
      <Modal
        width={1162}
        visible={this.state.showDeploy}
        hideHeader
        hideFooter
        className={styles.deployModal}
      >
        <AppDeployForm
          app={this.appStore.detail}
          onOk={this.handleDeploy}
          onCancel={this.hideDeploy}
          isSubmitting={this.appStore.isSubmitting}
          params={this.params}
        />
      </Modal>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.back}>
          <Link className="custom-icon" to={'/apps'}>
            <BackIcon width={16} height={16} />
            <span>{t('Back To List')}</span>
          </Link>
        </div>
        {this.renderContent()}
      </div>
    )
  }
}
