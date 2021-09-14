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
import { isUndefined } from 'lodash'
import { Modal } from 'components/Base'
import EditMode from 'components/EditMode'

export default class AddByYamlModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    readOnly: false,
    detail: {},
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      value: {
        kind: 'NetworkPolicy',
        apiVersion: 'networking.k8s.io/v1',
        metadata: {
          name: '',
          namespace: '',
        },
        spec: {
          podSelector: {},
        },
      },
    }

    this.editor = React.createRef()
  }

  handleOk = () => {
    const { onOk, onCancel } = this.props

    const value = this.editor.current.getData()
    if (isUndefined(value)) {
      onCancel()
    } else {
      onOk(value)
    }
  }

  render() {
    const { visible, onCancel, isSubmitting } = this.props

    return (
      <Modal
        icon="firewall"
        title={t('CREATE_NETWORK_POLICY_TCAP')}
        description={t('CREATE_NETWORK_POLICY_DESC')}
        onOk={this.handleOk}
        onCancel={onCancel}
        okText={t('OK')}
        visible={visible}
        isSubmitting={isSubmitting}
        width={960}
      >
        <EditMode ref={this.editor} value={this.state.value} />
      </Modal>
    )
  }
}
