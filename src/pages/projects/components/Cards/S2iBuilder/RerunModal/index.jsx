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

import { Checkbox, Form, Input } from '@kube-design/components'
import { Modal } from 'components/Base'

import styles from './index.scss'

export default class RerunModal extends React.Component {
  static propTypes = {
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
    url: '',
  }

  constructor(props) {
    super(props)

    this.form = React.createRef()
  }

  handleOk = () => {
    const { onOk } = this.props
    if (this.form) {
      const current = this.form.current || {}
      const formData = current.getData()

      onOk(formData)
    }
  }

  renderEnableUpdate = () => (
    <div className={styles.checkboxCard}>
      <label>
        <Form.Item>
          <Checkbox name="isUpdateWorkload" defaultValue={true}>
            <span name className={styles.title}>
              {t('S2I_UPDATE_WORKLOAD')}
            </span>
          </Checkbox>
        </Form.Item>
      </label>
      <p className={styles.desc}>{t('S2I_UPDATA_WORKLOAD_DESC')}</p>
    </div>
  )

  render() {
    const { visible, isSubmitting, onCancel, detail } = this.props

    return (
      <Modal.Form
        formRef={this.form}
        width={691}
        title={t('RERUN')}
        icon="cdn"
        onOk={this.handleOk}
        okText={t('RERUN')}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item label={t('CODE_REPOSITORY_URL')}>
          <Input name="url" defaultValue={detail.sourceUrl} readOnly />
        </Form.Item>
        <Form.Item label={t('NEW_TAG')}>
          <Input name="newTag" placeholder={t('NEW_TAG_DESC')} />
        </Form.Item>
        {this.renderEnableUpdate()}
      </Modal.Form>
    )
  }
}
