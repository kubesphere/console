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
import classNames from 'classnames'
import { get } from 'lodash'

import { observer } from 'mobx-react'
import { Icon } from '@kube-design/components'
import { Switch, Panel, Modal } from 'components/Base'

import styles from './index.scss'

@observer
class LogCollection extends React.Component {
  state = {
    showCloseConfirm: false,
  }

  get canEdit() {
    return this.props.actions.includes('manage')
  }

  handleSwitch = () => {
    const { detail } = this.props.store
    const isOpen =
      get(detail, 'labels["logging.kubesphere.io/logsidecar-injection"]') ===
      'enabled'

    if (isOpen) {
      return this.setState({ showCloseConfirm: true })
    }

    return this.handleToggle()
  }

  handleToggle = () => {
    const { detail } = this.props.store
    const isOpen =
      get(detail, 'labels["logging.kubesphere.io/logsidecar-injection"]') ===
      'enabled'

    this.props.store
      .patch(detail, {
        metadata: {
          labels: {
            'logging.kubesphere.io/logsidecar-injection': isOpen
              ? 'disabled'
              : 'enabled',
          },
        },
      })
      .then(() => {
        this.hideCloseConfirm()
        this.props.store.fetchDetail({
          namespace: detail.name,
          cluster: detail.cluster,
        })
      })
  }

  hideCloseConfirm = () => {
    this.setState({ showCloseConfirm: false })
  }

  render() {
    const { showCloseConfirm } = this.state
    const { detail } = this.props.store
    const isOpen =
      get(detail, 'labels["logging.kubesphere.io/logsidecar-injection"]') ===
      'enabled'

    return (
      <>
        <Panel title={t('COLLECT_LOGS_ON_VOLUMES')}>
          <div className={styles.header}>
            <Icon name="log" size={40} />
            <div className={styles.item}>
              <div>{isOpen ? t('ENABLED') : t('DISABLED')}</div>
              <p>{t('LOG_COLLECTION_ENABLED_DESC')}</p>
            </div>
            {this.canEdit && (
              <div className={classNames(styles.item, 'text-right')}>
                <Switch
                  type="control"
                  text={isOpen ? t('ENABLED') : t('DISABLED')}
                  onChange={this.handleSwitch}
                  checked={isOpen}
                />
              </div>
            )}
          </div>
        </Panel>
        {this.canEdit && (
          <Modal
            visible={showCloseConfirm}
            onOk={this.handleToggle}
            onCancel={this.hideCloseConfirm}
            width={520}
            hideHeader
          >
            <div className={styles.modalHeader}>
              <Icon
                name="question"
                size={40}
                color={{
                  primary: '#fff',
                  secondary: '#329dce',
                }}
              />
              <div className={styles.title}>
                <div>{t('DISABLE_LOG_COLLECTION')}</div>
              </div>
            </div>
            <div>{t('DISABLE_LOG_COLLECTION_TIP')}</div>
          </Modal>
        )}
      </>
    )
  }
}

export default LogCollection
