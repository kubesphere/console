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
import { Icon } from '@kube-design/components'
import Item from './item'
import styles from './index.scss'

export default class Metadata extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
    }
  }

  onCollapsed(item) {
    const data = { ...item, collapsed: !item.collapsed }
    this.setState({ data })
  }

  render() {
    const { data } = this.state
    const key = Object.keys(data)[0]
    if (typeof data[key] === 'object' && data[key] != null) {
      return (
        <div
          key={key}
          className={data.collapsed ? styles.close : ''}
          style={{ marginLeft: data.level * 30 }}
        >
          <div
            className={styles.header}
            onClick={this.onCollapsed.bind(this, data)}
          >
            <Icon
              name={data.collapsed ? 'caret-right' : 'caret-down'}
              size={16}
            />
            &nbsp;<span className={styles.title}>{key}</span>
            &nbsp;
            <span className={styles.count}>
              {Object.keys(data[key]).length || 0} item
            </span>
          </div>
          {this.props.renderMetadata(data[key])}
        </div>
      )
    }
    return <Item data={data} Key={key}></Item>
  }
}
