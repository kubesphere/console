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
import {
  Button,
  Icon,
  Menu,
  Loading,
  Notify,
  Dropdown,
} from '@kube-design/components'
import { Panel, Text, CodeEditor } from 'components/Base'
import { copyToClipboard } from 'utils/dom'
import { trigger } from 'utils/action'
import KubeKeyClusterStore from 'stores/cluster/kubekey'

import KubeKeyCluster from './KubeKeyCluster'

import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
export default class Initializing extends Component {
  kubekeyClusterStore = new KubeKeyClusterStore()

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
    const { store, match } = this.props
    const url = store.getWatchUrl({ name: match.params.cluster })
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
    Notify.success({ content: t('COPY_SUCCESSFUL') })
  }

  showEditYAML = () => {
    const store = this.kubekeyClusterStore
    this.trigger('resource.yaml.edit', {
      store,
      detail: toJS(store.detail),
    })
  }

  rerun = () => {
    this.kubekeyClusterStore.patch(this.kubekeyClusterStore.detail, {
      spec: {
        rerunTrigger: new Date().getTime(),
      },
    })
  }

  handleMenuClick = (e, key) => {
    switch (key) {
      case 'edit-yaml':
        this.showEditYAML()
        break
      case 'rerun':
        this.rerun()
        break
      default:
    }
  }

  renderMenu() {
    return (
      <Menu onClick={this.handleMenuClick}>
        <Menu.MenuItem key="edit-yaml">
          <Icon name="pen" /> {t('EDIT_YAML')}
        </Menu.MenuItem>
        <Menu.MenuItem key="rerun">
          <Icon name="refresh" /> {t('RERUN')}
        </Menu.MenuItem>
      </Menu>
    )
  }

  render() {
    const { detail, isAgentLoading, agent } = this.props.store
    const { kkName, conditions, connectionType } = detail

    if (get(conditions, 'Initialized.status') === 'False') {
      return (
        <Panel>
          <div className={styles.title}>
            <Loading size={28} />
            <Text
              title={t('CLUSTER_INIT_FAILED')}
              description={get(conditions, 'Initialized.reason')}
            />
          </div>
        </Panel>
      )
    }

    if (kkName) {
      return (
        <Panel className={styles.wrapper}>
          <div className={styles.title}>
            <Text
              icon="cluster"
              title={t('CREATING_CLUSTER')}
              description={t.html('CREATING_CLUSTER_DESC')}
            />
            <div className={styles.action}>
              <Dropdown
                theme="dark"
                content={this.renderMenu()}
                placement="bottomRight"
              >
                <Button type="flat" icon="more" />
              </Dropdown>
            </div>
          </div>
          <KubeKeyCluster name={kkName} store={this.kubekeyClusterStore} />
        </Panel>
      )
    }

    return (
      <Panel className={styles.wrapper}>
        <div className={styles.title}>
          <Loading size={28} />
          <Text
            title={t('WAIT_FOR_CLUSTER')}
            description={t('WAIT_FOR_CLUSTER_DESC')}
          />
        </div>
        {connectionType === 'proxy' && (
          <div className={styles.content}>
            <div className={styles.card}>
              <Text title={t.html('CLUSTER_AGENT_TIP_1')} />
            </div>
            <div className={styles.card}>
              <Text
                className="margin-b12"
                title={t.html('CLUSTER_AGENT_TIP_2')}
              />
              <Button className={styles.copy} onClick={this.handleCopy}>
                {t('COPY')}
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
        {kkName && <KubeKeyCluster name={kkName} />}
      </Panel>
    )
  }
}
