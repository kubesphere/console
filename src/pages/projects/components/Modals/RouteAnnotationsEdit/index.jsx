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
import { observer } from 'mobx-react'

import { Form } from '@kube-design/components'
import { Modal } from 'components/Base'
import { AnnotationsInput } from 'components/Inputs'

import styles from './index.scss'

@observer
class RouteAnnotationsEdit extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    detail: {},
    isSubmitting: false,
    onOk: () => {},
    onCancel: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      formTemplate: toJS(props.detail._originData),
    }
  }

  componentDidUpdate(prevProps) {
    if (toJS(this.props.detail._originData) !== prevProps.detail._originData) {
      this.setState({ formTemplate: toJS(this.props.detail._originData) })
    }
  }

  handleOk = data => {
    const { onOk, store, detail } = this.props
    const list = store.list
    const selectedRowKeys = toJS(list.selectedRowKeys)
    const newSelectedRowKeys = selectedRowKeys.filter(
      item => item !== detail.uid
    )
    onOk(data)
    list.setSelectRowKeys(newSelectedRowKeys)
  }

  render() {
    const { visible, onCancel, isSubmitting } = this.props

    return (
      <Modal.Form
        title={t('EDIT_ANNOTATIONS')}
        icon="firewall"
        visible={visible}
        width={960}
        data={this.state.formTemplate}
        onOk={this.handleOk}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
      >
        <div className={styles.wrapper}>
          <div className={styles.formWrapper}>
            <Form.Item>
              <AnnotationsInput
                name="metadata.annotations"
                hiddenKeys={globals.config.preservedAnnotations}
                addText={t('ADD')}
              />
            </Form.Item>
          </div>
        </div>
      </Modal.Form>
    )
  }
}

export default RouteAnnotationsEdit
