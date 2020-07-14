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
import classnames from 'classnames'
import { isEmpty, get } from 'lodash'

import { Buttons, Icon } from '@pitrix/lego-ui'
import { Button } from 'components/Base'

import ProbeForm from '../ProbeForm'

import styles from './index.scss'

export default class ProbeInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    onShowForm: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    value: {},
    onChange() {},
    onShowForm() {},
  }

  state = {
    showForm: false,
  }

  getProbeTypeText = value => {
    if ('httpGet' in value) {
      return 'HTTP Request Check'
    }

    if ('tcpSocket' in value) {
      return 'TCP Port Check'
    }

    return 'Exec Command Check'
  }

  showForm = () => {
    this.setState({ showForm: true })
  }

  hideForm = () => {
    this.setState({ showForm: false })
  }

  handleForm = data => {
    const { onChange } = this.props
    onChange(data)
    this.hideForm()
  }

  handleDelete = () => {
    const { onChange } = this.props
    onChange({})
  }

  renderProbeInfo() {
    const { value } = this.props

    if ('httpGet' in value) {
      return (
        <>
          <div>
            <strong>{get(value, 'httpGet.scheme', '')}</strong>
            <p>{t('Type')}</p>
          </div>
          <div>
            <strong>{get(value, 'httpGet.path', '')}</strong>
            <p>{t('Path')}</p>
          </div>
          <div>
            <strong>{get(value, 'httpGet.port', '')}</strong>
            <p>{t('Port')}</p>
          </div>
        </>
      )
    }

    if ('tcpSocket' in value) {
      return (
        <div>
          <strong>{get(value, 'tcpSocket.port', '')}</strong>
          <p>{t('Port')}</p>
        </div>
      )
    }

    if ('exec' in value) {
      const commands = get(value, 'exec.command', [])
      return (
        <div>
          <strong>
            {commands[0]}
            {commands.length > 1 && ' ...'}
          </strong>
          <p>{t('Command')}</p>
        </div>
      )
    }

    return null
  }

  renderProbeForm() {
    const { probType, value } = this.props
    return (
      <ProbeForm
        className={styles.form}
        data={value}
        probType={probType}
        onSave={this.handleForm}
        onCancel={this.hideForm}
      />
    )
  }

  render() {
    const { type, description, value } = this.props
    const { showForm } = this.state

    if (showForm) {
      return <div className={styles.probe}>{this.renderProbeForm()}</div>
    }

    if (isEmpty(value)) {
      return (
        <div className={classnames(styles.empty)} onClick={this.showForm}>
          <div>{`${t('Add ')}${type}`}</div>
          <p className="text-secondary">{description}</p>
        </div>
      )
    }

    return (
      <div className={styles.probe}>
        <div className={styles.content}>
          <Icon name="monitor" size={40} />
          <div>
            <strong>{t(this.getProbeTypeText(value))}</strong>
            <p>
              <span>
                {t('Initial Delay')}: {`${value.initialDelaySeconds || 0}s`}
              </span>
              &nbsp;&nbsp;
              <span>
                {t('Timeout')}: {`${value.timeoutSeconds || 0}s`}
              </span>
            </p>
          </div>
          {this.renderProbeInfo()}
        </div>
        <Buttons>
          <Button type="flat" icon="trash" onClick={this.handleDelete} />
          <Button type="flat" icon="pen" onClick={this.showForm} />
        </Buttons>
      </div>
    )
  }
}
