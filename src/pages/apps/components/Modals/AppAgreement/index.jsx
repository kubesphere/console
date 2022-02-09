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

import { Checkbox } from '@kube-design/components'
import { Modal } from 'components/Base'

import styles from './index.scss'

export default class AppAgreement extends Component {
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

  handleChangeCheck = check => {
    localStorage.setItem(`${globals.user.username}-app-agreement`, check)
  }

  render() {
    const { visible, onOk, ...rest } = this.props

    return (
      <Modal
        width={600}
        bodyClassName={styles.body}
        visible={visible}
        hideHeader
        onOk={onOk}
        okText={t('AGREE')}
        {...rest}
      >
        <div className={styles.wrapper}>
          <img src="/assets/app-safety.svg" alt="" />
          <div className={styles.content}>
            <div className={styles.title}> {t('APP_DEPLOY_AGREEMENT')}</div>
            <ul>
              <li>{t('APP_DEPLOY_AGREEMENT_DESC_1')}</li>
              <li>{t('APP_DEPLOY_AGREEMENT_DESC_2')}</li>
            </ul>
            <Checkbox onChange={this.handleChangeCheck}>
              {t('DO_NOT_REMIND_AGAIN')}
            </Checkbox>
          </div>
        </div>
      </Modal>
    )
  }
}
