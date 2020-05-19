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
import PlatformEditModal from 'settings/components/Modals/PlatformEdit'

import styles from './index.scss'

export default class BaseInfo extends Component {
  state = {
    showEdit: false,
  }

  showEdit = () => {
    this.setState({ showEdit: true })
  }

  hideEdit = () => {
    this.setState({ showEdit: false })
  }

  handleEdit = () => {}

  render() {
    return (
      <div>
        <Banner
          icon="home"
          title={t('Platform Info')}
          description={t('平台信息提供了平台的标题及LOGO信息的定制')}
        />
        <Panel title={t('Basic Info')}>
          <div className={styles.header}>
            <Text
              icon="image"
              title={location.host}
              description={t('Platform URL')}
            />
            <Button onClick={this.showEdit}>{t('Edit Info')}</Button>
          </div>
          <div className={styles.content}>
            <div className={styles.image}>
              <img src="/assets/logo.svg" alt="" />
            </div>
            <div className={styles.info}>
              <Text
                title={globals.config.title}
                description={t('Platform Title')}
              />
              <Text
                title={globals.config.description || t('KS_DESCRIPTION')}
                description={t('Platform Description')}
              />
            </div>
          </div>
        </Panel>
        <PlatformEditModal
          visible={this.state.showEdit}
          onOk={this.handleEdit}
          onCancel={this.hideEdit}
        />
      </div>
    )
  }
}
