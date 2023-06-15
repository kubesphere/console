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
import { Icon } from '@kube-design/components'
import { Modal } from 'components/Base'

import styles from './index.scss'

export default class SetDefaultSecretClass extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  render() {
    const { visible, onCancel, onOk, isSubmitting } = this.props
    return (
      <Modal
        width={520}
        onOk={onOk}
        onCancel={onCancel}
        visible={visible}
        okText={t('OK')}
        cancelText={t('CANCEL')}
        isSubmitting={isSubmitting}
        hideHeader
      >
        <div className={styles.body}>
          <div className="h5">
            <Icon
              name="information"
              color={{ primary: '#ffffff', secondary: '#41b1ea' }}
              size={18}
            />
            &nbsp;&nbsp;
            {t('SET_AS_DEFAULT_REPOSITORY')}
          </div>
          <p>{t('SET_AS_DEFAULT_REPOSITORY_DESC')}</p>
        </div>
      </Modal>
    )
  }
}
