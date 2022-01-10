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

import { isUndefined } from 'lodash'
import React from 'react'
import { Slider } from '@kube-design/components'

import styles from './index.scss'

const SLIDER_PROPS = {
  className: styles.slider,
  railStyle: {
    height: 30,
    backgroundColor: '#7eb8dc',
    borderRadius: 2,
  },
  handleStyle: {
    width: 14,
    height: 30,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 0,
    border: 'none',
  },
  trackStyle: { height: 30, borderRadius: 2, backgroundColor: '#329dce' },
}

export default class TrafficSlider extends React.PureComponent {
  static defaultProps = {
    defaultValue: 50,
  }

  render() {
    const { leftContent, rightContent, defaultValue, ...rest } = this.props
    const value = isUndefined(rest.value) ? defaultValue : rest.value

    return (
      <div className={styles.wrapper}>
        <Slider
          min={0}
          max={100}
          defaultValue={value}
          {...rest}
          {...SLIDER_PROPS}
        />
        <span
          className={styles.floatContent}
          style={{
            left: `${Math.floor(value / 2)}%`,
            maxWidth: `${value}%`,
          }}
        >
          {t('VERSION_TRAFFIC_PERCENT', {
            version: leftContent,
            percent: value,
          })}
        </span>
        <span
          className={styles.floatContent}
          style={{
            left: `${Math.floor(value / 2) + 50}%`,
            maxWidth: `${100 - value}%`,
          }}
        >
          {t('VERSION_TRAFFIC_PERCENT', {
            version: rightContent,
            percent: 100 - value,
          })}
        </span>
      </div>
    )
  }
}
