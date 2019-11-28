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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import TerminalStore from 'stores/terminal'

import Draggable from 'react-draggable'
import { Icon, Loading } from '@pitrix/lego-ui'

import styles from './index.scss'

@observer
export default class KubeControl extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.store = new TerminalStore()
    this.state = {
      active: false,
      enable: true,
    }
  }

  showControl = () => {
    this.setState({ active: true })
  }

  hideControl = () => {
    this.setState({ active: false })
  }

  handleStart = () => {
    this.setState({ enable: true })
  }

  handleDrag = e => {
    e.stopPropagation()
    e.preventDefault()

    this.showControl()
    this.setState({ enable: false })
  }

  handleOpenTerminal = e => {
    if (!this.state.enable) return

    e.stopPropagation()
    e.preventDefault()

    let { namespace, pod, container } = this.store.kubectl
    if (!namespace || !pod || !container) {
      this.store.fetchKubeCtl().then(() => {
        namespace = this.store.kubectl.namespace
        pod = this.store.kubectl.pod
        container = this.store.kubectl.container
        const url = `/terminal/${namespace}/pods/${pod}/containers/${container}`

        window.open(
          url,
          `Connecting ${container}`,
          'width=1200, height=800, scrollbars=1, resizable=1'
        )
      })
    } else {
      const url = `/terminal/${namespace}/pods/${pod}/containers/${container}`
      window.open(
        url,
        `Connecting ${container}`,
        'width=1200, height=800, scrollbars=1, resizable=1'
      )
    }
  }

  componentDidMount() {
    this.dragRef.addEventListener('mouseenter', this.showControl)
    this.dragRef.addEventListener('mouseleave', this.hideControl)
  }

  componentWillUnmount() {
    this.dragRef.removeEventListener('mouseenter', this.showControl)
    this.dragRef.removeEventListener('mouseleave', this.hideControl)
  }

  render() {
    const { className } = this.props

    return (
      <Draggable
        axis="y"
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleOpenTerminal}
      >
        <div
          className={classnames(styles.control, className, {
            [styles.active]: this.state.active,
          })}
          ref={r => {
            this.dragRef = r
          }}
        >
          {this.store.kubectl.isLoading ? (
            <Loading size={20} />
          ) : (
            <Icon name="laptop" size={20} type="light" />
          )}
          <p>{t('Launch kubectl')}</p>
        </div>
      </Draggable>
    )
  }
}
