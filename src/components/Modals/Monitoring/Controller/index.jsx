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

import { Controller as Base } from 'components/Cards/Monitoring'
import { Button, Icon, Loading } from '@kube-design/components'
import { Modal } from 'components/Base'
import { get } from 'lodash'
import { stopAutoRefresh } from 'utils/monitoring'

import styles from './index.scss'

export default class MonitoringModalController extends Base {
  static propTypes = {
    ...Base.propTypes,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    ...Base.defaultProps,
    times: 100,
    step: '5m',
    onCancel() {},
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && this.props.visible !== prevProps.visible) {
      this.initParams(this.props)
      this.props.onFetch(this.params)
    }
  }

  componentDidMount() {
    if (this.props.visible) {
      this.props.onFetch(this.params)
    }
  }

  init() {
    this.initParams(this.props)
  }

  handleChange = data => {
    const updateMonitorOptions = get(this.props, 'updateMonitorOptions', false)
    this.params = data
    updateMonitorOptions && this.props.updateMonitorOptions(data)

    const enableAutoRefresh =
      !data.start && !data.end && this.props.enableAutoRefresh
    this.setState({ enableAutoRefresh, autoRefresh: false }, () => {
      stopAutoRefresh(this)
      this.fetchData()
    })
  }

  renderCustomActions() {
    const { onCancel } = this.props

    return (
      <Button className={styles.button} onClick={onCancel}>
        <Icon type="light" name="close" size={20} />
      </Button>
    )
  }

  renderHeader() {
    const { icon, title } = this.props

    return (
      <div className={styles.header}>
        <div className={styles.title}>
          <Icon name={icon || 'monitor'} size={16} />
          {title || t('MONITORING')}
        </div>
        {this.renderOperations()}
      </div>
    )
  }

  renderContent() {
    const content = Base.prototype.renderContent.call(this)
    return <div className={styles.content}>{content}</div>
  }

  render() {
    const { loading, onFetch, ...rest } = this.props

    return (
      <Modal
        width={1162}
        bodyClassName={styles.body}
        icon="monitor"
        onOk={this.handleSubmit}
        hideHeader
        hideFooter
        fullScreen
        {...rest}
      >
        {this.renderHeader()}
        <Loading spinning={loading}>{this.renderContent()}</Loading>
      </Modal>
    )
  }
}
