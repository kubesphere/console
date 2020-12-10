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

import { Icon } from '@kube-design/components'
import { Image } from 'components/Base'

import styles from './index.scss'

const imgWidth = 200
const imgMargin = 10

export default class ImageSlider extends React.PureComponent {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onChangeImage: PropTypes.func,
    defaultIdx: PropTypes.number,
  }

  static defaultProps = {
    images: [],
    onChangeImage() {},
    defaultIdx: 0,
  }

  constructor(props) {
    super(props)
    this.state = {
      showOverlay: false,
      currentIdx: props.defaultIdx || 0,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentIdx } = this.state
    if (currentIdx !== prevState.currentIdx) {
      this.props.onChangeImage(this.props.images[currentIdx])
    }
  }

  componentWillUnmount() {
    this.stopAnimation()
  }

  stopAnimation() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  handleClickImage = e => {
    const { idx } = e.currentTarget.dataset

    this.stopAnimation()
    this.setState({
      showOverlay: true,
      currentIdx: parseInt(idx, 10) || 0,
    })
  }

  closeOverlay = () => {
    this.setState({
      showOverlay: false,
    })
  }

  getPrevNextIdx = (type = 'next') => {
    const { currentIdx } = this.state
    const countImgs = this.props.images.length
    if (type === 'next') {
      return currentIdx + 1 >= countImgs ? 0 : currentIdx + 1
    }
    return currentIdx - 1 < 0 ? countImgs - 1 : currentIdx - 1
  }

  showNextPic = () => {
    this.setState({
      currentIdx: this.getPrevNextIdx(),
    })
  }

  handleClickPrev = () => {
    this.goToIdx(this.getPrevNextIdx('prev'))
  }

  handleClickNext = () => {
    this.goToIdx(this.getPrevNextIdx())
  }

  handleClickIndicator = idx => {
    this.goToIdx(idx)
  }

  goToIdx = idx => {
    this.stopAnimation()
    this.setState({ currentIdx: idx })
  }

  renderOverlay() {
    const { showOverlay, currentIdx } = this.state
    const selectedPic = this.props.images[currentIdx]
    if (!showOverlay) {
      return null
    }

    return (
      <div className={styles.overlay}>
        <div className={styles.closeOverlay} onClick={this.closeOverlay}>
          <Icon name="close" size={24} type="dark" />
        </div>
        <div className={styles.viewCont}>
          <label className={styles.pre} onClick={this.handleClickPrev}>
            <Icon name="chevron-left" size={24} type="dark" />
          </label>
          <label className={styles.next} onClick={this.handleClickNext}>
            <Icon name="chevron-right" size={24} type="dark" />
          </label>
          <div className={styles.overlayPic}>
            <Image src={selectedPic} />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { images, className } = this.props
    const { currentIdx } = this.state

    const picWidth = (imgWidth + imgMargin) * images.length
    const picLeft = currentIdx * (imgWidth + imgMargin)

    if (!images.length) {
      return <div className={styles.slider}>{t('None')}</div>
    }

    return (
      <div className={classnames(styles.slider, className)}>
        <label className={styles.pre} onClick={this.handleClickPrev}>
          <Icon name="chevron-left" size={24} type="dark" />
        </label>
        <label className={styles.next} onClick={this.handleClickNext}>
          <Icon name="chevron-right" size={24} type="dark" />
        </label>
        {images.length > 2 && (
          <div className={styles.dotList}>
            {images.map((img, idx) => (
              <label
                key={`${img}-${idx}`}
                className={styles.dot}
                onClick={() => this.handleClickIndicator(idx)}
              >
                <span
                  className={classnames({
                    [styles.active]: currentIdx === idx,
                  })}
                />
              </label>
            ))}
          </div>
        )}
        <div className={styles.listOuter}>
          <ul
            className={styles.pictureList}
            style={{ width: `${picWidth}px`, left: `-${picLeft}px` }}
          >
            {images.map((pic, idx) => (
              <li className={styles.pictureOuter} key={idx}>
                <div
                  className={styles.picture}
                  data-idx={idx}
                  onClick={this.handleClickImage}
                >
                  <Image src={pic} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        {this.renderOverlay()}
      </div>
    )
  }
}
