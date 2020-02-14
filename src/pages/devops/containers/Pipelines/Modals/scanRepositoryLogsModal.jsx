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
import { Icon } from '@pitrix/lego-ui'
import { observer } from 'mobx-react'
import { Modal, Button, Notify } from 'components/Base'

import styles from './scanModal.scss'

@observer
export default class ScanReponsitoryLogs extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    branches: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  static defaultProps = {
    branches: [],
    visible: false,
    onOk() {},
    onCancel() {},
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      const { params } = this.props.visible
      this.props.store.getRepoScanLogs(params)
    }
  }

  get startBy() {
    const { reponsitorylog } = this.props.store
    const arr = reponsitorylog.split('\n')
    if (arr[0] && arr[0].startsWith('Started by user ')) {
      return arr[0].slice(15)
    }
  }

  handleFetch = async () => {
    const { params } = this.props
    await this.props.handleScanRepository()
    this.props.store.getRepoScanLogs(params)
    Notify.success({
      content: t('Scan Logs Success'),
    })
  }

  handleDownloadLogs = () => {
    const { reponsitorylog } = this.props.store

    this.props.store.saveAsFile(reponsitorylog, 'log.txt')
  }

  render() {
    const { visible, onCancel } = this.props
    const { reponsitorylog } = this.props.store

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
            {`${t('Started By')}: ${this.startBy}`}
            <Button onClick={this.handleDownloadLogs}>
              {t('Download Logs')}
            </Button>
            <Button onClick={this.handleFetch}>{t('Rescan')}</Button>
          </div>
          <pre className={styles.pre}>{reponsitorylog}</pre>
        </div>
      </Modal>
    )
  }
}
