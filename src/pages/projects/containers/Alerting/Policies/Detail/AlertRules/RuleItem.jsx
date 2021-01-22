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
import { get } from 'lodash'

import { ALL_METRICS_CONFIG } from 'configs/alerting/metrics'
import { Icon } from '@kube-design/components'
import { Text } from 'components/Base'

import styles from './index.scss'

export default class RuleItem extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    resources: PropTypes.array,
  }

  static defaultProps = {
    data: {},
    resources: [],
  }

  render() {
    const { kind, data = {}, resources = [] } = this.props
    const { condition_type, thresholds, unit, _metricType } = data
    const target = `${t(kind)}: ${resources.join(', ')}`
    const metricConfig = get(ALL_METRICS_CONFIG, _metricType) || {}
    const condtion = ` ${condition_type} ${thresholds}${unit}`

    return (
      <div className={styles.item}>
        <Text title={target} description={t('Monitoring Target')} />
        <Text
          title={
            <span>
              <Icon name={metricConfig.prefixIcon || 'appcenter'} size={20} />
              {t(metricConfig.label || 'Unknown')}
              {condtion}
            </span>
          }
          description={t('Alerting Rule')}
        />
      </div>
    )
  }
}
