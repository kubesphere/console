import React, { Component } from 'react'
import style from './index.scss'

export default class Banner extends Component {
  render() {
    const { imgSrc, titleText, desText } = this.props
    return (
      <div className={style.banner}>
        <div className={style.title}>
          <img src={imgSrc} alt="log-statistics"></img>
          <span className={style.text}>{titleText}</span>
        </div>
        <div className={style.description}>{desText}</div>
      </div>
    )
  }
}
