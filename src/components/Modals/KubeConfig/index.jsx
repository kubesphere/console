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
import { observer } from 'mobx-react'
import classnames from 'classnames'

import { saveAs } from 'file-saver'
import fullScreen from 'components/Modals/FullscreenModal'
import UserTip from 'components/Cards/Tips'
import { Icon } from '@kube-design/components'
import { CodeEditor } from 'components/Base'
import { get } from 'lodash'
import TerminalStore from 'stores/terminal'

import styles from './index.scss'

@fullScreen
@observer
export default class KubeConfigModal extends React.Component {
  store = new TerminalStore()

  componentDidMount() {
    const params = get(this.props, 'match.params', {})
    this.store.fetchKubeConfig(params)
  }

  handleDownload = () => {
    const text = this.store.kubeconfig
    const fileName = 'kubeconfig.yaml'
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, fileName)
  }

  render() {
    return (
      <UserTip
        wrapperClassName={styles.kubectl}
        localStorageKey="kubectl-config"
        article={this.renderConfig()}
        tips={this.renderTips()}
        onToggle={this.onTipsToggle}
      />
    )
  }

  renderConfig() {
    const options = { readOnly: true }
    return (
      <div className={classnames(styles.pane, styles.terminal)}>
        <div className={styles.download} onClick={this.handleDownload}>
          <Icon name="download" size={20} type="light" />
          {t('DOWNLOAD')}
        </div>
        <CodeEditor value={this.store.kubeconfig} options={options} />
      </div>
    )
  }

  renderTips() {
    return (
      <div className={classnames('markdown-body', styles.tipWrapper)}>
        {t.html('KUBECONFIG_TIP')}
      </div>
    )
  }
}
