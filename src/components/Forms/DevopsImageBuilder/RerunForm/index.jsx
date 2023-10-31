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
import { get, set } from 'lodash'
import { Checkbox, Form } from '@kube-design/components'
import { Modal } from 'components/Base'

import S2iForm from '../S2IForm'

import styles from './index.scss'

export default class RerunForm extends React.Component {
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
  }

  constructor(props) {
    super(props)

    this.form = React.createRef()
    this.content = React.createRef()
  }

  handleOk = () => {
    const { onOk, detail } = this.props

    if (detail) {
      if (
        get(
          detail,
          "metadata.annotations['devops.kubesphere.io/donotautoscale']"
        )
      ) {
        set(
          detail,
          "metadata.annotations['devops.kubesphere.io/donotautoscale']",
          'true'
        )
      }
      this.content.current.validate(() => {
        onOk(detail)
      })
    }
  }

  renderEnableUpdate = () => {
    const { detail } = this.props

    if (!get(detail, 'metadata.annotations.serviceName')) {
      return null
    }

    return (
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
  }

  render() {
    const {
      visible,
      isSubmitting,
      onCancel,
      cluster,
      detail,
      namespace,
    } = this.props
    const isB2i = get(detail, 'spec.config.isBinaryURL')

    return (
      <Modal.Form
        formRef={this.form}
        width={691}
        title={t('RUN')}
        icon="cdn"
        onOk={this.handleOk}
        okText={t('RUN')}
        onCancel={onCancel}
        visible={visible}
        data={detail}
        isSubmitting={isSubmitting}
      >
        {isB2i ? null : (
          <S2iForm
            formTemplate={detail}
            formRef={this.content}
            cluster={cluster}
            namespace={namespace}
            mode="edit"
          />
        )}
        {this.renderEnableUpdate()}
      </Modal.Form>
    )
  }
}
