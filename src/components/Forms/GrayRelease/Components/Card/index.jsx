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
import { get, isEmpty } from 'lodash'

import { Icon } from '@pitrix/lego-ui'
import { Button } from 'components/Base'

import styles from './index.scss'

export default class Card extends React.PureComponent {
  static propTypes = {
    component: PropTypes.object,
    value: PropTypes.bool,
    loading: PropTypes.bool,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    component: {},
    value: false,
    loading: false,
    onSelect() {},
  }

  handleClick = () => {
    const { value, component, onSelect } = this.props

    onSelect(component, !value)
  }

  renderActions() {
    const { value, component, loading } = this.props

    if (component.workloads.length <= 0) {
      return <span className={styles.right}>{t('No workload found')}</span>
    }

    if (component.workloadType !== 'Deployment') {
      return (
        <span className={styles.right}>{t('Unsupported workload type')}</span>
      )
    }

    if (component.strategies.length > 0) {
      return (
        <span className={styles.right}>
          {t('Unfinished grayscale release jobs exist')}
        </span>
      )
    }

    return (
      <Button
        className={styles.right}
        type={value ? 'control' : 'default'}
        loading={loading}
        onClick={this.handleClick}
      >
        {value ? t('Deselect') : t('Select')}
      </Button>
    )
  }

  render() {
    const { component } = this.props
    const versions = component.workloads
      .map(workload => get(workload, 'labels.version'))
      .filter(version => !isEmpty(version))

    const isIstioEnable =
      get(component, 'annotations["servicemesh.kubesphere.io/enabled"]') ===
      'true'

    return (
      <div className={styles.card}>
        <div className={styles.icon}>
          <Icon name="network-router" size={40} />
          {isIstioEnable && (
            <span className={styles.istio}>
              <Icon name="istio" size={16} color={{ primary: '#329dce' }} />
            </span>
          )}
        </div>
        <div className={styles.text}>
          <div className="h6">{component.name}</div>
          <p>{`${t('Workload Type')}: ${
            component.workloadType
              ? t(`SERVICE_${component.workloadType.toUpperCase()}`)
              : ''
          }`}</p>
        </div>
        <div className={styles.version}>
          <strong>{versions.join(',') || '-'}</strong>
          <p>{t('Version')}</p>
        </div>
        {this.renderActions()}
      </div>
    )
  }
}
