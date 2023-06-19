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

import { Button } from '@kube-design/components'
import { Panel, Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import OAuthModal from 'settings/components/Modals/OAuth'
import GithubOAuthModal from 'settings/components/Modals/GithubOAuth'

import styles from './index.scss'

export default class ThirdPartyLogin extends Component {
  state = {
    showOAuth: false,
    selectOAuth: {},
    showGithubOAuth: false,
  }

  get tips() {
    return [
      {
        title: t('THIRD_PARTY_LOGIN_Q'),
        description: t('THIRD_PARTY_LOGIN_A'),
      },
    ]
  }

  showOAuth = () => {
    this.setState({ showOAuth: true })
  }

  hideOAuth = () => {
    this.setState({ showOAuth: false })
  }

  handleOAuth = () => {
    this.hideOAuth()
  }

  showGithubOAuth = () => {
    this.setState({ showGithubOAuth: true })
  }

  hideGithubOAuth = () => {
    this.setState({ showGithubOAuth: false })
  }

  handleGithubOAuth = () => {
    this.hideGithubOAuth()
  }

  render() {
    const { showOAuth, selectOAuth, showGithubOAuth } = this.state
    return (
      <div>
        <Banner
          icon="passport"
          title={t('THIRD_PARTY_LOGIN')}
          description={t('THIRD_PARTY_LOGIN_DESC')}
          tips={this.tips}
        />
        <div className={styles.title}>
          {t('CURRENT_THIRD_PARTY_LOGIN_CONFIGURATIONS')}
        </div>
        <Panel>
          <Text
            icon="github"
            title="Github OAuth"
            description={t('PROTOCOL_TYPE')}
          />
          <div className={styles.status}>
            <Text
              title={`Github OAuth ${t('NOT_CONFIGURED')}`}
              description={
                'GitHub OAuth uses organization membership to grant access. '
              }
            />
            <Button onClick={this.showGithubOAuth}>
              {t('CONFIGURE')} Github OAuth
            </Button>
          </div>
        </Panel>
        <Panel>
          <Text
            icon="safe-notice"
            title="OAuth"
            description={t('PROTOCOL_TYPE')}
          />
          <div className={styles.status}>
            <Text
              title={`OAuth ${t('NOT_CONFIGURED')}`}
              description={t('OAUTH_DESC')}
            />
            <Button onClick={this.showOAuth}>{t('CONFIGURE')} OAuth</Button>
          </div>
        </Panel>
        <OAuthModal
          visible={showOAuth}
          detail={selectOAuth}
          onOk={this.handleOAuth}
          onCancel={this.hideOAuth}
        />
        <GithubOAuthModal
          visible={showGithubOAuth}
          detail={{}}
          onOk={this.handleGithubOAuth}
          onCancel={this.hideGithubOAuth}
        />
      </div>
    )
  }
}
