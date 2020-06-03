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
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import classnames from 'classnames'
import { Dropdown, Menu, Icon } from '@pitrix/lego-ui'

import AboutModal from 'components/Modals/About'
import { trigger } from 'utils/action'

import UserStore from 'stores/user'

import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
export default class LoginInfo extends Component {
  static propTypes = {
    isAppsPage: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.store = new UserStore()
    this.state = {
      showAbout: false,
    }
  }

  handleMoreClick = (e, key) => {
    switch (key) {
      case 'setting':
        this.trigger('user.setting', {})
        break
      case 'about':
        this.setState({ showAbout: true })
        break
      case 'logout':
        this.props.rootStore.logout()
        break
      default:
        break
    }
  }

  hideAboutModal = () => {
    this.setState({ showAbout: false })
  }

  renderDropDown() {
    return (
      <Menu onClick={this.handleMoreClick}>
        <Menu.MenuItem key="setting">
          <Icon name="wrench" /> {t('User Settings')}
        </Menu.MenuItem>
        <Menu.MenuItem key="logout">
          <Icon name="logout" /> {t('Log Out')}
        </Menu.MenuItem>
        <Menu.MenuItem key="about">
          <Icon name="information" /> {t('About')}
        </Menu.MenuItem>
      </Menu>
    )
  }

  renderModals() {
    return (
      <div>
        <AboutModal
          visible={this.state.showAbout}
          onCancel={this.hideAboutModal}
        />
      </div>
    )
  }

  render() {
    const { className, isAppsPage } = this.props

    if (!globals.user) {
      return (
        <div className={classnames(styles.notLoggedIn, className)}>
          <div className={styles.name}>
            <Icon
              name="human"
              color={{
                primary: '#f5a623',
                secondary: '#8d663e',
              }}
            />
            <a
              className={styles.loginLabel}
              href={`/login?referer=${location.pathname}`}
            >
              {t('Login KubeSphere')}
            </a>
          </div>
        </div>
      )
    }

    return (
      <div className={classnames(styles.logined, className)}>
        <Dropdown content={this.renderDropDown()} placement="bottomRight">
          <div
            className={classnames(styles.name, {
              [styles.isAppsPage]: isAppsPage,
            })}
          >
            <Icon name="human" />
            {globals.user.username}
            <Icon name="caret-down" type={isAppsPage ? 'white' : 'dark'} />
          </div>
        </Dropdown>
        {this.renderModals()}
      </div>
    )
  }
}
