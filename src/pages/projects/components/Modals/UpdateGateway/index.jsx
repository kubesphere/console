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

import { Modal } from 'components/Base'
import { Icon } from '@kube-design/components'

import { observer } from 'mobx-react'

import styles from './index.scss'

@observer
export default class UpdateGatewayModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    detail: {},
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  handleOk = () => {
    const { onOk, detail } = this.props
    onOk(detail)
  }

  render() {
    const { visible, onCancel } = this.props

    return (
      <Modal
        width={600}
        onCancel={onCancel}
        visible={visible}
        closable={false}
        onOk={this.handleOk}
        footerClassName={styles.footer}
        bodyClassName={styles.modalBody}
        hideHeader
      >
        <div className={styles.body}>
          <div className={styles.title}>
            <Icon name="information" type="light" size={20} />
            <strong>{t('UPDATED_GATEWAY_TITLE')}</strong>
          </div>
          <div className={styles.content}>{t('UPDATE_GATEWAY_DESC')}</div>
        </div>
      </Modal>
    )
  }
}
