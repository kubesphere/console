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

import { observer } from 'mobx-react'
import { action, observable } from 'mobx'

import EmptyList from 'components/Cards/EmptyList'
import { set } from 'lodash'
import styles from './index.scss'
import Home from './Home'
import Details from './Details'
import { CARD_CONFIG } from './constats'
import Modal from '../../Base/Modal/modal'

@observer
export default class BillModal extends React.Component {
  @observable
  type = ''

  @observable
  nav = []

  get isWorkspace() {
    return !globals.app.isPlatformAdmin && !globals.app.enableAppStore
  }

  contentConfig = () => ({
    home: {
      Component: Home,
      props: {
        handleSelected: this.handleSelected,
      },
    },
    detail: {
      Component: Details,
      props: {
        type: this.type,
        handleBack: this.handleBack,
      },
    },
  })

  @action
  handleSelected = type => {
    this.type = type
  }

  handleBack = () => {
    if (this.isWorkspace) {
      return
    }
    this.type = undefined
  }

  renderContent() {
    const componentsData = this.contentConfig()

    if (!this.type) {
      let cardConfigRule = CARD_CONFIG

      if (this.isWorkspace) {
        cardConfigRule = CARD_CONFIG.filter(item => item.type === 'workspace')
        this.type = 'workspaces'
        return componentsData.detail
      }

      if (!globals.app.isPlatformAdmin) {
        cardConfigRule = CARD_CONFIG.filter(item => item.type !== 'cluster')
      }

      if (!globals.app.enableAppStore) {
        cardConfigRule = CARD_CONFIG.filter(item => item.type !== 'openpitrix')
      }

      set(componentsData, 'home.props.cardConfigRule', cardConfigRule)

      return componentsData.home
    }

    return componentsData.detail
  }

  render() {
    if (globals.user.workspaces.length < 1) {
      return (
        <EmptyList
          title={t('USER_DASHBOARD_EMPTY_TITLE')}
          desc={t('USER_DASHBOARD_EMPTY_DESC')}
        />
      )
    }

    const { Component, props } = this.renderContent()
    const { title, icon, description, onCancel } = this.props
    return (
      <Modal
        visible
        fullScreen
        hideFooter
        title={title}
        icon={icon}
        description={description}
        onCancel={onCancel}
        className={styles.billContainer}
        headerClassName={styles.billModalHeader}
        bodyClassName={styles.billContent}
      >
        <div className={styles.bill}>
          <Component {...props} />
        </div>
      </Modal>
    )
  }
}
