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

import { Form, Input, Select, TextArea } from '@kube-design/components'
import { Modal } from 'components/Base'
import { get } from 'lodash'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import UserStore from 'stores/user'
import { PATTERN_ALIAS_NAME, PATTERN_NAME } from 'utils/constants'

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

    this.store = new UserStore()
    if (props.detail.workspace) {
      this.store.fetchList({
        limit: Infinity,
        workspace: props.detail.workspace,
      })
    }
  }

  componentDidUpdate(prevProps) {
    const workspace = get(this.props, 'detail.workspace')

    if (workspace && workspace !== get(prevProps, 'detail.workspace')) {
      this.store.fetchMembers({
        limit: Infinity,
        workspace,
      })
    }
  }

  getMembersOptions() {
    const { data } = toJS(this.store.list)

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
        title={t('EDIT_INFORMATION')}
        icon="pen"
        data={detail}
        onOk={this.handleOk}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        visible={visible}
      >
        <Form.Item
          label={t('NAME')}
          desc={t('NAME_DESC')}
          rules={[
            { required: true, message: t('NAME_EMPTY_DESC') },
            { pattern: PATTERN_NAME, message: t('PATTERN_NAME_INVALID_TIP') },
          ]}
        >
          <Input name="name" disabled />
        </Form.Item>
        <Form.Item label={t('CREATOR')} desc={t('DEVOPS_ADMIN_DESC')}>
          <Select name="creator" options={this.getMembersOptions()} disabled />
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
          <Input name="aliasName" maxLength={63} />
        </Form.Item>
        <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
          <TextArea maxLength={256} name="description" />
        </Form.Item>
      </Modal.Form>
    )
  }
}
