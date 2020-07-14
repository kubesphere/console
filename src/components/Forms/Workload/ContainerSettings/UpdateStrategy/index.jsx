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
import { get, unset } from 'lodash'

import { STRATEGIES, STRATEGIES_PREFIX } from 'utils/constants'

import { Input, Tooltip, Icon, Columns, Column } from '@pitrix/lego-ui'
import { Form, TypeSelect } from 'components/Base'
import { NumberInput } from 'components/Inputs'

import styles from './index.scss'

const getStrategy = (props = {}) =>
  get(props.data, `${STRATEGIES_PREFIX[props.module]}.type`)

@observer
export default class UpdateStrategyForm extends React.Component {
  static propTypes = {
    module: PropTypes.string,
    data: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    module: '',
    data: {},
    onChange() {},
  }

  state = {
    strategy: getStrategy(this.props),
  }

  componentDidUpdate(prevProps, prevState) {
    const strategy = getStrategy(this.props)
    if (strategy !== prevState.strategy) {
      this.setState({ strategy })
    }
  }

  get isRollingUpdate() {
    return this.state.strategy === 'RollingUpdate'
  }

  get rollingUpdatePrefix() {
    return `${STRATEGIES_PREFIX[this.props.module]}.rollingUpdate`
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
    this.setState({ strategy }, () => {
      if (strategy !== 'RollingUpdate') {
        unset(this.props.data, this.rollingUpdatePrefix)
      }
    })
  }

  renderRollingUpdateParams() {
    const { module } = this.props
    if (module === 'statefulsets') {
      return (
        <Columns className={styles.wrapper}>
          <Column>
            <Form.Item
              label={t('Partition')}
              desc={t('STATEFULSET_PARTITION_DESC')}
              rules={[{ required: true, message: t('Please input value') }]}
            >
              <NumberInput
                name={`${this.rollingUpdatePrefix}.partition`}
                placeholder={t('STATEFULSET_PARTITION_PLACEHOLDER')}
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
              label={t('MAX_AVAILABLE_POD_LABEL')}
              desc={t('MAX_UNAVAILABLE_POD_DESC')}
              rules={[{ required: true, message: t('Please input value') }]}
            >
              <Input
                name={`${this.rollingUpdatePrefix}.maxUnavailable`}
                defaultValue="20%"
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('MinReadySeconds')}
              desc={t('MIN_READY_SECONDS_DESC')}
              rules={[{ required: true, message: t('Please input value') }]}
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
            label={t('MIN_AVAILABLE_POD_LABEL')}
            desc={t('MIN_AVAILABLE_POD_DESC')}
            rules={[{ required: true, message: t('Please input value') }]}
          >
            <Input
              name={`${this.rollingUpdatePrefix}.maxUnavailable`}
              defaultValue="25%"
            />
          </Form.Item>
        </Column>
        <Column>
          <Form.Item
            label={t('MAX_SURGE_POD_LABEL')}
            desc={t('MAX_SURGE_POD_DESC')}
            rules={[{ required: true, message: t('Please input value') }]}
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

  render() {
    const { module } = this.props

    const label = (
      <span>
        <span className="align-middle">{t('POD_SETTING_TIP')}</span>
        {module === 'deployments' && (
          <Tooltip content={t('ROLLING_UPDATE_POD_TIP')}>
            <Icon name="information" />
          </Tooltip>
        )}
      </span>
    )

    return (
      <>
        <Form.Item
          label={t('Update Strategy')}
          rules={[{ validator: this.strategyValidator }]}
        >
          <TypeSelect
            name={`${STRATEGIES_PREFIX[module]}.type`}
            onChange={this.handleStrategyChange}
            defaultValue="RollingUpdate"
            options={this.strategyOptions}
          />
        </Form.Item>
        <Form.Group label={label} checkable keepDataWhenUnCheck>
          {this.isRollingUpdate && this.renderRollingUpdateParams()}
        </Form.Group>
      </>
    )
  }
}
