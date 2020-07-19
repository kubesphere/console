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
import { isEmpty } from 'lodash'

import { Modal } from 'components/Base'
import Confirm from 'components/Forms/Base/Confirm'
import SecretSettings from 'components/Forms/Secret/SecretSettings'

import styles from './index.scss'

export default class SecretEditModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    detail: {},
    visible: false,
    onOk() {},
    onCancel() {},
    isSubmitting: false,
  }

  static childContextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  getChildContext() {
    return {
      registerSubRoute: this.registerSubRoute,
      resetSubRoute: this.resetSubRoute,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      formTemplate: this.getFormTemplate(props.detail),
      subRoute: {},
    }
  }

  registerSubRoute = (onSave, onCancel) => {
    this.setState({
      subRoute: {
        onSave,
        onCancel,
      },
    })
  }

  resetSubRoute = () => {
    this.setState({ subRoute: {} })
  }

  handleSubFormSave = () => {
    const { subRoute } = this.state
    if (subRoute && subRoute.onSave) {
      subRoute.onSave(() => {
        this.setState({ subRoute: {} })
      })
    }
  }

  handleSubFormCancel = () => {
    const { subRoute } = this.state
    if (subRoute && subRoute.onCancel) {
      subRoute.onCancel()
      this.setState({ subRoute: {} })
    }
  }

  getFormTemplate(detail = {}) {
    const originData = toJS(detail._originData)
    return { ...originData }
  }

  handleOk = () => {
    const { onOk } = this.props
    onOk(this.state.formTemplate)
  }

  renderSaveBar() {
    const { subRoute } = this.state

    if (isEmpty(subRoute)) {
      return null
    }

    return (
      <Confirm
        className={styles.confirm}
        onOk={this.handleSubFormSave}
        onCancel={this.handleSubFormCancel}
      />
    )
  }

  render() {
    const { subRoute, formTemplate } = this.state
    const { visible, isSubmitting, onCancel, isFederated } = this.props

    return (
      <Modal
        width={960}
        title={t('Edit Secret')}
        icon="pen"
        bodyClassName={styles.body}
        onOk={this.handleOk}
        okText={t('Update')}
        onCancel={onCancel}
        visible={visible}
        disableSubmit={!isEmpty(subRoute)}
        isSubmitting={isSubmitting}
      >
        <SecretSettings
          formTemplate={formTemplate}
          isFederated={isFederated}
          mode="edit"
        />
        {this.renderSaveBar()}
      </Modal>
    )
  }
}
