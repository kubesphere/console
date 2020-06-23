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

import { get } from 'lodash'
import React, { Component } from 'react'
import { toJS, reaction } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Loading } from '@pitrix/lego-ui'
import { Button, Panel, Text, Notify, CodeEditor } from 'components/Base'
import { copyToClipboard } from 'utils/dom'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class Initializing extends Component {
  websocket = this.props.rootStore.websocket

  get editOptions() {
    return {
      width: '100%',
      height: '100%',
      readOnly: true,
    }
  }

  componentDidMount() {
    const { name, conditions } = this.props.store.detail
    if (get(conditions, 'Initialized.status') === 'True') {
      this.props.store.fetchAgent({ cluster: name })
    }

    this.initWebsocket()
  }

  componentWillUnmount() {
    this.websocket.close()
    this.disposer && this.disposer()
  }

  initWebsocket = () => {
    const { store } = this.props
    const url = store.getWatchUrl(store.detail)
    if (url) {
      this.websocket.watch(url)

      this.disposer = reaction(
        () => this.websocket.message,
        message => {
          if (message.type === 'MODIFIED') {
            store.fetchDetail(store.detail)
          }
        }
      )
    }
  }

  handleCopy = () => {
    copyToClipboard(toJS(this.props.store.agent))
    Notify.success({ content: t('Copy successful') })
  }

  render() {
    const { detail, isAgentLoading, agent } = this.props.store
    const { conditions, connectionType } = detail

    if (get(conditions, 'Initialized.status') === 'False') {
      return (
        <Panel>
          <div className={styles.title}>
            <Loading size={28} />
            <Text
              title={t('Cluster initialized failed')}
              description={get(conditions, 'Initialized.reason')}
            />
          </div>
        </Panel>
      )
    }

    return (
      <Panel className={styles.wrapper}>
        <div className={styles.title}>
          <Loading size={28} />
          <Text
            title={t.html('Waiting for the cluster to join')}
            description={t.html('CLUSTER_WAITING_JOIN_DESC')}
          />
        </div>
        {connectionType === 'proxy' && (
          <div className={styles.content}>
            <div className={styles.card}>
              <Text
                title={t.html('CLUSTER_AGENT_TIP_1')}
                description={t.html('CLUSTER_AGENT_TIP_1_DESC')}
              />
            </div>
            <div className={styles.card}>
              <Text
                className="margin-b12"
                title={t.html('CLUSTER_AGENT_TIP_2')}
                description={t.html('CLUSTER_AGENT_TIP_2_DESC')}
              />
              <Button className={styles.copy} onClick={this.handleCopy}>
                {t('Click to Copy')}
              </Button>
              <Loading spinning={isAgentLoading}>
                {agent ? (
                  <CodeEditor
                    mode="yaml"
                    className={styles.editor}
                    options={this.editOptions}
                    value={agent}
                  />
                ) : null}
              </Loading>
            </div>
            <div className={styles.card}>
              <Text
                title={t.html('CLUSTER_AGENT_TIP_3')}
                description={t.html('CLUSTER_AGENT_TIP_3_DESC')}
              />
            </div>
          </div>
        )}
      </Panel>
    )
  }
}
