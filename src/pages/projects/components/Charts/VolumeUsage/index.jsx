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
import { getSuitableValue } from 'utils/monitoring'

import styles from './index.scss'

const WIDTH = 100
const HEIGHT = 100
const MAX_WAVE_ANGLE = 20

export default class VolumeUseChart extends React.Component {
  static propTypes = {
    rate: PropTypes.number,
    className: PropTypes.string,
  }

  static defaultProps = {
    rate: 0,
  }

  getWavePath() {
    const { rate: useRate } = this.props
    const sineCount = 2

    const top = HEIGHT * (1 - useRate)
    const halfSineWidth = WIDTH / (sineCount * 4)
    const angle = (0.5 - Math.abs(0.5 - useRate)) * MAX_WAVE_ANGLE

    return `
      M0 ${top}
      
      Q ${halfSineWidth} ${top + angle}, ${halfSineWidth * 2} ${top}
      T ${halfSineWidth * 4} ${top}

      T ${halfSineWidth * 6} ${top}
      T ${halfSineWidth * 8} ${top}

      T ${halfSineWidth * 10} ${top}
      T ${halfSineWidth * 12} ${top}

      T ${halfSineWidth * 14} ${top}
      T ${halfSineWidth * 16} ${top}

      V 100
      H 0

      Z
    `
  }

  render() {
    const { className } = this.props
    return (
      <div className={classnames(styles.container, className)}>
        {this.renderForeground()}
        {this.renderCapacity()}
      </div>
    )
  }

  renderForeground() {
    const { rate } = this.props
    const percentage = getSuitableValue(rate, '%')

    return (
      <div className={styles.foreground}>
        <h3>{percentage}%</h3>
      </div>
    )
  }

  renderCapacity() {
    const viewBox = `0 0 ${WIDTH} ${HEIGHT}`

    const path = this.getWavePath()

    return (
      <svg
        width="100%"
        height="100%"
        viewBox={viewBox}
        preserveAspectRatio="none"
      >
        <path className={styles.wave} d={path} />
        <path className={styles.wave2} d={path} />
      </svg>
    )
  }
}
