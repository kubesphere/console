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

import { NotifyConfirm } from 'components/Base'
import { SimpleCircle } from 'components/Charts'
import NumberControl from './NumberControl'

import styles from './index.scss'

const initialSeconds = 5

const getInter = value => Number(value || 0)

export default class ReplicaStatus extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    current: PropTypes.number,
    desire: PropTypes.number,
    onScale: PropTypes.func,
  }

  static defaultProps = {
    theme: 'dark',
    name: 'REPLICA_PL',
    current: 0,
    desire: 0,
    onScale: null,
  }

  constructor(props) {
    super(props)

    const desire = getInter(props.desire)

    this.state = {
      prevPropDesire: desire,
      desire,
      seconds: initialSeconds,
      showConfirm: false,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.desire !== prevState.prevPropDesire) {
      const desire = getInter(nextProps.desire)
      return { prevPropDesire: desire, desire }
    }
    return null
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  showConfirm = () => {
    this.setState({ showConfirm: true }, () => {
      this.startTimer()
    })
  }

  hideConfirm = () => {
    this.setState({ showConfirm: false }, () => {
      this.stopTimer()
    })
  }

  handleCancel = () => {
    this.setState({ desire: this.props.desire }, () => {
      this.hideConfirm()
    })
  }

  handleConfirm = () => {
    this.props.onScale(this.state.desire)
    this.hideConfirm()
  }

  handleScale = value => {
    if (value >= 0) {
      this.setState({ desire: value, seconds: initialSeconds }, () => {
        this.showConfirm()
      })
    }
  }

  updateTime = () => {
    const { seconds } = this.state

    this.timer = setTimeout(() => {
      if (seconds > 0) {
        this.setState({ seconds: seconds - 1 }, () => {
          this.updateTime()
        })
      } else {
        this.handleConfirm()
        this.handleCancel()
      }
    }, 1000)
  }

  startTimer = () => {
    if (this.timer) this.stopTimer()
    this.updateTime()
  }

  stopTimer = () => {
    clearTimeout(this.timer)
    this.timer = null
  }

  renderScaleOperation() {
    if (!this.props.onScale) return null

    const { desire } = this.state

    return (
      <div className={styles.scale}>
        <NumberControl value={desire} onChange={this.handleScale} />
      </div>
    )
  }

  render() {
    const { theme, className, name, current } = this.props
    const { showConfirm, seconds, desire } = this.state
    const nameText = t(name)
    const currentText = t('REPLICAS_CURRENT')
    const desireText = t('REPLICAS_DESIRED')

    return (
      <div className={classnames(styles.card, className, styles[theme])}>
        <img className={styles.cardImg} src="/assets/banner-icon-1.svg" />
        <div className={styles.chart}>
          <SimpleCircle
            theme={theme}
            title={nameText}
            legend={[currentText, desireText]}
            value={current}
            total={desire}
          />
        </div>
        <div className={styles.status}>
          <div className={styles.title}>{nameText}</div>
          <div className={styles.detail}>
            <p>
              <label>{desireText}:</label> {desire}
            </p>
            <p>
              <label>{currentText}:</label> {current}
            </p>
          </div>
        </div>
        {this.renderScaleOperation()}

        <NotifyConfirm
          visible={showConfirm}
          width={400}
          title={t('ADJUST_REPLICAS')}
          content={t.html('REPLICAS_SCALE_NOTIFY_CONTENT', {
            num: desire,
          })}
          cancelText={t('REPLICAS_SCALE_NOTIFY_CANCEL')}
          confirmText={t('REPLICAS_SCALE_NOTIFY_CONFIRM', { seconds })}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    )
  }
}
