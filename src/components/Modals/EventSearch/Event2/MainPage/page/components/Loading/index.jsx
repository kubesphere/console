import React from 'react'
import styles from './index.scss'

export default class Loading extends React.Component {
  render() {
    const { loading } = this.props
    if (loading) {
      return (
        <div className={styles.testImg}>
          <img src="/assets/Loading.svg"></img>
        </div>
      )
    }
    return <>{this.props.children}</>
  }
}
