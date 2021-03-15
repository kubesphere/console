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
import classNames from 'classnames'
import { Icon } from '@kube-design/components'
import { Modal } from 'components/Base'

import styles from './index.scss'

const Item = ({ icon, image, title, desc, disabled, onEnter }) => (
  <div
    className={classNames(styles.item, { [styles.disable]: disabled })}
    onClick={onEnter}
  >
    {image ? <img src={image} alt="" /> : <Icon name={icon} size={40} />}
    <div className={styles.text}>
      <div>{title}</div>
      <p>{desc}</p>
    </div>
  </div>
)

export default class DeployAppModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  handleAppTemplate = () => {
    const { namespace, cluster, workspace, routing, onOk } = this.props
    onOk()
    routing.push(
      `/apps?workspace=${workspace}&cluster=${cluster}&namespace=${namespace}`
    )
  }

  handleAppRepo = () => {
    const { onOk, trigger, ...rest } = this.props
    onOk()
    trigger('openpitrix.app.create', {
      trigger,
      ...rest,
    })
  }

  render() {
    const { visible, onCancel } = this.props

    return (
      <Modal
        width={600}
        style={{ borderRadius: '8px' }}
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        bodyClassName={styles.body}
        hideHeader
        hideFooter
      >
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src="/assets/application.svg" alt="" />
          </div>
          <div className={styles.text}>
            <h2>{t('Deploy New Application')}</h2>
            <p>{t('APP_DEPLOYMENT_DESC')}</p>
          </div>
        </div>

        <div className={styles.footer}>
          {globals.app.enableAppStore && (
            <Item
              icon="templet"
              title={t('From App Store')}
              desc={t('FROM_APP_STORE_DESC')}
              onEnter={this.handleAppTemplate}
            />
          )}
          <Item
            icon="catalog"
            title={t('From App Templates')}
            desc={t('FROM_APP_TEMPLATES_DESC')}
            onEnter={this.handleAppRepo}
          />
        </div>
      </Modal>
    )
  }
}
