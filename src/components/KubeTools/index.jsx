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
import { observable, computed, action } from 'mobx'

import Draggable from 'react-draggable'
import { Icon, Loading } from '@pitrix/lego-ui'
import { get } from 'lodash'
import LogModal from 'components/Modals/LogSearch'
import KubeCtlModal from 'components/Modals/KubeCtl'
import KubeConfigModal from 'components/Modals/KubeConfig'
import { createCenterWindowOpt } from 'utils/dom'

import styles from './index.scss'

@observer
export default class KubeTools extends React.Component {
  @observable
  showTools = false

  @observable
  modalKey = ''

  getWindowOpts() {
    return createCenterWindowOpt({
      width: 1200,
      height: 800,
      scrollbars: 1,
      resizable: 1,
    })
  }

  @computed
  get navStore() {
    return [
      {
        title: 'kubectl',
        key: 'KubeCtl',
        link: '/kubeCtl',
        icon: 'terminal',
        hidden: globals.user.cluster_role !== 'cluster-admin',
        props: {
          title: 'kubectl',
          onCancel: this.hideModal,
        },
        Component: KubeCtlModal,
      },
      {
        icon: 'file',
        key: 'Query',
        title: t('Log Search'),
        link: '/logQuery',
        hidden: !globals.app.hasKSModule('logging'),
        Component: LogModal,
        props: {
          onCancel: this.hideModal,
          title: t('Log Search'),
        },
      },
      {
        icon: 'documentation',
        key: 'config',
        title: 'kubeconfig',
        link: '/kubeConfig',
        hidden: !globals.config.enableKubeConfig,
        Component: KubeConfigModal,
        props: {
          onCancel: this.hideModal,
          title: t('kubeconfig'),
        },
      },
    ]
  }

  @computed
  get selectNav() {
    return this.navStore.find(nav => nav.key === this.modalKey) || {}
  }

  stopPropagation(e) {
    e.stopPropagation()
  }

  onLogNavMouseDown = e => {
    e.preventDefault()
    e.stopPropagation()
    if (e.shiftKey) {
      window.open(
        e.currentTarget.dataset.link,
        e.currentTarget.dataset.key,
        this.getWindowOpts()
      )
      return
    }
    this.selectModal(e)
  }

  @action
  selectModal = e => {
    this.modalKey = e.currentTarget.dataset.key
  }

  @action
  hideModal = () => {
    this.modalKey = ''
  }

  @action
  onMouseEnter = () => {
    this.showTools = true
  }

  @action
  onMouseLeave = () => {
    this.showTools = false
  }

  render() {
    const showTools = this.showTools
    const iconName = showTools ? 'close' : 'hammer'
    const { Component: Modal, props } = this.selectNav

    return (
      <div>
        <Draggable axis="y">
          <div
            className={styles.tools}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <Icon name={iconName} size={24} type="light" />
            {showTools && this.showToolNav()}
          </div>
        </Draggable>
        {Modal && <Modal {...props} />}
      </div>
    )
  }

  showToolNav() {
    return (
      <div className={styles.toolsNavContainer}>
        <div className={styles.toolsNav}>
          <h3>
            {t('Toolbox')}
            <span className={styles.bulb}> 💡</span>
          </h3>
          <p>{t('TOOLBOX_DESC')}</p>
          <ul>
            {this.navStore
              .filter(nav => !nav.hidden)
              .map(nav => (
                <div
                  key={nav.title}
                  data-key={nav.key}
                  data-link={nav.link}
                  className={styles.tool}
                  onMouseDown={nav.onMouseDown || this.onLogNavMouseDown}
                >
                  <Icon name={nav.icon} size={20} />
                  <span className={styles.title}>{nav.title}</span>
                  <span className={styles.tips}>
                    <Loading size={10} spinning={get(nav, 'isLoading', false)}>
                      <Icon name="chevron-right" size={20} type="light" />
                    </Loading>
                  </span>
                </div>
              ))}
          </ul>
          <p>{t('TOOLBOX_SHIFT_TIPS')}</p>
        </div>
      </div>
    )
  }
}
