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
import { set } from 'lodash'

import { SERVICE_TYPES } from 'utils/constants'
import ServiceStore from 'stores/service'

import { Loading } from '@kube-design/components'
import { Modal } from 'components/Base'
import ServiceForm from './Form'

export default class StatefulSetServiceEditModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    detail: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    detail: {},
    onOk() {},
    onCancel() {},
    isSubmitting: false,
  }

  constructor(props) {
    super(props)

    this.formRef = React.createRef()

    this.state = { formTemplate: {} }

    this.store = props.store || new ServiceStore()

    this.fetchData(props.detail)
  }

  componentDidUpdate(prevProps) {
    const { visible, detail } = this.props
    if (visible && visible !== prevProps.visible) {
      this.fetchData(detail)
    }
  }

  fetchData(detail = {}) {
    if (detail.name && detail.namespace) {
      this.store.fetchDetail(detail).then(() => {
        this.setState({
          formTemplate: toJS(this.store.detail._originData),
        })
      })
    }
  }

  handleOk = () => {
    const { onOk } = this.props
    const form = this.formRef.current

    form &&
      form.validate(() => {
        const data = form.getData()
        set(data, 'metadata.resourceVersion', this.store.detail.resourceVersion)
        onOk(data)
      })
  }

  handleCancel = () => {
    const { onCancel } = this.props
    onCancel()
  }

  renderForm() {
    return (
      <ServiceForm
        formRef={this.formRef}
        formTemplate={this.state.formTemplate}
      />
    )
  }

  render() {
    const { visible, isSubmitting, detail } = this.props

    return (
      <Modal
        width={1162}
        title={t('EDIT_SERVICE')}
        onOk={detail.type !== SERVICE_TYPES.Unknown ? this.handleOk : null}
        onCancel={this.handleCancel}
        okText={t('OK')}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Loading spinning={this.store.isLoading}>{this.renderForm()}</Loading>
      </Modal>
    )
  }
}
