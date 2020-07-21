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

import React, { Component } from 'react'

import { Icon } from '@pitrix/lego-ui'
import { Panel, Tag } from 'components/Base'
import { CLUSTER_PROVIDER_ICON, CLUSTER_GROUP_TAG_TYPE } from 'utils/constants'

import styles from './index.scss'

export default class ClusterSelect extends Component {
  state = {
    showOptions: false,
  }

  optionsRef = React.createRef()

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDOMClick)
  }

  handleDOMClick = e => {
    if (
      this.optionsRef &&
      this.optionsRef.current &&
      !this.optionsRef.current.contains(e.target)
    ) {
      this.setState({ showOptions: false })
    }
  }

  handleClick = value => {
    this.setState({ showOptions: false }, () => {
      const { onChange } = this.props
      onChange(value)
    })
  }

  toggleOptions = () => {
    this.setState(
      ({ showOptions }) => ({
        showOptions: !showOptions,
      }),
      () => {
        document.removeEventListener('click', this.handleDOMClick)
        if (this.state.showOptions) {
          document.addEventListener('click', this.handleDOMClick)
        }
      }
    )
  }

  renderValue(cluster) {
    const { extra } = this.props
    return (
      <div
        key={cluster.name}
        className={styles.option}
        onClick={this.toggleOptions}
      >
        <Icon
          name={CLUSTER_PROVIDER_ICON[cluster.provider] || 'kubernetes'}
          size={20}
          type="light"
        />
        <span className={styles.name}>{cluster.name}</span>
        {cluster.group && (
          <Tag key={cluster.name} type={CLUSTER_GROUP_TAG_TYPE[cluster.group]}>
            {t(`ENV_${cluster.group.toUpperCase()}`, {
              defaultValue: cluster.group,
            })}
          </Tag>
        )}
        {extra && extra(cluster)}
        <Icon className={styles.indicator} name="chevron-down" type="light" />
      </div>
    )
  }

  renderOption(cluster) {
    const { extra } = this.props
    return (
      <div
        key={cluster.name}
        className={styles.option}
        onClick={() => this.handleClick(cluster)}
      >
        <Icon
          name={CLUSTER_PROVIDER_ICON[cluster.provider] || 'kubernetes'}
          size={20}
          type="light"
        />
        <span className={styles.name}>{cluster.name}</span>
        {cluster.group && (
          <Tag key={cluster.name} type={CLUSTER_GROUP_TAG_TYPE[cluster.group]}>
            {t(`ENV_${cluster.group.toUpperCase()}`, {
              defaultValue: cluster.group,
            })}
          </Tag>
        )}
        {extra && extra(cluster)}
      </div>
    )
  }

  render() {
    const { value, options } = this.props
    const { showOptions } = this.state

    const valueOption = options.find(item => item.name === value.name)
    return (
      <Panel title={t('Cluster Select')}>
        <div className={styles.wrapper}>
          <div className={styles.value}>{this.renderValue(valueOption)}</div>
          {showOptions && (
            <div className={styles.options} ref={this.optionsRef}>
              {options.map(cluster => this.renderOption(cluster))}
            </div>
          )}
        </div>
      </Panel>
    )
  }
}
