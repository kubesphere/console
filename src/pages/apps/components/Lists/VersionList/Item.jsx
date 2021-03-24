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
import { toJS } from 'mobx'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inject } from 'mobx-react'
import { Button, Notify, Icon, Tabs } from '@kube-design/components'
import { capitalize } from 'lodash'

import DeleteModal from 'components/Modals/Delete'
import Confirm from 'apps/components/Modals/Confirm'
import VersionStatus from 'apps/components/VersionStatus'
import ConfigFile from 'apps/components/Cards/ConfigFile'
import AuditRecord from 'apps/components/Lists/AuditRecord'
import InstanceList from 'apps/components/Lists/InstanceList'
import VersionSubmitModal from 'apps/components/Modals/VersionSubmit'

import { getLocalTime } from 'utils'
import { trigger } from 'utils/action'

import {
  CAN_DELETE_STATUS,
  STATUS_TO_ACTION,
  STATUS_TO_ACTION_ADMIN,
  ACTION_TO_NAME,
  APP_STORE_ACTIONS,
  HANDLE_TYPE_TO_SHOW,
} from 'configs/openpitrix/version'
import { STORE_QUERY_STATUS } from 'configs/openpitrix/app'

import styles from './index.scss'

const { TabPanel } = Tabs

@inject('rootStore')
@trigger
export default class VersionItem extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isAdmin: PropTypes.bool,
    appDetail: PropTypes.object,
    detail: PropTypes.object,
    params: PropTypes.object,
    store: PropTypes.object,
    appStore: PropTypes.object,
    handleExpandExtra: PropTypes.func,
    enabledActions: PropTypes.array,
  }

  static defaultProps = {
    isAdmin: false,
    appDetail: {},
    detail: {},
    params: {},
    store: {},
    appStore: {},
    enabledActions: [],
    handleExpandExtra() {},
  }

  constructor(props) {
    super(props)
    this.store = this.props.store
    this.state = {
      tab: 'configFile',
      handleType: '',
    }
  }

  handleTabChange = tab => {
    this.setState({ tab })
  }

  handleExpandExtra = () => {
    const { detail } = this.props
    this.props.handleExpandExtra(detail.version_id)
  }

  showDeploy = () => {
    this.trigger('openpitrix.template.deploy', {
      ...this.props.params,
      store: this.props.appStore,
      app: this.props.appDetail,
      versionId: this.props.detail.version_id,
    })
  }

  showDeleteModel = () => {
    this.setState({
      deleteShow: true,
      handleType: 'delete',
    })
  }

  showHandleModel = type => () => {
    if (type === 'view') {
      const { app_id } = this.props.detail
      this.props.rootStore.routing.push(`/apps/${app_id}`)
    } else if (type === 'submit') {
      this.setState({
        submitShow: true,
        handleType: 'submit',
      })
    } else {
      this.setState({
        confirmShow: true,
        handleType: type,
      })
    }
  }

  hideHandleModal = () => {
    this.setState({
      deleteShow: false,
      confirmShow: false,
      submitShow: false,
      appDeploy: false,
    })
  }

  deleteVersion = () => {
    const { version_id, app_id } = this.props.detail
    this.store.delete({ app_id, version_id }).then(() => {
      this.hideHandleModal()
      Notify.success({
        content: `${t('Delete Successfully')}`,
      })
      this.store.fetchList({ app_id })
    })
  }

  handleVersion = () => {
    const { detail, isAdmin } = this.props
    const { version_id, app_id } = detail
    const { handleType } = this.state
    const data = {
      app_id,
      version_id,
      action: handleType,
    }

    this.store.handle(data).then(() => {
      const type = HANDLE_TYPE_TO_SHOW[handleType] || handleType
      this.hideHandleModal()
      Notify.success({
        content: `${t(`${capitalize(type)} Successfully`)}`,
      })
      const status = isAdmin ? STORE_QUERY_STATUS : this.store.defaultStatus

      if (APP_STORE_ACTIONS.includes(handleType)) {
        this.props.appStore.fetchDetail({ app_id })
      } else {
        this.store.fetchList({ app_id, status })
      }
    })
  }

  handleSubmit = params => {
    this.store.update(params).then(() => {
      this.handleVersion()
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
          <dd>{t('Status')}</dd>
        </dl>
        <dl>
          <dt>{detail.name}</dt>
          <dd>{t('App Version')}</dd>
        </dl>
        <dl>
          <dt>{detail.owner}</dt>
          <dd>{t('Developer')}</dd>
        </dl>
        <dl>
          <dt>
            {getLocalTime(detail.update_time || detail.status_time).format(
              'YYYY-MM-DD HH:mm:ss'
            )}
          </dt>
          <dd>{t('Updated Time')}</dd>
        </dl>
        <dl className={styles.more}>
          <Icon name="chevron-down" size={20} />
        </dl>
      </div>
    )
  }

  renderVersionActions() {
    const { isAdmin, enabledActions } = this.props
    const { status } = this.props.detail
    const handleType = isAdmin
      ? STATUS_TO_ACTION_ADMIN[status]
      : STATUS_TO_ACTION[status]

    if (!enabledActions.includes('manage')) {
      return null
    }

    return (
      <div className={styles.actions}>
        {CAN_DELETE_STATUS.includes(status) && !isAdmin && (
          <Button onClick={this.showDeleteModel} type={'danger'}>
            {t('Delete Version')}
          </Button>
        )}
        {!isAdmin && (
          <Button onClick={this.showDeploy} type="default">
            {t('Test Deployment')}
          </Button>
        )}
        {handleType && (
          <Button onClick={this.showHandleModel(handleType)} type={'control'}>
            {t(ACTION_TO_NAME[handleType])}
          </Button>
        )}
      </div>
    )
  }

  renderExtraContent() {
    const { detail, appDetail, clusters } = this.props
    const { tab } = this.state

    return (
      <div className={styles.itemExtra}>
        <Tabs type="button" activeName={tab} onChange={this.handleTabChange}>
          <TabPanel label={t('Chart Files')} name="configFile">
            <ConfigFile
              appId={detail.app_id}
              versionId={detail.version_id}
              appName={appDetail.name}
            />
          </TabPanel>
          <TabPanel label={t('Audit Records')} name="auditRecord">
            <AuditRecord appId={detail.app_id} versionId={detail.version_id} />
          </TabPanel>
          <TabPanel label={t('Deployed Instances')} name="deployInstances">
            <InstanceList
              title={t('Deployed Instances')}
              className={styles.instances}
              appId={appDetail.app_id}
              versionId={detail.version_id}
              workspace={appDetail.workspace}
              clusters={clusters}
            />
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
        <Confirm
          content={t.html(`VERSION_${handleType.toUpperCase()}_TIP`, {
            name: detail.name,
          })}
          visible={this.state.confirmShow}
          onOk={this.handleVersion}
          onCancel={this.hideHandleModal}
          isSubmitting={this.store.isSubmitting}
        />
        <DeleteModal
          detail={detail}
          desc={t.html(`VERSION_${handleType.toUpperCase()}_TIP`, {
            name: detail.name,
          })}
          visible={this.state.deleteShow}
          onOk={this.deleteVersion}
          onCancel={this.hideHandleModal}
          isSubmitting={this.store.isSubmitting}
        />
        <VersionSubmitModal
          visible={this.state.submitShow}
          onOk={this.handleSubmit}
          onCancel={this.hideHandleModal}
          isSubmitting={this.store.isSubmitting}
          detail={toJS(detail)}
        />
      </div>
    )
  }

  render() {
    const { className, detail } = this.props

    return (
      <div
        className={classnames(styles.item, className, {
          [styles.expanded]: detail.isExpand,
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
        {detail.isExpand && this.renderExtraContent()}
        {this.renderModals()}
      </div>
    )
  }
}
