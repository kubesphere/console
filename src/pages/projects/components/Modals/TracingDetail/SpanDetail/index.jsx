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

import { isEmpty } from 'lodash'
import React from 'react'
import { Icon, RadioGroup, RadioButton } from '@kube-design/components'
import { Label } from 'components/Base'
import { formatDuration } from 'utils/tracing'

import styles from './index.scss'

const getValue = (type, value) => {
  switch (type) {
    case 'bool':
      return String(value)
    case 'string':
    case 'number':
      return value
    default:
      return JSON.stringify(value)
  }
}

const Properties = ({ data }) => (
  <ul className={styles.properties}>
    {data.map(item => (
      <li key={item.key}>
        <span>{item.key}: </span>
        <span>{getValue(item.type, item.value)}</span>
      </li>
    ))}
  </ul>
)

const Logs = ({ data, startTime }) => (
  <div>
    {data.map(item => {
      const start = formatDuration(item.timestamp - startTime)
      return (
        <div key={item.timestamp} classNames={styles.log}>
          <span>{start}</span>
          {item.fields.map(field => (
            <span className="margin-l12" key={field.key}>
              <span>{field.key}= </span>
              <span>
                <strong> {getValue(field.type, field.value)}</strong>
              </span>
            </span>
          ))}
        </div>
      )
    })}
  </div>
)

export default class SpanDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      type: 'tags',
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.span !== prevProps.span) {
      this.setState({ type: 'tags' })
    }
  }

  handleTypeChange = type => {
    this.setState({ type })
  }

  renderContentBody = () => {
    const { span } = this.props
    const { type } = this.state

    switch (type) {
      case 'tags':
        return <Properties data={span.tags} />
      case 'process':
        return <Properties data={span.process.tags} />
      case 'logs':
        return (
          <Logs
            data={span.logs}
            startTime={span.startTime - span.relativeStartTime}
          />
        )
      default:
    }

    return null
  }

  render() {
    const { span, onClose } = this.props
    const { type } = this.state

    const startTime = formatDuration(span.relativeStartTime)
    const duration = formatDuration(span.duration)
    const service = span.process.serviceName.split('.')[0]

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Icon name="target" size={40} />
          <div className={styles.text}>
            <div className={styles.name}>
              {span.process.serviceName}
              <Label name={t('SERVICE')} value={service} />
              <Label name={t('START_TIME')} value={startTime} />
              <Label name={t('DURATION')} value={duration} />
            </div>
            <p>{span.operationName}</p>
          </div>
          <div className={styles.close} onClick={onClose}>
            <Icon name="minimize" size={20} />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <RadioGroup
              mode="button"
              buttonWidth={155}
              value={type}
              onChange={this.handleTypeChange}
              size="small"
            >
              <RadioButton value="tags">{t('TAG')}</RadioButton>
              <RadioButton value="process">{t('PROCESS')}</RadioButton>
              {!isEmpty(span.logs) && (
                <RadioButton value="logs">{t('LOG')}</RadioButton>
              )}
            </RadioGroup>
          </div>
          <div className={styles.contentBody}>{this.renderContentBody()}</div>
        </div>
      </div>
    )
  }
}
