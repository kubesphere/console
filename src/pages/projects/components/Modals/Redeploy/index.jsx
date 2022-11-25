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

export default class RedeployModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
    isSubmitting: false,
  }

  render() {
    const { detail, type, ...rest } = this.props

    return (
      <Modal width={520} hideHeader {...rest}>
        <div className={styles.wrapper}>
          <Icon name="question" size={40} />
          <div className={styles.text}>
            <div>{t('RECREATE')}</div>
            <p>
              {t('RECREATE_CONFIRM_DESC', {
                resource: detail.name,
                type: t(`${type.toUpperCase()}_LOW`),
              })}
            </p>
          </div>
        </div>
      </Modal>
    )
  }
}
