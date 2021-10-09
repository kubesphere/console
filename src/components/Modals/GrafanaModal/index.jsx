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
import { observer } from 'mobx-react'
import { get } from 'lodash'
import { Modal } from 'components/Base'
import { RadioButton, RadioGroup, Form, Input } from '@kube-design/components'

import { action, observable } from 'mobx'
import { PATTERN_URL } from 'utils/constants'
import styles from './index.scss'
import Uploader from './Uploader'

@observer
export default class GrafanaModal extends React.Component {
  @observable
  type = 'json'

  formRef = React.createRef()

  @observable
  formData = {}

  @action
  handleTypeChange = key => {
    this.type = key
    this.formData = {}
  }

  handleSave = () => {
    const form = this.formRef.current
    form &&
      form.validate(() => {
        const { onOk, formTemplate } = this.props
        const data = this.formData
        const name = get(formTemplate, 'metadata.name')
        const description = get(
          formTemplate,
          'metadata.annotations["kubesphere.io/description"]'
        )

        onOk({
          ...data,
          type: 'grafana',
          name,
          description,
          grafanaDashboardName: name,
        })
      })
  }

  renderUpload = () =>
    this.type === 'json' ? (
      <Form.Item
        label={t('SUPPORT_JSON_FILE')}
        rules={[{ required: true, message: t('UPLOAD_FILE_TIP') }]}
      >
        <Uploader name="grafanaDashboardContent" />
      </Form.Item>
    ) : null

  renderUrl = () =>
    this.type === 'json' ? null : (
      <Form.Item
        label={t('UPLOAD_GRAFANA_URL')}
        rules={[
          { required: true, message: t('ENTER_GRAFANA_URL') },
          {
            pattern: PATTERN_URL,
            message: t('INVALID_URL_DESC'),
          },
        ]}
      >
        <Input name="grafanaDashboardUrl" autoFocus maxLength={63} />
      </Form.Item>
    )

  render() {
    const { onCancel } = this.props

    return (
      <Modal
        visible
        width={600}
        onCancel={onCancel}
        title={t('UPLOAD_GRAFANA_DASHBOARD')}
        onOk={this.handleSave}
      >
        <div className={styles.container}>
          <Form data={this.formData} ref={this.formRef}>
            <RadioGroup
              mode="button"
              value={this.type}
              onChange={this.handleTypeChange}
              size="small"
            >
              <RadioButton value="json">
                {t('UPLOAD_FROM_LOCAL_STORAGE')}
              </RadioButton>
              <RadioButton value="url">{t('UPLOAD_FROM_URL')}</RadioButton>
            </RadioGroup>
            {this.renderUpload()}
            {this.renderUrl()}
          </Form>
        </div>
      </Modal>
    )
  }
}
