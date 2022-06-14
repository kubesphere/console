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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { get, isEmpty } from 'lodash'
import { Columns, Column } from '@kube-design/components'

import { Panel, Image } from 'components/Base'
import ApplicationStore from 'stores/openpitrix/application'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class Applications extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ApplicationStore()
  }

  componentDidMount() {
    this.fetchData()
  }

  get routing() {
    return this.props.rootStore.routing
  }

  fetchData() {
    this.store.fetchList({
      ...this.props.match.params,
      limit: 3,
    })
  }

  handleClickApp = e => {
    const { app } = e.currentTarget.dataset
    const { workspace, cluster, namespace } = this.props.match.params
    this.routing.push(
      `/${workspace}/clusters/${cluster}/projects/${namespace}/applications/template/${app}`
    )
  }

  handleImageOnError = e => {
    if (e.target.src !== '/assets/default-app.svg') {
      e.target.src = '/assets/default-app.svg'
    }
  }

  renderExtras() {
    const { workspace, cluster, namespace } = this.props.match.params
    return (
      <Link
        className={styles.more}
        to={`/${workspace}/clusters/${cluster}/projects/${namespace}/applications/template`}
      >
        {t('VIEW_MORE')}
      </Link>
    )
  }

  render() {
    const { data } = toJS(this.store.list)

    if (isEmpty(data)) {
      return null
    }

    return (
      <Panel
        className={styles.apps}
        title={t('INSTALLED_APPS')}
        extras={this.renderExtras()}
      >
        <Columns className="is-variable is-1">
          {data.map(item => {
            const icon = get(item, 'app.icon')
            const appName = get(item, 'app.name')

            return (
              <Column key={item.cluster_id} className="is-4">
                <div
                  className={styles.app}
                  data-app={item.cluster_id}
                  onClick={this.handleClickApp}
                >
                  <label className={styles.icon}>
                    <Image
                      iconLetter={appName}
                      iconSize={40}
                      src={icon}
                      onError={this.handleImageOnError}
                    />
                  </label>
                  <div className={styles.title}>
                    <div>{item.name}</div>
                    <p title={item.description}>{item.description || '-'}</p>
                  </div>
                </div>
              </Column>
            )
          })}
        </Columns>
      </Panel>
    )
  }
}
