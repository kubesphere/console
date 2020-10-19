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

import { Button, Icon } from '@kube-design/components'
import { Modal } from 'components/Base'

import styles from './index.scss'

export default class ConfirmModal extends React.Component {
  static propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    desc: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    icon: '',
    title: '',
    description: '',
    content: '',
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  handleOk = () => {
    this.props.onOk()
  }

  renderTitle() {
    const { icon, title, description } = this.props

    return (
      <div className={styles.title}>
        <Icon name={icon || 'question'} size={description ? 40 : 32} />
        {description ? (
          <div className={styles.description}>
            <h3>{title || t('Note')}</h3>
            <small>{description}</small>
          </div>
        ) : (
          <div className={styles.name}>{title || t('Note')}</div>
        )}
      </div>
    )
  }

  render() {
    const { visible, onCancel, content, isSubmitting } = this.props

    return (
      <Modal
        width={504}
        bodyClassName={styles.modalBody}
        visible={visible}
        isSubmitting={isSubmitting}
        hideHeader
        hideFooter
      >
        <div className={styles.body}>
          {this.renderTitle()}
          <div className={styles.content}>{content}</div>
        </div>
        <div className={styles.footer}>
          <Button onClick={onCancel}>{t('Cancel')}</Button>
          <Button
            type="control"
            disabled={isSubmitting}
            loading={isSubmitting}
            onClick={this.handleOk}
          >
            {t('OK')}
          </Button>
        </div>
      </Modal>
    )
  }
}
