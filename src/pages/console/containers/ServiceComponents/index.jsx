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
import { isEmpty } from 'lodash'

import ComponentStore from 'stores/component'

import { RadioGroup, RadioButton, Tag, Loading } from '@pitrix/lego-ui'
import Card from './Card'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class ServiceComponents extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      type: 'kubesphere',
    }

    this.configs = this.getConfigs()
    this.store = new ComponentStore()
    this.store.fetchList()
  }

  get prefix() {
    return this.props.match.url
  }

  getColor = healthy => (healthy ? '#f5a623' : '#55bc8a')

  getCount = type => {
    const exceptionCount = this.store.exceptionCount
    const healthyCount = this.store.healthyCount

    return exceptionCount[type] || healthyCount[type] || 0
  }

  getConfigs = () => [
    {
      type: 'kubesphere',
      title: 'KubeSphere',
      icon: '/assets/kubesphere.svg',
    },
    {
      type: 'kubernetes',
      title: 'Kubernetes',
      icon: '/assets/kubernetes.svg',
    },
    {
      type: 'openpitrix',
      title: 'OpenPitrix',
      icon: '/assets/openpitrix.svg',
      disabled: !globals.app.hasKSModule('openpitrix'),
    },
    {
      type: 'istio',
      title: 'Istio',
      icon: '/assets/istio.svg',
      disabled: !globals.app.hasKSModule('servicemesh'),
    },
    {
      type: 'monitoring',
      title: 'Monitoring',
      icon: '/assets/monitoring.svg',
      disabled: !globals.app.hasKSModule('monitoring'),
    },
    {
      type: 'logging',
      title: 'Logging',
      icon: '/assets/logging.svg',
      disabled: !globals.app.hasKSModule('logging'),
    },
    {
      type: 'devops',
      title: 'DevOps',
      icon: '/assets/dev-ops.svg',
      disabled: !globals.app.hasKSModule('devops'),
    },
  ]

  handleTypeChange = type => {
    this.setState({ type })
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          <img className={styles.leftIcon} src="/assets/noicon.svg" alt="" />
          <img
            className={styles.rightIcon}
            src="/assets/banner-icon-2.svg"
            alt=""
          />
          <div className="h4">{t('Service Components')}</div>
          <p>{t('SERVICE_COMPONENTS_DESC')}</p>
        </div>
        <div className={styles.toolbar}>{this.renderBar()}</div>
      </div>
    )
  }

  renderBar() {
    const exceptionCount = this.store.exceptionCount

    return (
      <div className="inline-block">
        <RadioGroup
          wrapClassName="radio-default"
          value={this.state.type}
          onChange={this.handleTypeChange}
          size="small"
        >
          {this.configs
            .filter(item => !item.disabled)
            .map(({ type, title }) => (
              <RadioButton key={type} value={type}>
                {title}
                <Tag color={this.getColor(exceptionCount[type])}>
                  {this.getCount(type)}
                </Tag>
              </RadioButton>
            ))}
        </RadioGroup>
      </div>
    )
  }

  renderCards(data) {
    return (
      <div className={styles.cards}>
        {data.map(item => (
          <Card key={item.name} component={item} />
        ))}
      </div>
    )
  }

  renderComponents(type) {
    const { data } = this.store.list
    const config = this.configs.find(item => item.type === type) || {}
    const components = data[type]

    if (isEmpty(components)) {
      return null
    }

    return (
      <div className={styles.cardsWrapper}>
        <div className={styles.cardTitle}>
          <img src={config.icon} alt={config.title} />
        </div>
        {this.renderCards(components)}
      </div>
    )
  }

  renderList() {
    const { isLoading } = this.store.list
    const { type } = this.state

    if (isLoading) {
      return (
        <div className="loading">
          <Loading />
        </div>
      )
    }

    return this.renderComponents(type)
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderHeader()}
        {this.renderList()}
      </div>
    )
  }
}
