import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { DatePicker, Select } from '@pitrix/lego-ui'
import { Button, Form, Notify } from 'components/Base'

import { getMinutes, getTimeOptions } from '../utils'

import styles from './index.scss'

const TimeOps = ['1m', '2m', '5m', '10m', '15m', '30m', '1h', '2h', '5h']

export default class CustomRange extends React.Component {
  static propTypes = {
    showStep: PropTypes.bool,
    step: PropTypes.string,
    times: PropTypes.number,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    showStep: true,
    step: '10m',
    times: 30,
    onSubmit() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    const now = new Date()
    const start = new Date(now.valueOf() - 3600000)

    this.formData = {
      step: props.step,
      start: props.start ? [props.start] : [start],
      end: props.end ? [props.end] : [now],
    }
  }

  handlerStartDateClose = this.handlerDateClose('start')

  handlerEndDateClose = this.handlerDateClose('end')

  handlerDateClose(name) {
    return time => {
      this.formData[name] = time
      this.forceUpdate()
    }
  }

  handleOk = () => {
    const { step, start, end } = this.formData
    const startTime = start[0].valueOf() / 1000
    const endTime = end[0].valueOf() / 1000
    const interval = endTime - startTime

    if (interval > 0) {
      const times = Math.floor(interval / (getMinutes(step) * 60))
      const data = { step, times, start: startTime, end: endTime, lastTime: '' }
      this.props.onSubmit(data)
    } else {
      Notify.error({ content: t('TIMERANGE_SELECTOR_MSG') })
    }
  }

  render() {
    const { onCancel, className } = this.props
    const { start, end } = this.formData

    return (
      <div className={classnames(styles.custom, className)}>
        <div className={styles.title}>{t('Custom time range')}</div>
        <Form data={this.formData}>
          <Form.Item label={t('Start Time')}>
            <DatePicker
              name="start"
              defaultDate={start[0]}
              maxDate={end[0]}
              enableTime
              enableSeconds
              dateFormat={'Y-m-d H:i:S'}
              onClose={this.handlerStartDateClose}
            />
          </Form.Item>
          <Form.Item label={t('End Time')}>
            <DatePicker
              name="end"
              defaultDate={end[0]}
              maxDate={end[0]}
              enableTime
              enableSeconds
              dateFormat={'Y-m-d H:i:S'}
              onClose={this.handlerEndDateClose}
            />
          </Form.Item>
          {this.props.showStep && (
            <Form.Item label={t('Time Interval')}>
              <Select
                className={styles.selectBox}
                defaultValue="1m"
                name="step"
                options={getTimeOptions(TimeOps)}
              />
            </Form.Item>
          )}
          <div className={styles.actions}>
            <Button onClick={onCancel}>{t('Cancel')}</Button>
            <Button type="control" onClick={this.handleOk}>
              {t('OK')}
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
