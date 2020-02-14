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
import { get } from 'lodash'

import { observer } from 'mobx-react'
import { Modal } from 'components/Base'
import CodeEditor from 'components/Base/CodeEditor'

import styles from './index.scss'

@observer
export default class Shell extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.edittingData.type === 'sh') {
      const value = get(nextProps.edittingData.data, '[0].value.value', '')
      return { value }
    }
    return null
  }

  handleChange = value => {
    this.newValue = value
  }

  handleOk = () => {
    this.props.onAddStep({
      name: 'sh',
      arguments: [
        {
          key: 'script',
          value: { isLiteral: true, value: this.newValue },
        },
      ],
    })
  }

  render() {
    const { visible, onCancel } = this.props

    return (
      <Modal
        width={680}
        bodyClassName={styles.body}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        title={t('shell')}
      >
        <CodeEditor
          className={styles.CodeEditor}
          name="script"
          mode="yaml"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </Modal>
    )
  }
}
