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
import { isEmpty } from 'lodash'
import { when, toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Tabs } from '@kube-design/components'

import AppVersionStore from 'stores/openpitrix/version'
import AppFileStore from 'stores/openpitrix/file'

import { Card } from 'components/Base'
import Markdown from 'components/Base/Markdown'
import TextPreview from 'components/TextPreview'

import styles from './index.scss'

const { TabPanel } = Tabs

@inject('detailStore')
@observer
export default class AppTemplate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: 'readme',
    }

    this.store = props.detailStore

    this.appVersionStore = new AppVersionStore()
    this.appFileStore = new AppFileStore()

    when(
      () => !isEmpty(this.store.detail),
      () => this.getData()
    )
  }

  getData() {
    const { detail } = toJS(this.store)
    const { app_id, version_id } = detail

    this.appVersionStore.fetchList({
      app_id,
      status: 'active',
    })

    this.appFileStore.fetch({ app_id, version_id })
  }

  handleTabChange = tab => {
    this.setState({ tab })
  }

  renderReadme() {
    const files = this.appFileStore.files

    const readme = files['README.md']
    if (readme || this.appFileStore.isLoading) {
      return (
        <Markdown source={files['README.md']} className={styles.markdown} />
      )
    }

    return <p>{t('The app has no documentation.')}</p>
  }

  renderSettings() {
    const files = this.appFileStore.files
    return <TextPreview files={files} />
  }

  render() {
    const { tab } = this.state
    return (
      <Card title={t('App Description')} className={styles.wrapper}>
        <Tabs type="button" activeName={tab} onChange={this.handleTabChange}>
          <TabPanel label={t('App Description')} name="readme">
            {this.renderReadme()}
          </TabPanel>
          <TabPanel label={t('Configuration Files')} name="settings">
            {this.renderSettings()}
          </TabPanel>
        </Tabs>
      </Card>
    )
  }
}
