import React from 'react'
import { List } from 'components/Base'
import styles from './index.scss'

export default class Card extends React.PureComponent {
  getDetails(item) {
    const { data } = this.props
    return [
      {
        title: data.length,
        description: 'Count',
        className: styles.texts,
      },
      {
        title: item.kubernetes_ip.value || '-',
        description: 'IP',
        className: styles.texts,
      },
    ]
  }

  render() {
    const { data } = this.props
    return (
      <List>
        {data.map(item => (
          <List.Item
            key={item.id}
            className={styles.wrapper}
            titleClass={styles.title}
            icon="pod"
            status={item.kubernetes_state.value}
            title={item.label.value}
            description={item.kubernetes_state.value}
            details={this.getDetails(item)}
            onClick={this.handleClick}
          />
        ))}
      </List>
    )
  }
}
