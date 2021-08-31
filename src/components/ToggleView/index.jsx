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
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class ToggleView extends React.Component {
  static propTypes = {
    label: PropTypes.string,
  }

  static defaultProps = {
    label: 'ADVANCED_SETTINGS',
  }

  state = {
    show: this.props.defaultShow || false,
  }

  toggle = () => {
    this.setState(({ show }) => ({
      show: !show,
    }))
  }

  render() {
    const { label, children } = this.props
    const { show } = this.state
    return (
      <>
        <div className={styles.toggle} onClick={this.toggle}>
          <a>
            <span className="align-middle">{t(label)} </span>
            <Icon name={show ? 'chevron-up' : 'chevron-down'} />
          </a>
        </div>
        <div className={classNames({ [styles.children]: !show })}>
          {children}
        </div>
      </>
    )
  }
}
