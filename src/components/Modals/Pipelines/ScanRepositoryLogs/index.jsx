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
import { Icon, Button, Notify } from '@kube-design/components'
import { observer } from 'mobx-react'
import { get, isEmpty } from 'lodash'
import { Modal } from 'components/Base'

import styles from './index.scss'

@observer
export default class ScanRepositoryLogs extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    branches: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.refresh = setInterval(() => {
      this.refreshHandler()
    }, 4000)
  }

  static defaultProps = {
    branches: [],
    visible: false,
    onOk() {},
    onCancel() {},
  }

  componentDidMount() {
    const { params } = this.props
    this.props.store.getRepoScanLogs(params)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      const { params } = this.props
      this.props.store.getRepoScanLogs(params)
    }
  }

  componentWillUnmount() {
    clearInterval(this.refresh)
  }

  refreshHandler = () => {
    const { repositoryLog } = this.props.store
    const arr = repositoryLog.split('\n')
    let isDone = false

    for (let i = arr.length - 1; i >= 0; i--) {
      if (!isEmpty(arr[i]) && arr[i].indexOf('Finished') > -1) {
        isDone = true
        return
      }
    }
    if (isDone) {
      clearInterval(this.refresh)
      this.refresh = null
    } else {
      const { params } = this.props
      this.props.store.getRepoScanLogs(params)
    }
  }

  get startBy() {
    const { repositoryLog } = this.props.store
    const arr = repositoryLog.split('\n')
    const firstLine = get(arr, '[0]', '')
    const parser = firstLine.match(/^Started by (user )?(.*)?/) || []
    const isUser = parser[1]
    const name = parser[2]

    if (firstLine && isUser) {
      return `${t('Started By')}: ${name}`
    }

    if (firstLine && !isUser) {
      return t('Started By {name}', { name: t(name) })
    }

    return `${t('Started By')}: -`
  }

  handleFetch = async () => {
    const { params } = this.props
    await this.props.handleScanRepository()
    await this.props.store.getRepoScanLogs(params)

    Notify.success({
      content: t('Logs Scanned Successfully'),
    })
  }

  handleDownloadLogs = () => {
    const { repositoryLog } = this.props.store

    this.props.store.saveAsFile(repositoryLog, 'log.txt')
  }

  render() {
    const { visible, onCancel } = this.props
    const { repositoryLog } = this.props.store

    return (
      <Modal
        width={1160}
        onCancel={onCancel}
        visible={visible}
        closable={false}
        title={t('Scan Reponsitory Logs')}
      >
        <div className={styles.content}>
          <div className={styles.btn_group}>
            <Icon name="human" size={20} />
            {this.startBy}
            <Button onClick={this.handleDownloadLogs}>
              {t('Download Logs')}
            </Button>
            <Button onClick={this.handleFetch}>{t('Rescan')}</Button>
          </div>
          <pre className={styles.pre}>{repositoryLog}</pre>
        </div>
      </Modal>
    )
  }
}
