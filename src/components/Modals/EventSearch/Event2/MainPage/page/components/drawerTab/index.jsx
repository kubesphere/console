import React from 'react'
import classnames from 'classnames'
import styles from './index.scss'

export default class DrawerTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
    }
  }

  handleClick = index => {
    this.setState({
      currentIndex: index,
    })
  }

  render() {
    return (
      <div className={styles.tabContent}>
        <div className={styles.tabHead}>
          <div
            className={classnames(styles.tabItem, {
              [styles.tabItemActive]: this.state.currentIndex === 0,
            })}
            onClick={() => this.handleClick(0)}
          >
            <img src="/assets/logging_drawer_tab1.svg" alt="" />
          </div>
          <div
            className={classnames(styles.tabItem, {
              [styles.tabItemActive]: this.state.currentIndex === 1,
            })}
            onClick={() => this.handleClick(1)}
          >
            <img src="/assets/logging_drawer_tab2.svg" alt="" />
          </div>
        </div>
        <div className={styles.tabPanel}>
          {React.Children.map(this.props.children, (element, index) => {
            if (index === this.state.currentIndex) {
              return element
            }
          })}
        </div>
      </div>
    )
  }
}
