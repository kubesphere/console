/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
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
import { ArrayInput } from 'components/Inputs'

import PropTypes from 'prop-types'
import { Form, Input } from '@kube-design/components'
import { Modal } from 'components/Base'
import { get, isEmpty } from 'lodash'
import DevopsStore from 'stores/devops'
import { toJS } from 'mobx'
import Destinations from './Destinations'

export default class CDAllowListModal extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    formTemplate: {},
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  state = {
    formTemplate: {},
  }

  store = new DevopsStore()

  formRef = React.createRef()

  componentDidMount() {
    this.store.fetchDetail({ ...this.props }).then(() => {
      const argo = get(toJS(this.store.detail), '_originData.spec.argo', {})
      this.setState({
        formTemplate: { spec: { argo } },
      })
    })
  }

  checkItemValid = value => {
    return value !== ''
  }

  checkDestinationsValid = value => {
    return !isEmpty(value) && value.name && value.namespace && value.server
  }

  sourceReposValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (value.length > 0) {
      const arr = []
      value.forEach(item => {
        if (arr.includes(item)) {
          return callback({ message: t('SOURCE_REPOS_INPUT_DESC') })
        }
        arr.push(item)
      })
    }

    callback()
  }

  destinationsValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (value.length > 0) {
      const data = []
      value.forEach(item => {
        if (data.includes(item.namespace)) {
          return callback({ message: t('DESTINATIONS_INPUT_DESC') })
        }
        data.push(item.namespace)
      })
    }

    callback()
  }

  render() {
    const { visible, onCancel, onOk } = this.props

    return (
      <Modal.Form
        width={960}
        title={t('EDIT_ALLOWLIST')}
        data={this.state.formTemplate}
        onCancel={onCancel}
        onOk={onOk}
        visible={visible}
        formRef={this.formRef}
      >
        <Form.Item
          label={t('CODE_REPOSITORY')}
          rules={[{ validator: this.sourceReposValidator }]}
        >
          <ArrayInput
            name="spec.argo.sourceRepos"
            addText={t('ADD')}
            itemType="string"
            checkItemValid={this.checkItemValid}
          >
            <Input placeholder={t('REGISTRY_ADDRESS_TCAP')} />
          </ArrayInput>
        </Form.Item>
        <Form.Item
          label={t('DESTINATIONS')}
          rules={[{ validator: this.destinationsValidator }]}
        >
          <ArrayInput
            name="spec.argo.destinations"
            itemType="object"
            addText={t('ADD')}
            checkItemValid={this.checkDestinationsValid}
          >
            <Destinations cluster={this.clusters} />
          </ArrayInput>
        </Form.Item>
      </Modal.Form>
    )
  }
}
