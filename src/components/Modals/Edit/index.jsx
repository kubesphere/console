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
import { isEmpty } from 'lodash'

import { Modal } from 'components/Base'
import FormsBox from './Form'

import styles from './index.scss'

export default class EditModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    module: PropTypes.string,
    store: PropTypes.object,
    forms: PropTypes.array,
    formData: PropTypes.object,
    detail: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    title: 'Edit',
    store: {},
    forms: [],
    formData: {},
    detail: {},
    onOk() {},
    onCancel() {},
  }

  get formData() {
    const { detail, formData } = this.props

    if (!isEmpty(formData)) return formData

    return detail
  }

  render() {
    const {
      visible,
      title,
      module,
      store,
      forms,
      onOk,
      onCancel,
      cluster,
      namespace,
      ...rest
    } = this.props

    return (
      <Modal
        width={1162}
        bodyClassName={styles.body}
        title={t(title)}
        visible={visible}
        onCancel={onCancel}
        hideFooter
        {...rest}
      >
        <FormsBox
          module={module}
          store={store}
          forms={forms}
          cluster={cluster}
          namespace={namespace}
          data={this.formData}
          onSubmit={onOk}
          onCancel={onCancel}
        />
      </Modal>
    )
  }
}
