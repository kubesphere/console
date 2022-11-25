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
import { saveAs } from 'file-saver'

import { Button, Icon, Notify } from '@kube-design/components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Modal, CodeEditor } from 'components/Base'

import styles from './index.scss'

export default class KubeConfigModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    data: PropTypes.string,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    data: '',
    onCancel() {},
  }

  handleCopy = () => {
    Notify.success({
      content: t('COPIED_SUCCESSFUL'),
    })
  }

  handleDownload = () => {
    const text = this.props.data
    const fileName = 'kubeconfig.yaml'
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, fileName)
  }

  render() {
    const { data, onCancel, onOk, ...rest } = this.props

    const options = { readOnly: true, height: 500 }

    return (
      <Modal
        headerClassName={styles.header}
        bodyClassName={styles.body}
        width={756}
        hideFooter
        hideHeader
        onCancel={onCancel}
        {...rest}
      >
        <div className={styles.header}>
          <Icon name="coding" size={40} />
          <div className={styles.title}>{'kubeconfig'}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.topbar}>
            <Button icon="download" ghost onClick={this.handleDownload}>
              {t('DOWNLOAD')}
            </Button>
          </div>
          <div className={styles.editor}>
            <CodeEditor
              className={styles.codeEditor}
              value={data}
              options={options}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <Button type="default" onClick={onCancel}>
            {t('CANCEL')}
          </Button>
          <CopyToClipboard text={data} onCopy={this.handleCopy}>
            <Button type="control">{t('COPY')}</Button>
          </CopyToClipboard>
        </div>
      </Modal>
    )
  }
}
