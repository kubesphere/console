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

import { Alert } from '@pitrix/lego-ui'
import { Form, Modal } from 'components/Base'
import TaintInput from './TaintInput'

import styles from './index.scss'

export default class TaintManagementModal extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    value: [{}],
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      formData: { spec: { taints: props.value } },
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, value } = this.props
    if (visible && visible !== prevProps.visible && prevProps.value !== value) {
      this.setState({ formData: { spec: { taints: value } } })
    }
  }

  handleSubmit = data => {
    this.props.onOk(data)
  }

  render() {
    const { value, ...rest } = this.props

    return (
      <Modal.Form
        width={1162}
        bodyClassName={styles.body}
        title={t('Taint Management')}
        icon="wrench"
        okText={t('Save')}
        data={this.state.formData}
        {...rest}
      >
        <div className={styles.wrapper}>
          <div className={styles.title}>{t('Taint')}</div>
          <Alert type="info" message={t('TAINTS_MSG')} />
          <div className={styles.content}>
            <Form.Item>
              <TaintInput name="spec.taints" />
            </Form.Item>
          </div>
        </div>
      </Modal.Form>
    )
  }
}
