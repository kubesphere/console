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
import classnames from 'classnames'
import { inject } from 'mobx-react'

import { Status, Image } from 'components/Base'
import { getLocalTime } from 'utils'

import ProjectStore from 'stores/project'

import styles from './index.scss'

@inject('rootStore')
export default class InstanceItem extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    detail: PropTypes.object,
    store: PropTypes.object,
    showVersion: PropTypes.bool,
  }

  static defaultProps = {
    detail: {},
    store: {},
    showVersion: false,
  }

  constructor(props) {
    super(props)
    this.store = this.props.store

    this.projectStore = new ProjectStore()
  }

  get routing() {
    return this.props.rootStore.routing
  }

  handleClick = async () => {
    const { detail } = this.props
    const { cluster } = detail
    const { cluster_id, zone, runtime_id } = cluster

    await this.projectStore.fetchDetail({
      cluster: runtime_id,
      namespace: zone,
    })

    const { workspace } = this.projectStore.detail

    const link = `/${workspace}/clusters/${runtime_id}/projects/${zone}/applications/template/${cluster_id}`

    this.routing.push(link)
  }

  renderContent() {
    const { detail, showVersion } = this.props
    const { cluster, version } = detail
    const { zone, runtime_id } = cluster

    return (
      <div className={styles.content}>
        <dl>
          <dt>
            <a onClick={this.handleClick}>{cluster.name}</a>
          </dt>
          <dd>{t('Instance Name')}</dd>
        </dl>
        {showVersion && (
          <dl>
            <dt>{version.name}</dt>
            <dd>{t('Version')}</dd>
          </dl>
        )}
        <dl>
          <dt>{zone}</dt>
          <dd>{t('In Project')}</dd>
        </dl>
        <dl>
          <dt>{runtime_id}</dt>
          <dd>{t('Cluster')}</dd>
        </dl>
        <dl>
          <dt>
            {getLocalTime(cluster.upgrade_time || cluster.create_time).format(
              'YYYY-MM-DD HH:mm:ss'
            )}
          </dt>
          <dd>{t('Updated Time')}</dd>
        </dl>
      </div>
    )
  }

  render() {
    const { className, detail } = this.props
    const { app, cluster } = detail

    return (
      <div className={classnames(styles.item, className)}>
        <div className={styles.itemMain} onClick={this.handleExpandExtra}>
          <div className={styles.iconOuter}>
            <label className={styles.icon}>
              <Image src={app.icon} iconLetter={cluster.name} iconSize={40} />
            </label>
            <Status className={styles.status} type={cluster.status} />
          </div>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
