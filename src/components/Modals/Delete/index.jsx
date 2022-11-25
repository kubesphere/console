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

import { Button, Icon, Input } from '@kube-design/components'
import { Modal } from 'components/Base'

import styles from './index.scss'

export default class DeleteModal extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    resource: PropTypes.string,
    visible: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    desc: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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

  state = {
    confirm: '',
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && this.props.visible !== prevProps.visible) {
      this.setState({ confirm: '' })
    }
  }

  handleInputChange = e => {
    this.setState({ confirm: e.target.value })
  }

  handleOk = () => {
    this.props.onOk()
  }

  render() {
    const {
      app,
      type,
      resource,
      visible,
      onCancel,
      title,
      desc,
      isSubmitting,
      deleteCluster,
    } = this.props
    const typeKey = type || undefined
    const typeKeyLow = type ? `${type}_LOW` : undefined
    const typeKeyPl = type ? `${type}_PL` : undefined
    let tip =
      desc ||
      (resource && type
        ? resource.split(', ').length === 1
          ? t.html('DELETE_RESOURCE_TYPE_DESC_SI', {
              type: t(typeKeyLow),
              resource,
            })
          : t.html('DELETE_RESOURCE_TYPE_DESC_PL', {
              type: t(typeKeyLow),
              resource,
            })
        : t.html('DELETE_DESC', { resource, type: '' }))

    if (app) {
      tip = t.html('DELETE_APP_RESOURCE_TIP', { type, resource, app })
    }
    if (deleteCluster) {
      tip = t.html('REMOVE_CLUSTER_DESC', { name: resource })
    }
    return (
      <Modal
        width={504}
        bodyClassName={styles.modalBody}
        visible={visible}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        hideHeader
        hideFooter
      >
        <div className={styles.body}>
          <div className="h5">
            <Icon name="close" type="light" className={styles.closeIcon} />
            {title ||
              (resource && type
                ? resource.split(', ').length === 1
                  ? t('DELETE_TITLE_SI', { type: t(typeKey) })
                  : t('DELETE_TITLE_PL', { type: t(typeKeyPl) })
                : t('DELETE'))}
          </div>
          <div className={styles.content}>
            <p>{tip}</p>
            {resource && (
              <Input
                name="confirm"
                value={this.state.confirm}
                onChange={this.handleInputChange}
                placeholder={resource}
                autoFocus={true}
              />
            )}
          </div>
        </div>
        <div className={styles.footer}>
          <Button onClick={onCancel} data-test="modal-cancel">
            {t('CANCEL')}
          </Button>
          <Button
            type="danger"
            loading={isSubmitting}
            disabled={
              isSubmitting ||
              (resource ? this.state.confirm !== resource : false)
            }
            onClick={this.handleOk}
            data-test="modal-ok"
          >
            {t('OK')}
          </Button>
        </div>
      </Modal>
    )
  }
}
