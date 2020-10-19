import React from 'react'
import { Icon } from '@kube-design/components'

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
    return (
      <div
        style={{ marginLeft: data.level ? 30 : 0, display: 'flex' }}
        key={key}
      >
        <div className={styles.text}>{`${key}:`}</div>
        &nbsp;
        <div className={styles.value}>{`${data[key]}`}</div>
      </div>
    )
  }
}
