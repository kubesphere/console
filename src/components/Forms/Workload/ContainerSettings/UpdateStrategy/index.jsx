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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { get, set, unset, isEmpty } from 'lodash'

import { STRATEGIES, STRATEGIES_PREFIX } from 'utils/constants'

import { Form, Input, Columns, Column } from '@kube-design/components'
import { TypeSelect } from 'components/Base'
import { NumberInput } from 'components/Inputs'

import styles from './index.scss'

@observer
export default class UpdateStrategyForm extends React.Component {
  static propTypes = {
    module: PropTypes.string,
    data: PropTypes.object,
    onChange: PropTypes.func,
    isFederated: PropTypes.bool,
    isEdit: PropTypes.bool,
  }

  static defaultProps = {
    module: '',
    data: {},
    isFederated: false,
    isEdit: false,
    onChange() {},
  }

  constructor(props) {
    super(props)
    this.state = {
      strategy: this.getStrategy(props),
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const strategy = this.getStrategy(this.props)
    if (strategy !== prevState.strategy) {
      this.setState({ strategy })
    }
  }

  get isRollingUpdate() {
    return this.state.strategy === 'RollingUpdate'
  }

  get prefix() {
    const { isFederated, module, isEdit } = this.props
    return `${isFederated && isEdit ? 'spec.template.' : ''}${
      STRATEGIES_PREFIX[module]
    }`
  }

  get rollingUpdatePrefix() {
    return `${this.prefix}.rollingUpdate`
  }

  getStrategy = props => {
    return get(props.data, `${this.prefix}.type`)
  }

  get strategyOptions() {
    const { module } = this.props
    return STRATEGIES[module].map(({ label, value, description }) => ({
      label: t(label),
      description: t(description),
      icon: 'update',
      value,
    }))
  }

  handleStrategyChange = strategy => {
    const { data, module } = this.props
    this.setState({ strategy }, () => {
      if (strategy !== 'RollingUpdate') {
        unset(data, this.rollingUpdatePrefix)
      } else {
        const obj = get(data, this.rollingUpdatePrefix)
        if (isEmpty(obj)) {
          switch (module) {
            case 'deployments':
              set(data, this.rollingUpdatePrefix, {
                maxUnavailable: '25%',
                maxSurge: '25%',
              })
              break
            case 'statfulsets':
              set(data, this.rollingUpdatePrefix, {
                partition: 0,
              })
              break
            case 'daemonsets':
              set(data, this.rollingUpdatePrefix, {
                maxUnavailable: '25%',
              })
              break
            default:
          }
        }
      }
    })
  }

  valueValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }
    const number = /^[0-9]*$/
    const percentage = /^[0-9]+%$/
    if (!number.test(value) && !percentage.test(value)) {
      return callback({ message: t('ENTER_INTEGER_OR_PERCENTAGE') })
    }
    callback()
  }

  valueValidatorNumber = (rule, value, callback) => {
    if (!value) {
      return callback()
    }
    const number = /^[0-9]*$/
    if (!number.test(value)) {
      return callback({ message: t('PARTITION_ORDINAL_EMPTY') })
    }
    callback()
  }

  renderRollingUpdateParams() {
    const { module } = this.props
    if (module === 'statefulsets') {
      return (
        <Columns className={styles.wrapper}>
          <Column>
            <Form.Item
              label={t('PARTITION_ORDINAL')}
              desc={t('PARTITION_ORDINAL_DESC')}
              rules={[
                { required: true, message: t('PARTITION_ORDINAL_EMPTY') },
                { validator: this.valueValidatorNumber },
              ]}
            >
              <NumberInput
                name={`${this.rollingUpdatePrefix}.partition`}
                defaultValue={0}
                min={0}
                integer
              />
            </Form.Item>
          </Column>
        </Columns>
      )
    }

    if (module === 'daemonsets') {
      return (
        <Columns className={styles.wrapper}>
          <Column>
            <Form.Item
              label={t('MAX_UNAVAILABLE_PODS')}
              desc={t('MAX_UNAVAILABLE_PODS_DESC')}
              rules={[{ required: true, message: t('MAX_UNAVAILABLE_EMPTY') }]}
            >
              <Input
                name={`${this.rollingUpdatePrefix}.maxUnavailable`}
                defaultValue="20%"
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('MIN_READY_SECONDS')}
              desc={t('MIN_READY_SECONDS_DESC')}
              rules={[
                { required: true, message: t('MIN_READY_SECONDS_EMPTY') },
              ]}
            >
              <NumberInput
                name="spec.minReadySeconds"
                defaultValue={0}
                min={0}
                integer
              />
            </Form.Item>
          </Column>
        </Columns>
      )
    }

    return (
      <Columns className={styles.wrapper}>
        <Column>
          <Form.Item
            label={t('MAX_UNAVAILABLE_PODS')}
            desc={t('MAX_UNAVAILABLE_PODS_DESC')}
            rules={[
              { required: true, message: t('MAX_UNAVAILABLE_EMPTY') },
              { validator: this.valueValidator },
            ]}
          >
            <Input
              name={`${this.rollingUpdatePrefix}.maxUnavailable`}
              defaultValue="25%"
            />
          </Form.Item>
        </Column>
        <Column>
          <Form.Item
            label={t('MAX_EXTRA_PODS')}
            desc={t('MAX_EXTRA_PODS_DESC')}
            rules={[
              { required: true, message: t('MAX_EXTRA_EMPTY') },
              { validator: this.valueValidator },
            ]}
          >
            <Input
              name={`${this.rollingUpdatePrefix}.maxSurge`}
              defaultValue="25%"
            />
          </Form.Item>
        </Column>
      </Columns>
    )
  }

  static getDerivedStateFromProps(props, state) {
    const { data } = props
    const number = /^[0-9]*$/
    const rollingUpdate = 'spec.strategy.rollingUpdate'
    if (state.strategy === 'RollingUpdate') {
      if (number.test(get(data, `${rollingUpdate}.maxSurge`))) {
        set(
          data,
          `${rollingUpdate}.maxSurge`,
          Number(get(data, `${rollingUpdate}.maxSurge`))
        )
      }
      if (number.test(get(data, `${rollingUpdate}.maxUnavailable`))) {
        set(
          data,
          `${rollingUpdate}.maxUnavailable`,
          Number(get(data, `${rollingUpdate}.maxUnavailable`))
        )
      }
    }

    return null
  }

  render() {
    return (
      <>
        <Form.Item label={t('UPDATE_STRATEGY')}>
          <TypeSelect
            name={`${this.prefix}.type`}
            onChange={this.handleStrategyChange}
            defaultValue="RollingUpdate"
            options={this.strategyOptions}
          />
        </Form.Item>
        <Form.Group
          label={t('ROLLING_UPDATE_SETTINGS')}
          checkable
          keepDataWhenUnCheck
        >
          {this.isRollingUpdate && this.renderRollingUpdateParams()}
        </Form.Group>
      </>
    )
  }
}
