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
import { toJS } from 'mobx'
import { Modal } from 'components/Base'
import ExternalName from 'components/Forms/Service/ExternalName'

import { SERVICE_TYPES, SERVICE_TYPES_VALUE } from 'utils/constants'
import ServiceSettings from './Form'

import styles from './index.scss'

export default class ServiceSettingModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.string,
    detail: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    type: '',
    detail: {},
    onOk() {},
    onCancel() {},
    isSubmitting: false,
  }

  constructor(props) {
    super(props)

    this.formRef = React.createRef()

    this.state = { formTemplate: toJS(props.detail._originData) }
  }

  componentDidUpdate(prevProps) {
    const { detail } = this.props

    if (detail._originData !== prevProps.detail._originData) {
      this.setState({
        formTemplate: toJS(detail._originData),
      })
    }
  }

  handleOk = () => {
    const { onOk, store, detail } = this.props
    const form = this.formRef.current
    const list = store.list
    const selectedRowKeys = toJS(list.selectedRowKeys)
    const newSelectedRowKeys = selectedRowKeys.filter(
      item => item !== detail.uid
    )

    form &&
      form.validate(() => {
        onOk(form.getData())
        list.setSelectRowKeys(newSelectedRowKeys)
      })
  }

  handleCancel = () => {
    const { onCancel } = this.props

    onCancel()
  }

  renderServiceSettings() {
    const { cluster, type } = this.props
    return (
      <ServiceSettings
        formRef={this.formRef}
        formTemplate={this.state.formTemplate}
        onCancel={this.resetState}
        cluster={cluster}
        type={SERVICE_TYPES_VALUE[type]}
      />
    )
  }

  renderExternalName() {
    return (
      <ExternalName
        formRef={this.formRef}
        formTemplate={this.state.formTemplate}
        onCancel={this.resetState}
      />
    )
  }

  renderEmpty() {
    return <p className={styles.empty}>{t('UNKNOWN_SERVICE_TYPE')}</p>
  }

  renderForm() {
    const { type } = this.props

    let content = null

    switch (type) {
      case SERVICE_TYPES.VirtualIP:
      case SERVICE_TYPES.Headless:
        content = this.renderServiceSettings()
        break
      case SERVICE_TYPES.ExternalName:
        content = this.renderExternalName()
        break
      default:
        content = this.renderEmpty()
    }

    return content
  }

  render() {
    const { visible, isSubmitting, type } = this.props

    return (
      <Modal
        width={1162}
        title={t('EDIT_SERVICE')}
        onOk={type !== SERVICE_TYPES.Unknown ? this.handleOk : null}
        onCancel={this.handleCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        {this.renderForm()}
      </Modal>
    )
  }
}
