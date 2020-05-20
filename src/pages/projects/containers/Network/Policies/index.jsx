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
import { inject } from 'mobx-react'
import { get, set } from 'lodash'
import Banner from 'components/Cards/Banner'
import { Button, Panel } from 'components/Base'
import EmptyList from 'components/Cards/EmptyList'
import { ICON_TYPES } from 'utils/constants'
import RuleInfo from './RuleInfo'
import IsolateInfo from './IsolateInfo'
import styles from './index.scss'

@inject('projectStore')
export default class Policies extends React.Component {
  name = 'Network Policy'
  module = 'namespacenetworkpolicies'
  tips = [
    {
      title: t('NETWORK_POLICY_Q'),
      description: t('NETWORK_POLICY_A'),
    },
    {
      title: t('NETWORK_POLICY_Q1'),
      description: t('NETWORK_POLICY_A1'),
    },
  ]

  constructor(props) {
    super(props)
    this.projectStore = this.props.projectStore
  }

  get params() {
    return get(this.props.match, 'params', {})
  }

  get namespace() {
    return get(this.params, 'namespace')
  }

  get workspace() {
    return get(this.projectStore, 'detail.workspace', '')
  }

  get cluster() {
    return get(this.params, 'cluster')
  }

  toggleNetworkIsolate = (flag = true) => {
    const data = {}
    set(
      data,
      'metadata.annotations["kubesphere.io/network-isolate"]',
      flag ? 'true' : 'false'
    )
    this.projectStore.patch({ name: this.namespace }, data).then(() => {
      this.projectStore.fetchDetail(this.params)
    })
  }

  handleEditNetworkIsolate = flag => {
    this.toggleNetworkIsolate(flag)
  }

  render() {
    const { module, name, tips, namespace, cluster, workspace } = this
    const networkIsolate =
      get(
        this.projectStore,
        'detail.annotations["kubesphere.io/network-isolate"]'
      ) === 'true'

    return (
      <div>
        <Banner
          module={module}
          className="margin-b12"
          title={t(name)}
          tips={tips}
          description={t(`${name.replace(/\s+/g, '_').toUpperCase()}_DESC`)}
        />
        <div className={styles.subtitle}>{t(name)}</div>
        {!networkIsolate ? (
          <EmptyList
            icon={ICON_TYPES[module]}
            title={t('NETWORK_POLICY_EMP_TITLE')}
            desc={t('NETWORK_POLICY_EMP_DESC')}
            actions={
              <Button
                className={styles.onBtn}
                onClick={() => this.toggleNetworkIsolate()}
              >
                {t('On')}
              </Button>
            }
          />
        ) : (
          <Panel className={styles.wrapper}>
            <IsolateInfo
              module={module}
              networkIsolate={networkIsolate}
              onEdit={this.handleEditNetworkIsolate}
            />
            <RuleInfo
              module={module}
              namespace={namespace}
              cluster={cluster}
              workspace={workspace}
            />
          </Panel>
        )}
      </div>
    )
  }
}
