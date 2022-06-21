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
      Notify.success({ content: t('UPDATE_SUCCESSFUL') })
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
      return callback({ message: t('PARAM_REQUIRED'), field: rule.field })
    }

    callback()
  }

  renderLB() {
    const { mode } = this.state

    return (
      <>
        <div className={styles.title}>{t('TRAFFIC_POLICIES')}</div>
        <RadioGroup
          wrapClassName="radio-group-button margin-t12"
          buttonWidth={165}
          value={mode}
          onChange={this.handleModeChange}
          size="small"
        >
          <RadioButton value="lb">{t('LOAD_BALANCING')}</RadioButton>
          <RadioButton value="session">{t('SESSION_PERSISTENCE')}</RadioButton>
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
        {t('CONNECTION_POOL')}
        <Toggle
          checked={showPoolForm}
          onChange={this.handlePoolToggle}
          onText={t('ON')}
          offText={t('OFF')}
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
                label={t('MAXIMUM_CONNECTIONS')}
                desc={t('MAXIMUM_CONNECTIONS_DESC')}
              >
                <NumberInput
                  name="spec.template.spec.trafficPolicy.connectionPool.tcp.maxConnections"
                  min={0}
                />
              </Form.Item>
              <Form.Item
                label={t('CONNECTION_TIMEOUT')}
                desc={t('CONNECTION_TIMEOUT_DESC')}
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
              label={t('MAXIMUM_CONNECTIONS')}
              desc={t('MAXIMUM_CONNECTIONS_DESC')}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.connectionPool.tcp.maxConnections"
                min={0}
              />
            </Form.Item>
            <Form.Item
              label={t('MAXIMUM_REQUESTS_PER_CONNECTION')}
              desc={t('MAXIMUM_REQUESTS_PER_CONNECTION_DESC')}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.connectionPool.http.maxRequestsPerConnection"
                defaultValue={1}
                min={0}
              />
            </Form.Item>
            <Form.Item
              label={t('TRAFFIC_MONITORING_MAXIMUM_RETRIES')}
              desc={t('TRAFFIC_MONITORING_MAXIMUM_RETRIES_DESC')}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.connectionPool.http.maxRetries"
                defaultValue={3}
                min={0}
              />
            </Form.Item>
            <Form.Item
              label={t('CONNECTION_TIMEOUT')}
              desc={t('CONNECTION_TIMEOUT_DESC')}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.connectionPool.tcp.connectTimeout"
                min={0}
                unit="ms"
                showUnit
              />
            </Form.Item>
            <Form.Item label={t('MAXIMUM_REQUESTS')}>
              <NumberInput
                name="spec.template.spec.trafficPolicy.connectionPool.http.http2MaxRequests"
                defaultValue={1024}
                min={0}
              />
            </Form.Item>
            <Form.Item label={t('MAXIMUM_PENDING_REQUESTS')}>
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
          {t('CIRCUIT_BREAKER')}
          <Toggle
            checked={showCircuitForm}
            onChange={this.handleCircuitToggle}
            onText={t('ON')}
            offText={t('OFF')}
          />
        </div>
        {showCircuitForm ? (
          <>
            <Form.Item
              className="margin-t12"
              label={t('CONSECUTIVE_FIVEXX_ERRORS')}
              desc={t('CONSECUTIVE_FIVEXX_ERRORS_DESC')}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.outlierDetection.consecutiveErrors"
                defaultValue={5}
                min={0}
              />
            </Form.Item>
            <Form.Item
              label={t('INSPECTION_INTERVAL_S')}
              desc={t('INSPECTION_INTERVAL_S_DESC')}
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
              label={t('MAXIUM_EJECTION_RATIO')}
              desc={t('MAXIUM_EJECTION_RATIO_DESC')}
            >
              <NumberInput
                name="spec.template.spec.trafficPolicy.outlierDetection.maxEjectionPercent"
                defaultValue={10}
                min={0}
              />
            </Form.Item>
            <Form.Item
              label={t('BASE_EJECTION_TIME_S')}
              desc={t('BASE_EJECTION_TIME_S_DESC')}
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
          <div className={styles.tip}>{t('CIRCUIT_BREAKER_DESC')}</div>
        )}
      </>
    )
  }

  renderLBOptions() {
    return (
      <div className="margin-t12">
        <Form.Item label={t('LOAD_BALANCING_ALGORITHM')}>
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
          label={t('METHOD')}
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
          <Button onClick={this.handleCancel}>{t('CANCEL')}</Button>
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
