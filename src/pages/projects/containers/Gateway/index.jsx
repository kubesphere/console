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
import { observer, inject } from 'mobx-react'
import { trigger } from 'utils/action'
import Banner from 'components/Cards/Banner'

import GatewayCard from 'clusters/containers/Gateway/Components/GatewayCard'
import { Tooltip, Icon } from '@kube-design/components'
import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
export default class Getway extends React.Component {
  get cluster() {
    return this.props.match.params.cluster
  }

  get prefix() {
    return this.props.match.url
  }

  get enableActions() {
    return globals.app.getActions({
      module: 'project-settings',
      ...this.props.match.params,
      project: this.namespace,
    })
  }

  renderGatewayCard = () => {
    return (
      <>
        <div className={styles.title}>
          <span> {t('CLUSTER_GATEWAY')}</span>
          <Tooltip content={t('CLUSTER_GATEWAY_GUIDE_DESC')} placement="top">
            <Icon name="question" size={20} />
          </Tooltip>
        </div>
        <GatewayCard
          type="cluster"
          actions={this.enableActions}
          {...this.props}
        />
        <div className={styles.title}>{t('PROJECT_GATEWAY')}</div>
        <GatewayCard
          type="project"
          actions={this.enableActions}
          {...this.props}
          prefix={this.prefix}
        />
      </>
    )
  }

  render() {
    return (
      <>
        <Banner
          icon="loadbalancer"
          title={t('GATEWAY_SETTING')}
          description={t('GATEWAY_DESC')}
          tabs={this.tabs}
        />
        {this.renderGatewayCard()}
      </>
    )
  }
}
