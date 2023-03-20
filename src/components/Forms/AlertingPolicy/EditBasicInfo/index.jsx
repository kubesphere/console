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

import { Form, Input, TextArea } from '@kube-design/components'
import { Modal } from 'components/Base'
import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'
import copy from 'fast-copy'
import { toJS } from 'mobx'
import PropTypes from 'prop-types'
import React from 'react'
import { PATTERN_ALIAS_NAME } from 'utils/constants'
import UnitInput from '../BaseInfo/UnitInput'
import styles from './index.scss'

export default class EditAlarmBasicInfoModal extends React.Component {
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

  constructor(props) {
    super(props)

    this.state = {
      formData: copy(toJS(props.detail._originData || props.detail)),
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && this.props.visible !== prevProps.visible) {
      this.setState({
        formData: copy(
          toJS(this.props.detail._originData || this.props.detail)
        ),
      })
    }
  }

  handleOk = data => {
    const { onOk, store, detail } = this.props
    const list = store.list
    const selectedRowKeys = toJS(list.selectedRowKeys)
    const newSelectedRowKeys = selectedRowKeys
      ? selectedRowKeys.filter(item => item !== detail.uid)
      : ''
    onOk(data)
    if (selectedRowKeys) list.setSelectRowKeys(newSelectedRowKeys)
  }

  timeValidator = (rule, value, callback) => {
    const duration = value.slice(0, -1)
    const time = /^[0-9]*$/

    if (!time.test(duration)) {
      return callback({ message: t('INVALID_TIME_DESC') })
    }
    callback()
  }

  get durationUnitOptions() {
    return [
      {
        label: t('SECONDS'),
        value: 's',
      },
      {
        label: t('MINUTES'),
        value: 'm',
      },
      {
        label: t('HOURS'),
        value: 'h',
      },
    ]
  }

  get severities() {
    return SEVERITY_LEVEL.map(item => ({
      label: t(item.label),
      value: item.value,
      level: item,
    }))
  }

  render() {
    const { visible, isSubmitting, onCancel } = this.props
    const { formData } = this.state

    return (
      <Modal.Form
        data={formData}
        width={691}
        title={t('EDIT_INFORMATION')}
        icon="pen"
        onOk={this.handleOk}
        okText={t('OK')}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item label={t('NAME')}>
          <Input name="metadata.name" disabled />
        </Form.Item>
        <Form.Item
          label={t('ALIAS')}
          desc={t('ALIAS_DESC')}
          rules={[
            {
              pattern: PATTERN_ALIAS_NAME,
              message: t('INVALID_ALIAS_NAME_DESC'),
            },
          ]}
        >
          <Input
            name="metadata.annotations['kubesphere.io/alias-name']"
            maxLength={63}
          />
        </Form.Item>
        <Form.Item
          label={t('CHECK_INTERVAL')}
          desc={t('ALERTING_POLICY_CHECK_INTERVAL_DESC')}
          rules={[{ validator: this.timeValidator }]}
        >
          <UnitInput
            className={styles.duration}
            name="spec.interval"
            unitOptions={this.durationUnitOptions}
            defaultValue={this.durationUnitOptions[1].value}
          />
        </Form.Item>
        <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
          <TextArea
            name="metadata.annotations['kubesphere.io/description']"
            maxLength={256}
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
