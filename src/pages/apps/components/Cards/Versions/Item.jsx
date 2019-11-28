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
import classnames from 'classnames'

import { Icon, Tabs } from '@pitrix/lego-ui'

import { Button, Modal } from 'components/Base'
import DeleteModal from 'components/Modals/Delete'
import ConfigFile from 'apps/components/Cards/ConfigFile'
import AuditRecord from 'apps/components/Cards/AuditRecord'
import VersionStatus from 'apps/components/VersionStatus'
import { getLocalTime } from 'utils'

import {
  CAN_DELETE_STATUS,
  CAN_SUBMIT_STATUS,
  CAN_CANCEL_STATUS,
} from 'configs/openpitrix/version'

import styles from './index.scss'

const { TabPanel } = Tabs

export default class VersionItem extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    appName: PropTypes.string,
    detail: PropTypes.object,
    store: PropTypes.object,
  }

  static defaultProps = {
    appName: '',
    detail: {},
    store: {},
  }

  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      tab: 'configFile',
      handleType: '',
      isExpand: false,
    }
  }

  handleTabChange = tab => {
    this.setState({ tab })
  }

  handleExpandExtra = () => {
    this.setState({
      isExpand: !this.state.isExpand,
    })
  }

  showDeleteModel = () => {
    this.setState({
      showDelete: true,
      handleType: 'delete',
    })
  }

  showHandleModel = type => {
    this.setState({
      showHandle: true,
      handleType: type,
    })
  }

  hideHandle = () => {
    this.setState({
      showDelete: false,
      showHandle: false,
    })
  }

  handleVersion = () => {
    const { version_id, app_id } = this.props.detail
    const { handleType } = this.state
    this.store.handle(handleType, version_id).then(() => {
      this.hideHandle()
      this.store.fetchList({ app_id })
    })
  }

  renderContent() {
    const { detail } = this.props
    return (
      <div className={styles.content}>
        <dl>
          <dt>
            <VersionStatus type={detail.status} noIcon />
          </dt>
          <dd>{t('状态')}</dd>
        </dl>
        <dl>
          <dt>{detail.name}</dt>
          <dd>{t('应用版本')}</dd>
        </dl>
        <dl>
          <dt>{detail.owner}</dt>
          <dd>{t('开发者')}</dd>
        </dl>
        <dl>
          <dt>
            {getLocalTime(detail.status_time).format('YYYY-MM-DD HH:mm:ss')}
          </dt>
          <dd>{t('更新时间')}</dd>
        </dl>
        <dl className={styles.more}>
          <Icon name="chevron-down" size={20} />
        </dl>
      </div>
    )
  }

  renderVersionActions() {
    const { status } = this.props.detail

    return (
      <div className={styles.actions}>
        {CAN_DELETE_STATUS.includes(status) && (
          <Button onClick={this.showDeleteModel} type={'danger'}>
            {t('VERSION_DELETE')}
          </Button>
        )}
        <Button type={'default'}>{t('部署测试')}</Button>
        {CAN_SUBMIT_STATUS.includes(status) && (
          <Button
            onClick={() => this.showHandleModel('submit')}
            type={'control'}
          >
            {t('VERSION_SUBMIT')}
          </Button>
        )}
        {CAN_CANCEL_STATUS.includes(status) && (
          <Button
            onClick={() => this.showHandleModel('cancel')}
            type={'control'}
          >
            {t('VERSION_CANCEL')}
          </Button>
        )}
      </div>
    )
  }

  renderExtraContent() {
    const { detail, appName } = this.props
    const { tab } = this.state

    return (
      <div className={styles.itemExtra}>
        <Tabs
          className="tabs-new"
          activeName={tab}
          onChange={this.handleTabChange}
        >
          <TabPanel label={t('配置文件')} name="configFile">
            <ConfigFile detail={detail} appName={appName} />
          </TabPanel>
          <TabPanel label={t('审核记录')} name="auditRecord">
            <AuditRecord appId={detail.app_id} versionId={detail.version_id} />
          </TabPanel>
          <TabPanel label={t('部署实例')} name="deployInstances">
            deployInstances
          </TabPanel>
        </Tabs>
        {this.renderVersionActions()}
      </div>
    )
  }

  renderModals() {
    const { detail } = this.props
    const { handleType } = this.state

    return (
      <div>
        <DeleteModal
          detail={detail}
          desc={t.html(`VERSION_${handleType.toUpperCase()}_TIP`, {
            name: detail.name,
          })}
          visible={this.state.showDelete}
          onOk={this.handleVersion}
          onCancel={this.hideHandle}
          isSubmitting={this.store.isSubmitting}
        />
        <Modal
          visible={this.state.showHandle}
          onOk={this.handleVersion}
          onCancel={this.hideHandle}
          isSubmitting={this.store.isSubmitting}
          hideHeader
        >
          <div className="h5">{t(`VERSION_${handleType.toUpperCase()}`)}</div>
          <div className={styles.handleContent}>
            {t.html(`VERSION_${handleType.toUpperCase()}_TIP`, {
              name: detail.name,
            })}
          </div>
        </Modal>
      </div>
    )
  }

  render() {
    const { className, detail } = this.props
    const { isExpand } = this.state

    return (
      <div
        className={classnames(styles.item, className, {
          [styles.expanded]: isExpand,
        })}
      >
        <div className={styles.itemMain} onClick={this.handleExpandExtra}>
          <div className={styles.icon}>
            <Icon name="cloud" size={40} />
            <VersionStatus
              className={styles.status}
              type={detail.status}
              noName
            />
          </div>
          {this.renderContent()}
        </div>
        {isExpand && this.renderExtraContent()}
        {this.renderModals()}
      </div>
    )
  }
}
