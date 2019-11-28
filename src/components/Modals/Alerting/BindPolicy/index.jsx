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
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import AlertingPolicyStore from 'stores/alerting/policy'

import { Input, RadioGroup, RadioButton } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class BindPolicyModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    detail: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    detail: {},
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.store = new AlertingPolicyStore('deployments')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && nextProps.visible !== this.props.visible) {
      this.fetchData(nextProps)
    }
  }

  componentDidMount() {
    if (this.props.visible) {
      this.fetchData(this.props)
    }
  }

  fetchData = () => {
    this.store.fetchList({ namespace: 'default' })
  }

  getPolicyOptions = () => {
    const { data } = this.store.list

    return data.map(item => ({
      ...item,
      label: item.name,
      value: item.name,
    }))
  }

  renderPolicyItem = item => (
    <RadioButton key={item.value} className={styles.radio} value={item.value}>
      <i />
      <div className={styles.desc}>
        <strong>{item.name}</strong>
        <p>监控项: CPU用量 / 内存用量</p>
      </div>
    </RadioButton>
  )

  render() {
    const { detail, ...rest } = this.props
    const policies = this.getPolicyOptions()

    return (
      <Modal.Form
        title={t('Bind Alerting Policy')}
        icon="pin"
        width={691}
        data={detail}
        {...rest}
      >
        <Form.Item label={t('Resource Name')}>
          <Input name="name" disabled />
        </Form.Item>
        {!isEmpty(policies) && (
          <Form.Item className={styles.radioGroup}>
            <RadioGroup
              name="policy"
              direction="column"
              defaultValue={policies[0].value}
            >
              {policies.map(this.renderPolicyItem)}
            </RadioGroup>
          </Form.Item>
        )}
      </Modal.Form>
    )
  }
}
