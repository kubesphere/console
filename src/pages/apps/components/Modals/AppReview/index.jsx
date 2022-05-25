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
import { observer } from 'mobx-react'
import classnames from 'classnames'
import { Button, Tabs } from '@kube-design/components'
import { get } from 'lodash'
import { toJS } from 'mobx'

import { Modal, Image } from 'components/Base'
import BaseInfo from 'apps/components/Cards/BaseInfo'
import AppReadme from 'apps/components/Cards/AppReadme'
import TextPreview from 'apps/components/TextPreview'
import UploadInfo from 'apps/components/Cards/UploadInfo'
import UpdateLog from 'apps/components/Cards/UpdateLog'

import AppStore from 'stores/openpitrix/app'
import VersionStore from 'stores/openpitrix/version'
import FilesStore from 'stores/openpitrix/file'

import styles from './index.scss'

const { TabPanel } = Tabs

@observer
export default class AppReview extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    canHandle: PropTypes.bool,
    detail: PropTypes.object,
    onReject: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    canHandle: false,
    detail: {},
    onReject() {},
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.store = new AppStore()
    this.versionStore = new VersionStore()
    this.fileStore = new FilesStore()
    this.state = {
      tab: 'appInfo',
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && this.props.visible !== prevProps.visible) {
      this.fetchData(this.props)
    }
  }

  componentDidMount() {
    if (this.props.visible) {
      this.fetchData(this.props)
    }
  }

  fetchData = ({ detail }) => {
    this.store.fetchDetail({
      app_id: detail.app_id,
    })
    this.versionStore.fetchDetail({
      app_id: detail.app_id,
      version_id: detail.version_id,
    })
    this.fileStore.fetch({
      app_id: detail.app_id,
      version_id: detail.version_id,
    })
  }

  getPackageName = () => {
    const { detail } = this.props
    const packageName = get(this.versionStore, 'detail.package_name')

    if (!packageName || packageName.startsWith('att-')) {
      return `${detail.app_name}-${detail.version_name}`
    }

    return packageName
  }

  handleTabChange = async tab => {
    this.setState({ tab })
  }

  renderBaseInfo() {
    const appDetail = toJS(this.store.detail)
    const versionDetail = toJS(this.versionStore.detail)
    const screenshotStr = get(appDetail, 'screenshots', '')
    const screenshots = screenshotStr ? screenshotStr.split(',') : []
    const len = screenshots.length

    return (
      <>
        <BaseInfo detail={appDetail} versionName={versionDetail.name} />
        <div className={styles.screenshots}>
          <div className={styles.title}>{t('APP_SCREENSHOTS')}</div>
          {len > 0 ? (
            <ul>
              {screenshots.map((item, index) => (
                <li key={index}>
                  <Image src={item} />
                </li>
              ))}
            </ul>
          ) : (
            <p>{t('NONE')}</p>
          )}
        </div>
      </>
    )
  }

  renderConfigFiles() {
    const { detail } = this.versionStore
    const { files } = this.fileStore

    return (
      <div>
        <UploadInfo
          className={styles.downloadInfo}
          fileStore={this.fileStore}
          packageName={this.getPackageName()}
          updateTime={detail.update_time || detail.status_time}
          appId={detail.app_id}
          versionId={detail.version_id}
          hasPackage
        />
        <TextPreview files={files} />
      </div>
    )
  }

  renderFooter() {
    const { isSubmitting, onReject, onOk } = this.props

    return (
      <div className={styles.footer}>
        <Button type="danger" onClick={onReject}>
          {t('REJECT')}
        </Button>
        <Button
          type="control"
          loading={isSubmitting}
          disabled={isSubmitting}
          onClick={onOk}
        >
          {t('APPROVE')}
        </Button>
      </div>
    )
  }

  render() {
    const { visible, canHandle, ...rest } = this.props
    const versionDetail = toJS(this.versionStore.detail)
    const { tab } = this.state
    const files = get(this.fileStore, 'files', {})
    const readme = files['README.md']

    return (
      <Modal
        bodyClassName={classnames(styles.body, {
          [styles.hideFooter]: !canHandle,
        })}
        visible={visible}
        {...rest}
        rightScreen
        hideFooter
      >
        <Tabs type="button" activeName={tab} onChange={this.handleTabChange}>
          <TabPanel label={t('APP_INFORMATION')} name="appInfo">
            {this.renderBaseInfo()}
          </TabPanel>
          <TabPanel label={t('DOCUMENTATION')} name="readme">
            <AppReadme readme={readme} />
          </TabPanel>
          <TabPanel label={t('CHART_FILES')} name="configFiles">
            {this.renderConfigFiles()}
          </TabPanel>
          <TabPanel label={t('UPDATE_LOG')} name="updateLog">
            <UpdateLog description={versionDetail.description} />
          </TabPanel>
        </Tabs>
        {canHandle && this.renderFooter()}
      </Modal>
    )
  }
}
