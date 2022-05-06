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

import { Button, Icon } from '@kube-design/components'

import ProbeForm from '../ProbeForm'

import styles from './index.scss'

export default class ProbeInput extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    onShowForm: PropTypes.func,
    deleteNoObject: PropTypes.bool,
  }

  static defaultProps = {
    name: '',
    label: '',
    value: {},
    onChange() {},
    onShowForm() {},
    componentType: 'heal',
    deleteNoObject: false,
  }

  state = {
    showForm: false,
  }

  getProbeTypeText = value => {
    if ('httpGet' in value) {
      return `HTTP_REQUEST`
    }

    if ('tcpSocket' in value) {
      return `TCP_PORT`
    }

    return `COMMAND`
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
    const { onChange, deleteNoObject } = this.props
    deleteNoObject ? onChange() : onChange({})
  }

  renderProbeInfo() {
    const { value } = this.props

    if ('httpGet' in value) {
      return (
        <>
          <div>
            <strong>{get(value, 'httpGet.scheme', '')}</strong>
            <p>{t('TYPE')}</p>
          </div>
          <div>
            <strong>{get(value, 'httpGet.path', '')}</strong>
            <p>{t('PATH')}</p>
          </div>
          <div>
            <strong>{get(value, 'httpGet.port', '')}</strong>
            <p>{t('PORT')}</p>
          </div>
        </>
      )
    }

    if ('tcpSocket' in value) {
      return (
        <div>
          <strong>{get(value, 'tcpSocket.port', '')}</strong>
          <p>{t('PORT')}</p>
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
          <p>{t('COMMANDS')}</p>
        </div>
      )
    }

    return null
  }

  renderProbeForm() {
    const { probType, value, componentType } = this.props

    return (
      <ProbeForm
        className={styles.form}
        data={value}
        probType={probType}
        onSave={this.handleForm}
        onCancel={this.hideForm}
        componentType={componentType}
      />
    )
  }

  render() {
    const { description, value, componentType, label } = this.props
    const { showForm } = this.state

    if (showForm) {
      return <div className={styles.probe}>{this.renderProbeForm()}</div>
    }

    if (isEmpty(value)) {
      return (
        <div className={classnames(styles.empty)} onClick={this.showForm}>
          <div>{label || t('ADD_PROBE')}</div>
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
            {componentType === 'heal' && (
              <p>
                <span>
                  {t('INITIAL_DELAY_TIMEOUT_VALUE', {
                    delay: value.initialDelaySeconds || 0,
                    timeout: value.timeoutSeconds || 0,
                  })}
                </span>
              </p>
            )}
          </div>
          {this.renderProbeInfo()}
        </div>
        <div className="buttons">
          <Button type="flat" icon="trash" onClick={this.handleDelete} />
          <Button type="flat" icon="pen" onClick={this.showForm} />
        </div>
      </div>
    )
  }
}
