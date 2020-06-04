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
import { get, set } from 'lodash'

import { observer } from 'mobx-react'
import { Icon } from '@pitrix/lego-ui'
import { Switch, Panel, Alert, Modal } from 'components/Base'

import FederatedStore from 'stores/federated'

import styles from './index.scss'

@observer
class LogCollection extends React.Component {
  state = {
    showCloseConfirm: false,
  }

  store = new FederatedStore({ module: 'namespaces' })

  componentDidMount() {
    const { namespace } = this.props
    this.store.fetchDetail({
      namespace,
      name: namespace,
    })
  }

  get canEdit() {
    return this.props.actions.includes('manage')
  }

  handleSwitch = () => {
    const { detail } = this.store
    const isOpen =
      get(detail, 'labels["logging.kubesphere.io/logsidecar-injection"]') ===
      'enabled'

    if (isOpen) {
      return this.setState({ showCloseConfirm: true })
    }

    return this.handleToggle()
  }

  handleToggle = () => {
    const { detail } = this.store

    const isOpen =
      get(detail, 'labels["logging.kubesphere.io/logsidecar-injection"]') ===
      'enabled'

    const params = {
      metadata: {
        labels: {
          'logging.kubesphere.io/logsidecar-injection': isOpen
            ? 'disabled'
            : 'enabled',
        },
      },
    }

    set(
      params,
      'spec.template.metadata.labels["logging.kubesphere.io/logsidecar-injection"]',
      isOpen ? 'disabled' : 'enabled'
    )

    this.store.patch(detail, params).then(() => {
      this.hideCloseConfirm()
      this.store.fetchDetail({
        name: detail.name,
        namespace: detail.name,
      })
    })
  }

  hideCloseConfirm = () => {
    this.setState({ showCloseConfirm: false })
  }

  render() {
    const { showCloseConfirm } = this.state
    const { detail } = this.store
    const isOpen =
      get(detail, 'labels["logging.kubesphere.io/logsidecar-injection"]') ===
      'enabled'

    return (
      <>
        <Panel title={t('Collecting File Log')}>
          <div className={styles.header}>
            <Icon name="log" size={40} />
            <div className={styles.item}>
              <div>{isOpen ? t('Opened') : t('Closed')}</div>
              <p>{t('Collecting File Log')}</p>
            </div>
            {this.canEdit && (
              <div className={classNames(styles.item, 'text-right')}>
                <Switch
                  type="control"
                  text={isOpen ? t('Opened') : t('Closed')}
                  onChange={this.handleSwitch}
                  checked={isOpen}
                />
              </div>
            )}
          </div>
          <Alert message={t('COLLECTING_FILE_LOG_DESC')} hideIcon />
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
                <div>{t('Are you sure to close ?')}</div>
                <p>
                  {t("The project's file log collection is about to close.")}
                </p>
              </div>
            </div>
            <div>{t.html('CLOSE_FILE_LOG_TIP')}</div>
          </Modal>
        )}
      </>
    )
  }
}

export default LogCollection
