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

import { Panel } from 'components/Base'
import ContainerItem from './Item'

import styles from './index.scss'

export default class ContainersCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    title: PropTypes.string,
    containers: PropTypes.array,
    initContainers: PropTypes.array,
  }

  static defaultProps = {
    prefix: '',
    containers: [],
    initContainers: [],
  }

  render() {
    const {
      className,
      prefix,
      containers,
      initContainers,
      podName,
    } = this.props
    const title = this.props.title

    return (
      <Panel className={classnames(styles.main, className)} title={title}>
        {containers.map((item, index) => (
          <ContainerItem
            key={index}
            prefix={prefix}
            detail={item}
            podName={podName}
          />
        ))}
        {initContainers.map((item, index) => (
          <ContainerItem
            key={index}
            prefix={prefix}
            detail={item}
            podName={podName}
            isInit
          />
        ))}
      </Panel>
    )
  }
}
