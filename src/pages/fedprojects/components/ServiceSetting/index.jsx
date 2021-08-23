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
import ExternalName from 'components/Forms/Service/ExternalName'

import { SERVICE_TYPES, SERVICE_TYPES_VALUE } from 'utils/constants'
import ServiceSettings from './Form'

import styles from './index.scss'

export default class ServiceSettingForm extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    formTemplate: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    type: '',
    formTemplate: {},
    onSave() {},
    onCancel() {},
  }

  handleOk = () => {
    const { onSave, store, detail } = this.props
    const { resetSubRoute } = this.context
    const form = this.formRef.current
    const list = store.list
    const selectedRowKeys = toJS(list.selectedRowKeys)
    const newSelectedRowKeys = selectedRowKeys.filter(
      item => item !== detail.uid
    )

    form &&
      form.validate(() => {
        onSave(form.getData())
        list.setSelectRowKeys(newSelectedRowKeys)
      })

    resetSubRoute && resetSubRoute()
  }

  handleCancel = () => {
    const { onCancel } = this.props

    onCancel()
  }

  renderServiceSettings() {
    const {
      cluster,
      formRef,
      isFederated,
      formProps,
      formTemplate,
      type,
    } = this.props

    return (
      <ServiceSettings
        formRef={formRef}
        formTemplate={formTemplate}
        cluster={cluster}
        isFederated={isFederated}
        formProps={formProps}
        type={SERVICE_TYPES_VALUE[type]}
      />
    )
  }

  renderExternalName() {
    const { formRef, formTemplate } = this.props

    return <ExternalName formRef={formRef} formTemplate={formTemplate} />
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
    return <div>{this.renderForm()}</div>
  }
}
