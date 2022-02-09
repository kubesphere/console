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

import { isUndefined, isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { toJS } from 'mobx'
import classNames from 'classnames'
import { Modal } from 'components/Base'
import EditMode from 'components/EditMode'

import styles from './index.scss'

export default class YamlEditModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    yaml: PropTypes.object,
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
      value: props.store ? null : props.detail,
    }

    this.editor = React.createRef()
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && !prevProps.visible) {
      this.init(this.props)
    }
  }

  componentDidMount() {
    this.init(this.props)
  }

  init(props) {
    const { yaml, detail, store } = props
    if (yaml) {
      return this.setState({ value: yaml })
    }

    if (detail && detail.name) {
      store.fetchDetail(detail).then(data => {
        const scheduleTemplate = store.deployedScheduleTemplate
        if (!isEmpty(scheduleTemplate)) {
          this.setState({ value: [data._originData, scheduleTemplate] })
        } else {
          this.setState({ value: data._originData })
        }
      })
    }
  }

  handleOk = () => {
    const { onOk, onCancel, store, detail } = this.props

    const value = this.editor.current.getData()
    const list = store.list
    const selectedRowKeys = toJS(list.selectedRowKeys)
    const newSelectedRowKeys = selectedRowKeys
      ? selectedRowKeys.filter(item => item !== detail.uid)
      : ''

    if (isUndefined(value)) {
      onCancel()
    } else {
      onOk(value)
      if (selectedRowKeys) list.setSelectRowKeys(newSelectedRowKeys)
    }
  }

  render() {
    const { readOnly, visible, onCancel, isSubmitting } = this.props
    const title = readOnly ? t('VIEW_YAML') : t('EDIT_YAML')
    const icon = readOnly ? 'eye' : 'pen'

    return (
      <Modal
        icon={icon}
        title={title}
        bodyClassName={classNames({
          [styles.readOnly]: readOnly,
        })}
        onOk={this.handleOk}
        onCancel={onCancel}
        okText={t('OK')}
        visible={visible}
        closable={readOnly}
        hideFooter={readOnly}
        isSubmitting={isSubmitting}
        fullScreen
      >
        {this.state.value && (
          <EditMode
            ref={this.editor}
            editorClassName={styles.editor}
            value={this.state.value}
            readOnly={readOnly}
          />
        )}
      </Modal>
    )
  }
}
