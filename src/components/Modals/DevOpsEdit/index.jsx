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

import { get } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Input, Select, TextArea } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'
import { PATTERN_NAME } from 'utils/constants'

import DevOpsStore from 'stores/devops'

@observer
export default class DevOpsEditModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    detail: {},
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.form = React.createRef()

    this.store = new DevOpsStore()

    if (props.detail.project_id) {
      this.store.fetchMembers({
        limit: Infinity,
        project_id: props.detail.project_id,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.detail &&
      nextProps.detail.project_id &&
      nextProps.detail.project_id !== get(this.props, 'detail.project_id')
    ) {
      this.store.fetchMembers({
        limit: Infinity,
        project_id: nextProps.detail.project_id,
      })
    }
  }

  getMembersOptions() {
    const { data } = toJS(this.store.members)

    return data.map(member => ({
      label: member.username,
      value: member.username,
    }))
  }

  handleOk = data => {
    const { onOk } = this.props

    onOk(data)
  }

  render() {
    const { detail, visible, onCancel, isSubmitting } = this.props

    return (
      <Modal.Form
        width={691}
        title={t('Edit Info')}
        icon="pen"
        data={detail}
        onOk={this.handleOk}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        visible={visible}
      >
        <Form.Item
          label={t('DevOps Name')}
          desc={t('NAME_DESC')}
          rules={[
            { required: true, message: t('Please input name') },
            { pattern: PATTERN_NAME, message: t('PATTERN_NAME_INVALID_TIP') },
          ]}
        >
          <Input name="name" />
        </Form.Item>
        <Form.Item label={t('Creator')} desc={t('DEVOPS_ADMIN_DESC')}>
          <Select name="creator" options={this.getMembersOptions()} disabled />
        </Form.Item>
        <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
          <TextArea name="description" />
        </Form.Item>
      </Modal.Form>
    )
  }
}
