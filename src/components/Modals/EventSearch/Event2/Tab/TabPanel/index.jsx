import React from 'react'
import style from '../index.scss'

export default class TabPanel extends React.Component {
  render() {
    const { showIf } = this.props
    return (
      <div className={showIf ? style.tabPanelShow : style.tabPanel}>
        {this.props.children}
      </div>
    )
  }
}
