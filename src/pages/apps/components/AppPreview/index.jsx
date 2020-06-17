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
import PropTypes from 'prop-types'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import classnames from 'classnames'

import { Loading } from '@pitrix/lego-ui'
import AppFileStore from 'stores/openpitrix/file'

import { Markdown, Tabs } from 'components/Base'
import TextPreview from '../TextPreview'

import styles from './index.scss'

const tabsMap = [
  { label: 'App Readme', value: 'readme' },
  { label: 'Chart Files', value: 'files' },
]

@observer
export default class AppPreview extends React.Component {
  static propTypes = {
    appVersion: PropTypes.string,
  }
  static defaultProps = {
    appVersion: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      selectTab: tabsMap[0].value,
    }
    this.fileStore = new AppFileStore()
  }

  @computed
  get files() {
    return this.fileStore.files
  }

  componentDidUpdate(prevProps) {
    if (this.props.appVersion !== prevProps.appVersion) {
      this.fetchFile()
    }
  }

  fetchFile() {
    this.fileStore.fetch({ version_id: this.props.appVersion })
  }

  changeTab = tab => {
    this.setState({ selectTab: tab })
  }

  componentDidMount() {
    this.fetchFile()
  }

  renderTabs() {
    return (
      <Tabs
        tabs={tabsMap}
        defaultTab={this.state.selectTab}
        changeTab={this.changeTab}
        className={styles.tabs}
        activeCls={styles.active}
      />
    )
  }

  render() {
    const { appVersion } = this.props
    const { selectTab } = this.state

    if (!appVersion) {
      return null
    }

    return (
      <Loading spinning={this.fileStore.isLoading}>
        <div className={classnames(styles.preview, styles.appBlock)}>
          {this.renderTabs()}
          {selectTab === 'readme' && this.renderReadMe()}
          {selectTab === 'files' && this.renderSetting()}
        </div>
      </Loading>
    )
  }

  renderReadMe = () => {
    const readme = this.files['README.md']

    if (readme || this.fileStore.isLoading) {
      return <Markdown source={readme} className={styles.markdown} />
    }

    return <p>{t('The app has no documentation.')}</p>
  }

  renderSetting = () => <TextPreview files={this.files} />
}
