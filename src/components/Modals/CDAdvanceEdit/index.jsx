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
import { Modal } from 'components/Base'
import { set, get, isEmpty, omit, defaultsDeep } from 'lodash'
import CDAdvanceSetting from 'components/Forms/CD/Advance'
import { PARMMETER_TYPES } from 'utils/constants'

export default class EditCDAdvanceSetting extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    branches: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = {
      formData: {},
    }
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  componentDidMount() {
    this.setFormData(this.props.formTemplate)
  }

  setFormData = formTemplate => {
    const metadata = get(formTemplate, 'metadata', {})
    const argoApp = get(formTemplate, 'spec.argoApp.spec', {})
    const destination = get(argoApp, 'destination', {})

    let syncPolicy = omit(get(argoApp, 'syncPolicy', {}), 'syncOptions')
    if (isEmpty(syncPolicy)) {
      set(syncPolicy, 'type', 'manual')
    } else {
      syncPolicy = Object.entries(syncPolicy).reduce((acc, [key, value]) => {
        acc.type = key
        if (isEmpty(value)) {
          return acc
        }
        return Object.assign(
          acc,
          Object.entries(value).reduce((pre, [_key, _value]) => {
            return {
              ...pre,
              [_key]: _value,
            }
          }, {})
        )
      }, {})
    }

    const syncOptions = get(argoApp, 'syncPolicy.syncOptions', []).reduce(
      (syncOption, opt) => {
        const [optKey, optValue] = opt.split('=')
        let value = optValue
        if (value === 'true') {
          value = true
        }
        if (value === 'false') {
          value = false
        }
        return {
          ...syncOption,
          [optKey]: value,
        }
      },
      {}
    )

    const source = get(argoApp, 'source', {})
    const formData = {
      metadata,
      destination,
      syncPolicy,
      syncOptions,
      source,
      parameter_type: 'auto',
    }

    PARMMETER_TYPES.forEach(({ value }) => {
      if (value in source) {
        formData.parameter_type = value
        formData[value] = source[value]
        formData.source = omit(source, value)
      }
    })
    this.setState({
      formData,
    })
  }

  handleOk = () => {
    const form = this.formRef && this.formRef.current

    form &&
      form.validate(() => {
        const formData = defaultsDeep(
          this.formRef.current.getData(),
          this.props.formTemplate
        )
        this.props.onOk(formData)
      })
  }

  render() {
    const { visible, onCancel, store } = this.props
    return (
      <Modal
        width={1162}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        title={t('EDIT_SETTINGS')}
      >
        <CDAdvanceSetting
          store={store}
          formRef={this.formRef}
          formTemplate={this.state.formData}
        />
      </Modal>
    )
  }
}
