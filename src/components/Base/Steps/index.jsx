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

import { Icon } from '@kube-design/components'

import { Text } from 'components/Base'

import styles from './index.scss'

const STATES = {
  current: 'Setting',
  finished: 'Finished',
  notfinish: 'Not set',
}

const Step = ({ step, state }) => (
  <li className={styles[state]}>
    <div className={styles.icon}>
      <Icon name={step.icon || 'appcenter'} size={40} />
    </div>
    <Text
      className={styles.text}
      title={t(step.title)}
      description={t(STATES[state])}
    />
  </li>
)

export default class Steps extends React.Component {
  static propTypes = {
    steps: PropTypes.array.isRequired,
    current: PropTypes.number.isRequired,
  }

  getState = index => {
    const { current } = this.props
    if (index === current) {
      return 'current'
    }
    if (index < current) {
      return 'finished'
    }

    return 'notfinish'
  }

  render() {
    const { steps } = this.props

    return (
      <div className={styles.steps}>
        <ul>
          {steps.map((step, index) => (
            <Step key={step.title} step={step} state={this.getState(index)} />
          ))}
        </ul>
      </div>
    )
  }
}
