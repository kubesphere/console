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
import { Form } from '@kube-design/components'
import { Modal } from 'components/Base'
import { NumberInput } from 'components/Inputs'

import styles from './index.scss'

export default class KubernetesParams extends Component {
  state = {
    visible: false,
  }

  showEdit = () => {
    this.setState({ visible: true })
  }

  hideEdit = () => {
    this.setState({ visible: false })
  }

  handleEdit = data => {
    const { value, onChange } = this.props
    onChange({ ...value, ...data })
    this.hideEdit()
  }

  renderPreview() {
    const { value } = this.props
    return (
      <div className={styles.preview}>
        <div className={styles.item}>
          <span>{t('MAX_PODS')}: </span>
          <span>{value.maxPods}</span>
        </div>
        <a className={styles.edit} onClick={this.showEdit}>
          {t('EDIT')}
        </a>
      </div>
    )
  }

  renderModal() {
    const { value } = this.props
    return (
      <Modal.Form
        title={t('EDIT')}
        data={value}
        onOk={this.handleEdit}
        onCancel={this.hideEdit}
        visible={this.state.visible}
      >
        <Form.Item label={t('MAX_PODS')} desc={t('CLUSTER_MAX_PODS_DESC')}>
          <NumberInput name="maxPods" integer min={0} />
        </Form.Item>
      </Modal.Form>
    )
  }

  render() {
    return (
      <div>
        {this.renderPreview()}
        {this.renderModal()}
      </div>
    )
  }
}
