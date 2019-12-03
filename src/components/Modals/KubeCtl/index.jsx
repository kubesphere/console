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

import ContainerTerminal from 'components/Terminal'
import UserTip from 'components/Cards/Tips'
import TerminalStore from 'stores/terminal'
import fullScreen from 'components/Modals/fullscreenModal'

import styles from './index.scss'

@observer
class KubeCtlContainer extends React.Component {
  store = new TerminalStore()

  terminalRef = React.createRef()

  componentDidMount() {
    this.store.fetchKubeCtl()
  }

  onTipsToggle = () => {
    const { current } = this.terminalRef
    current && current.resizeTerminal()
  }

  render() {
    return (
      <UserTip
        wrapperClassName={styles.kubeCtl}
        onToggleTip={this.onTipsToggle}
        localStorageKey="kubectl-doc"
        article={this.renderTerminal()}
        tips={this.renderTips()}
        onToggle={this.onTipsToggle}
      />
    )
  }

  renderTips() {
    return (
      <div className={classnames('markdown-body', styles.doc)}>
        {t.html('KUBECTL_TIP')}
      </div>
    )
  }

  renderTerminal() {
    return (
      <div className={classnames(styles.pane, styles.terminal)}>
        <ContainerTerminal
          isLoading={this.store.kubectl.isLoading}
          url={this.store.kubeWebsocketUrl}
          ref={this.terminalRef}
        />
      </div>
    )
  }
}

const KsCtlModal = fullScreen(KubeCtlContainer)

/*
 * set default props for Modal
 */
export default props => (
  <KsCtlModal icon={'terminal'} title="kubectl" {...props} />
)
