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
import { Form, Columns, Column, Alert, Checkbox } from '@kube-design/components'
import { Modal, Text, Switch } from 'components/Base'
import NumberInput from 'components/Inputs/NumberInput'
import { observer } from 'mobx-react'
import { get, isBoolean, range, set, trim, endsWith } from 'lodash'
import Slider from './Slider'
import TailItemInput from './TailItemInput'
import styles from './index.scss'

const values = (props, type, key, defaultValue) => {
  return get(
    props.formData,
    `metadata.annotations['${type}.kubesphere.io/${key}']`,
    defaultValue
  )
}

const sliderSettings = {
  max: 10000,
  min: 0,
  unit: 'Gi',
}

@observer
export default class StorageClassAutoResizerModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = {
      resize: {
        enabled: JSON.parse(values(props, 'resize', 'enabled', false)),
        increase: values(props, 'resize', 'increase', '10Gi'),
        'storage-limit': values(props, 'resize', 'storage-limit', '10000Gi'),
        threshold: values(props, 'resize', 'threshold', '10%'),
      },
      restart: {
        enabled: JSON.parse(values(props, 'restart', 'enabled', false)),
        'max-time': values(props, 'restart', 'max-time', '300'),
      },
      fakeIncrease: values(props, 'resize', 'increase', '10Gi'),
      fakeThreshold: values(props, 'resize', 'threshold', '10%'),
      fakeLimit: values(props, 'resize', 'storage-limit', '10000Gi'),
      fakeMaxTime: values(props, 'restart', 'max-time', '300'),
    }
  }

  get increaseOptions() {
    return [
      { label: 'GiB', value: 'Gi' },
      { label: '%', value: '%' },
    ]
  }

  get increaseUnit() {
    const { fakeIncrease } = this.state
    const unitOption = this.increaseOptions.filter(option =>
      fakeIncrease.endsWith(option.value)
    )
    return unitOption[0].value ?? '%'
  }

  enable = () => {
    const { resize } = this.state
    this.setState({
      resize: {
        ...resize,
        enabled: !resize.enabled,
      },
    })
  }

  NumberEndDot = num => {
    const getNumber = /^[0-9]+(\.[0-9]{0,})?/g.exec(num) ?? []
    return endsWith(getNumber[0], '.') ? num.split('.').join('') : num
  }

  handleOk = () => {
    this.formRef.current.validate(() => {
      const { resize, restart } = this.state
      const object = { resize, restart }
      const labels = Object.entries(object).map(([k, v]) => {
        const newItem = {}
        Object.entries(v).forEach(([type, value]) => {
          const data = isBoolean(value)
            ? JSON.stringify(value)
            : this.NumberEndDot(value)
          set(newItem, `annotations['${k}.kubesphere.io/${type}']`, data)
        })
        return newItem.annotations
      })

      this.props.onOk({
        ...labels[0],
        ...labels[1],
        'restart.kubesphere.io/online-expansion-support': `${!restart.enabled}`,
      })
    })
  }

  getMarks() {
    const max = sliderSettings.max
    const unit = sliderSettings.unit
    const count = 6
    return range(count).reduce((marks, index) => {
      const value = (max * index) / (count - 1)
      const mark = value === 0 ? '0' : `${Math.floor(value)}${unit}`
      return { ...marks, [value]: mark }
    }, {})
  }

  handleLimitChange = val => {
    const { resize } = this.state
    const { unit } = sliderSettings
    const value = /^[0-9]+(\.[0-9]{0,})?/g.test(val)
      ? `${trim(val)}${unit}`
      : '10000Gi'
    this.setState({
      resize: {
        ...resize,
        'storage-limit': value,
      },
      fakeLimit: val,
    })
  }

  handleThreshold = val => {
    const { resize } = this.state
    const value = val === '%' ? '10%' : val
    this.setState({
      resize: {
        ...resize,
        threshold: value,
      },
      fakeThreshold: val,
    })
  }

  handleIncrease = val => {
    const { resize } = this.state
    const value = val === 'Gi' ? '10Gi' : val
    this.setState({
      resize: {
        ...resize,
        increase: value,
      },
      fakeIncrease: val,
    })
  }

  handleMaxTime = time => {
    const { restart } = this.state
    if (!/^[0-9]*$/g.test(time)) {
      return
    }
    this.setState({
      restart: {
        ...restart,
        'max-time': time === '' ? '300' : `${trim(time)}`,
      },
      fakeMaxTime: trim(time),
    })
  }

  restartEnable = () => {
    const { restart } = this.state
    this.setState({
      restart: {
        ...restart,
        enabled: !restart.enabled,
      },
    })
  }

  renderMaxTime = () => {
    const { fakeMaxTime } = this.state
    return (
      <>
        <Alert
          type="warning"
          message={t('RESTART_WORKLOAD_AUTOMATICALLY_TIP')}
        />
        <div className={styles.settings}>
          <Form.Item label={t('TIMEOUT_PERIOD_S')}>
            <NumberInput
              onChange={this.handleMaxTime}
              value={fakeMaxTime}
              min={0}
            ></NumberInput>
          </Form.Item>
        </div>
      </>
    )
  }

  render() {
    const { visible, onCancel, formData, isSubmitting } = this.props
    const {
      resize,
      restart,
      fakeThreshold,
      fakeIncrease,
      fakeLimit: limit,
    } = this.state
    const { enabled } = resize
    const { enabled: resTartEnable } = restart
    const marks = this.getMarks()
    const limitStr = /[0-9]+/g.exec(limit)?.[0]
    const storageLimit = limitStr ? parseInt(limitStr, 10) : ''
    const increase = /[0-9]+/g.test(fakeIncrease)
      ? fakeIncrease.endsWith('%')
        ? fakeIncrease.slice(0, -1)
        : fakeIncrease.slice(0, -2)
      : ''
    const threshold =
      fakeIncrease !== '' ? fakeThreshold.slice(0, -1) : fakeIncrease
    return (
      <Modal
        width={960}
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        title={t('SET_AUTO_EXPANSION')}
        okText={t('OK')}
        cancelText={t('CANCEL')}
        isSubmitting={isSubmitting}
      >
        <Form formData={formData} ref={this.formRef}>
          <Form.Item>
            <div className={styles.wrapper}>
              <Text
                className={styles.text}
                icon={() => (
                  <img
                    src="/assets/autoscaling.svg"
                    style={{ width: '32px', marginRight: '16px' }}
                  />
                )}
                title={t('AUTO_EXPANSION')}
                description={t('AUTO_EXPANSION_DESC')}
              />
              <Switch
                className={styles.switch}
                text={enabled ? t('ENABLED') : t('DISABLED')}
                checked={enabled}
                onChange={this.enable}
              />
            </div>
          </Form.Item>
          <div className={styles.settings}>
            <div className={styles.title}>{t('AUTO_EXPANSION_SETTINGS')}</div>
            <div className={styles.container}>
              <div className={styles.limit}>
                <Form.Item label={t('MAXIMUM_SIZE')}>
                  <Slider
                    size={storageLimit}
                    max={sliderSettings.max}
                    min={sliderSettings.min}
                    marks={marks}
                    unit={sliderSettings.unit}
                    onChange={this.handleLimitChange}
                  ></Slider>
                </Form.Item>
              </div>
              <Columns>
                <Column>
                  <Form.Item>
                    <TailItemInput
                      title={t('THRESHOLD')}
                      unit={'%'}
                      max={100}
                      value={threshold}
                      onChange={this.handleThreshold}
                    />
                  </Form.Item>
                </Column>
                <Column>
                  <Form.Item desc={t('INCREMENT_DESC')}>
                    <TailItemInput
                      title={t('INCREMENT')}
                      value={increase}
                      unit={'Gi'}
                      onChange={this.handleIncrease}
                    />
                  </Form.Item>
                </Column>
              </Columns>
            </div>
            <div className={styles.group}>
              <div className={styles.container}>
                <div className={styles.checkItem}>
                  <Checkbox
                    checked={resTartEnable}
                    onChange={this.restartEnable}
                  ></Checkbox>
                  <div className={styles.text}>
                    <span className={styles.title}>
                      {t('RESTART_WORKLOAD_AUTOMATICALLY')}
                    </span>
                    <span className={styles.des}>
                      {t('RESTART_WORKLOAD_AUTOMATICALLY_DESC')}
                    </span>
                  </div>
                </div>
                {resTartEnable && this.renderMaxTime()}
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    )
  }
}
