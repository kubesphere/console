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
import { toJS, computed } from 'mobx'
import { observer } from 'mobx-react'
import { Tabs, Loading } from '@kube-design/components'
import { isEmpty } from 'lodash'

import AppFileStore from 'stores/openpitrix/file'

import { Markdown } from 'components/Base'
import TextPreview from 'components/TextPreview'

import styles from './index.scss'

const { TabPanel } = Tabs

@observer
export default class AppPreview extends React.Component {
  static propTypes = {
    appId: PropTypes.string,
    versionId: PropTypes.string,
    currentTab: PropTypes.string,
  }

  static defaultProps = {
    currentTab: '',
    appId: '',
    versionId: '',
  }

  constructor(props) {
    super(props)

    this.fileStore = new AppFileStore()
    this.state = {
      tab: 'versionInfo',
    }
  }

  @computed
  get files() {
    return this.fileStore.files
  }

  componentDidUpdate(prevProps) {
    const { versionId } = this.props
    if (versionId !== prevProps.versionId) {
      this.fetchFile(versionId)
    }
  }

  componentDidMount() {
    const { versionId } = this.props
    this.fetchFile(versionId)
  }

  fetchFile(versionId) {
    const { appId } = this.props
    if (versionId) {
      this.fileStore.fetch({ app_id: appId, version_id: versionId })
    }
  }

  handleTabChange = tab => {
    this.setState({ tab })
  }

  renderReadMe = () => {
    const readme = this.files['README.md']

    if (readme || this.fileStore.isLoading) {
      return <Markdown source={readme} />
    }

    return (
      <p className={styles.noReadme}>
        {t('The version has no documentation.')}
      </p>
    )
  }

  renderChartFiles = () => {
    if (!isEmpty(this.files)) {
      const options = { readOnly: true }

      return (
        <TextPreview files={toJS(this.files)} editorOptions={{ options }} />
      )
    }
  }

  render() {
    const { versionId, currentTab } = this.props
    const { tab } = this.state
    if (!versionId) {
      return null
    }

    if (this.fileStore.isLoading) {
      return <Loading className={styles.loading} />
    }

    if (currentTab === 'versionInfo') {
      return <>{this.renderReadMe()}</>
    }

    if (currentTab === 'chartFiles') {
      return <>{this.renderChartFiles()}</>
    }

    return (
      <Tabs type="button" activeName={tab} onChange={this.handleTabChange}>
        <TabPanel label={t('App Description')} name="versionInfo">
          <div className={styles.wrapper}>{this.renderReadMe()}</div>
        </TabPanel>
        <TabPanel label={t('Chart Files')} name="chartFiles">
          <div className={styles.wrapper}>{this.renderChartFiles()}</div>
        </TabPanel>
      </Tabs>
    )
  }
}
