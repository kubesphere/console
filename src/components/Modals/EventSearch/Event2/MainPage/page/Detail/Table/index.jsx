import React from 'react'
import AnsiUp from 'ansi_up'
import moment from 'moment'
import styles from '../index.scss'

const converter = new AnsiUp()

export default class Table extends React.Component {
  renderLogTd(log) {
    const queryResult = converter.ansi_to_html(log || '')

    return (
      <span
        dangerouslySetInnerHTML={{
          __html: queryResult,
        }}
      />
    )
  }

  render() {
    const { data, drawerClick } = this.props
    return (
      <div className={styles.tableContent}>
        {data.map((item, index) => (
          <div
            className={styles.tableLine}
            key={index}
            onClick={() => drawerClick(item)}
          >
            <div className={styles.title}>
              {`[${moment(item.lastTimestamp).format('YYYY-MM-DD HH:mm:ss')}]`}
            </div>
            <div className={styles.type}>
              <div
                className={
                  item.type === 'Normal' ? styles.normal : styles.warning
                }
              >
                {item.type}
              </div>
            </div>
            <div className={styles.source}>
              <div className={styles.sourceType}>
                {item.involvedObject.kind}
              </div>
              {item.source.component}
            </div>
            <div className={styles.reason}>{item.reason}</div>
            <div className={styles.message}>{item.message}</div>
          </div>
        ))}
      </div>
    )
  }
}
