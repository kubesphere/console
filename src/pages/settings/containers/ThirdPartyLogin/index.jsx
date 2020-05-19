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

import { Button, Panel, Text } from 'components/Base'
import Banner from 'components/Cards/Banner'

import styles from './index.scss'

export default class ThirdPartyLogin extends Component {
  get tips() {
    return [
      {
        title: t('THIRD_PARTY_LOGIN_Q'),
        description: t('THIRD_PARTY_LOGIN_A'),
      },
    ]
  }

  render() {
    return (
      <div>
        <Banner
          icon="licenses"
          title={t('Third-party Login')}
          description={t('THIRD_PARTY_LOGIN_DESC')}
          tips={this.tips}
        />
        <div className={styles.title}>
          {t('Current third-party login configurations')}
        </div>
        <Panel>
          <Text
            icon="github"
            title="Github OAuth"
            description={t('Protocol Type')}
          />
          <div className={styles.status}>
            <Text
              title={`Github OAuth ${t('not configured')}`}
              description={
                'GitHub OAuth uses organization membership to grant access. '
              }
            />
            <Button onClick={this.handleGithubOAuthConfigure}>
              {t('Configure')} Github OAuth
            </Button>
          </div>
        </Panel>
        <Panel>
          <Text
            icon="login-servers"
            title="OAuth"
            description={t('Protocol Type')}
          />
          <div className={styles.status}>
            <Text
              title={`OAuth ${t('not configured')}`}
              description={'OAUTH_DESC'}
            />
            <Button onClick={this.handleOAuthConfigure}>
              {t('Configure')} OAuth
            </Button>
          </div>
        </Panel>
      </div>
    )
  }
}
