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

import { get, set, unset, isEmpty, isString } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import copy from 'fast-copy'
import {
  Button,
  Notify,
  Form,
  RadioGroup,
  RadioButton,
  Select,
  Alert,
  Toggle,
} from '@kube-design/components'

import { NumberInput } from 'components/Inputs'

import { joinSelector } from 'utils'
import FORM_TEMPLATES from 'utils/form.templates'

import ServicePolicyStore from 'stores/application/servicePolicy'

import SessionRetention from './Session'

import styles from './index.scss'

@observer
export default class PolicyForm extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    store: PropTypes.object,
  }

  static defaultProps = {
    detail: {},
  }

  constructor(props) {
    super(props)

    this.state = {
      mode: 'lb',
      showPoolForm: false,
      showCircuitForm: false,
      formData: {},
    }

    this.store = new ServicePolicyStore()

    this.getData(props)
  }

  get detail() {
    const list = toJS(this.store.list)

    return get(list, 'data.[0]', {})
  }

  get isHTTP() {
    return this.props.protocol === 'http'
  }

  getData(props) {
    const { name } = props.detail
    const { cluster, namespace } = toJS(props.store.detail)

    this.store
      .fetchListByK8s({
        cluster,
        namespace,
        labelSelector: joinSelector({ app: name }),
        limit: 1,
      })
      .then(() => {
        this.setState({
          showPoolForm: this.detail.connectPoolEnable,
          showCircuitForm: this.detail.outlierDetectionEnable,
          formData: this.formTemplate,
        })
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.detail.name !== this.props.detail.name) {
      this.getData(this.props)
    }
  }

  get formTemplate() {
    if (this.detail._originData) {
      return copy(this.detail._originData)
    }

    const { name } = this.props.detail
    const { namespace, selector } = toJS(this.props.store.detail)
    return FORM_TEMPLATES['strategyPolicy']({
      name,
      namespace,
      selector: {
        ...selector,
        app: name,
      },
    })
  }

  getLBOptions() {
    return [
      { label: t('LB_ROUND_ROBIN'), value: 'ROUND_ROBIN' },
      { label: t('LB_LEAST_CONN'), value: 'LEAST_CONN' },
      { label: t('LB_RANDOM'), value: 'RANDOM' },
    ]
  }

  handleModeChange = value => {
    this.setState({ mode: value }, () => {
      if (this.state.mode === 'lb') {
        unset(
          this.state.formData,
          'spec.template.spec.trafficPolicy.loadBalancer.consistentHash'
        )
      } else {
        unset(
          this.state.formData,
          'spec.template.spec.trafficPolicy.loadBalancer.simple'
        )
      }
    })
  }

  handlePoolToggle = value => {
    this.setState({ showPoolForm: value })
  }

  handleCircuitToggle = value => {
    this.setState({ showCircuitForm: value })
  }

  handleSubmit = data => {
    const { showCircuitForm, showPoolForm } = this.state

    if (!showCircuitForm) {
      unset(data, 'spec.template.spec.trafficPolicy.outlierDetection')
    }

    if (!showPoolForm) {
      unset(data, 'spec.template.spec.trafficPolicy.connectionPool')
    }

    const callback = () => {
      this.getData(this.props)
      Notify.success({ content: `${t('Updated Successfully')}` })
    }

    if (!isEmpty(this.detail)) {
      set(data, 'metadata.resourceVersion', this.detail.resourceVersion)
      this.store.update(this.detail, data).then(callback)
    } else {
      const { cluster, namespace } = toJS(this.props.store.detail)
      this.store.create(data, { cluster, namespace }).then(callback)
    }
  }

  sessionValidator = (rule, value, callback) => {
    if (
      isEmpty(value) ||
      Object.values(value).some(item => isString(item) && !item)
    ) {
      return callback({ message: t('Please input value'), field: rule.field })
    }

    callback()
  }

  renderLB() {
    const { mode } = this.state

    return (
      <>
        <div className={styles.title}>{t('Load balance algorithm')}</div>
        <RadioGroup
          wrapClassName="radio-group-button margin-t12"
          buttonWidth={148}
          value={mode}
          onChange={this.handleModeChange}
          size="small"
        >
          <RadioButton value="lb">{t('Load balance')}</RadioButton>
          <RadioButton value="session">{t('Session retention')}</RadioButton>
        </RadioGroup>
        {mode === 'lb' && this.renderLBOptions()}
        {mode === 'session' && this.renderSessionOptions()}
      </>
    )
  }

  renderPool() {
    const { showPoolForm } = this.state

    const title = (
      <div className={styles.title}>
        {t('Connection pool management')}
        <Toggle
          checked={showPoolForm}
          onChange={this.handlePoolToggle}
          onText={t('On')}
          offText={t('Off')}
        />
      </div>
    )

    const hiddenTip = (
      <div className={styles.tip}>{t('CONNECTION_POOL_TIP')}</div>
    )

    if (!this.isHTTP) {
      return (
        <>
          {title}
          {showPoolForm ? (
            <>
              <Form.Item
                className="margin-t12"
                label={t('Max number of connections')}
                desc={t(
                  'The maximum number of HTTP1 or TCP connections to the target host.'
                )}
              >
                <NumberInput
                  name="spec.template.spec.trafficPolicy.connectionPool.tcp.maxConnections"
                  min={0}
                />
              </Form.Item>
              <Form.Item
                label={t('Connection timeout')}
                desc={t('TCP connection timeout.')}
              >
                <NumberInput
                  name="spec.template.spec.trafficPolicy.connectionPool.tcp.connectTimeout"
                  min={0}
                  unit="ms"
                  showUnit
                />
              </Form.Item>
            </>
          ) : (
            hiddenTip
          )}
        </>
      )
    }

    return (
      <>
        {title}
        {showPoolForm ? (
          <>
            <Form.Item
              className="margin-t12"
              label={t('Max number of connections')}
              desc={t(
                'The maximum number of HTTP1 or TCP connections to the target host.'
              )}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.connectionPool.tcp.maxConnections"
                min={0}
              />
            </Form.Item>
            <Form.Item
              label={t('Max number of requests per connection')}
              desc={t(
                'If the maximum number of requests in the backend connection is set to 1, the keep alive feature is disabled.'
              )}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.connectionPool.http.maxRequestsPerConnection"
                defaultValue={1}
                min={0}
              />
            </Form.Item>
            <Form.Item
              label={t('Max request retries')}
              desc={t(
                'The maximum number of retries to the target host within the specified time.'
              )}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.connectionPool.http.maxRetries"
                defaultValue={3}
                min={0}
              />
            </Form.Item>
            <Form.Item
              label={t('Connection timeout')}
              desc={t('TCP connection timeout.')}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.connectionPool.tcp.connectTimeout"
                min={0}
                unit="ms"
                showUnit
              />
            </Form.Item>
            <Form.Item label={t('Maximum requests')}>
              <NumberInput
                name="spec.template.spec.trafficPolicy.connectionPool.http.http2MaxRequests"
                defaultValue={1024}
                min={0}
              />
            </Form.Item>
            <Form.Item label={t('Maximum pending requests')}>
              <NumberInput
                name="spec.template.spec.trafficPolicy.connectionPool.http.http1MaxPendingRequests"
                defaultValue={1024}
                min={0}
              />
            </Form.Item>
          </>
        ) : (
          hiddenTip
        )}
      </>
    )
  }

  renderCircuit() {
    const { showCircuitForm } = this.state

    if (!this.isHTTP) {
      return null
    }

    return (
      <>
        <div className={styles.title}>
          {t('Circuit Breaker')}
          <Toggle
            checked={showCircuitForm}
            onChange={this.handleCircuitToggle}
            onText={t('On')}
            offText={t('Off')}
          />
        </div>
        {showCircuitForm ? (
          <>
            <Form.Item
              className="margin-t12"
              label={t('Continuous error response (5xx) number')}
              desc={t(
                'The number of consecutive 5xx errors in one inspection cycle'
              )}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.outlierDetection.consecutiveErrors"
                defaultValue={5}
                min={0}
              />
            </Form.Item>
            <Form.Item
              label={t('Inspection period (unit: s)')}
              desc={t(
                'The response code will be filtered in the inspection cycle.'
              )}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.outlierDetection.interval"
                defaultValue="10s"
                min={0.001}
                unit="s"
                showUnit
              />
            </Form.Item>
            <Form.Item
              label={t('Pod isolation ratio (unit: %)')}
              desc={t('POD_ISOLATION_RATIO_DESC')}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.outlierDetection.maxEjectionPercent"
                defaultValue={10}
                min={0}
              />
            </Form.Item>
            <Form.Item
              label={t('Base ejection time (s)')}
              desc={t('BASE_EJECTION_TIME_DESC')}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.outlierDetection.baseEjectionTime"
                defaultValue="30s"
                min={0}
                unit="s"
                showUnit
              />
            </Form.Item>
          </>
        ) : (
          <div className={styles.tip}>{t('CIRCUIT_DESC')}</div>
        )}
      </>
    )
  }

  renderLBOptions() {
    return (
      <div className="margin-t12">
        <Form.Item label={t('Load balance algorithm')}>
          <Select
            name="spec.template.spec.trafficPolicy.loadBalancer.simple"
            options={this.getLBOptions()}
            defaultValue="ROUND_ROBIN"
          />
        </Form.Item>
        <Alert
          className={styles.alert}
          message={t.html('LB_ALG_DESC')}
          type="info"
        />
      </div>
    )
  }

  renderSessionOptions() {
    return (
      <div className="margin-t12">
        <Form.Item
          label={t('Method')}
          rules={[{ validator: this.sessionValidator }]}
        >
          <SessionRetention
            name="spec.template.spec.trafficPolicy.loadBalancer.consistentHash"
            protocol={this.props.protocol}
          />
        </Form.Item>
      </div>
    )
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} data={this.state.formData}>
        {this.renderLB()}
        {this.renderPool()}
        {this.renderCircuit()}
        <div className="text-right margin-t12">
          <Button onClick={this.handleCancel}>{t('Cancel')}</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={this.store.isSubmitting}
            disabled={this.store.isSubmitting}
          >
            {t('OK')}
          </Button>
        </div>
      </Form>
    )
  }
}
