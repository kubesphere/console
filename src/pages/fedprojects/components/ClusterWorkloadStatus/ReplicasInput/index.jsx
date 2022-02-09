import React, { Component } from 'react'
import { NotifyConfirm } from 'components/Base'
import styles from '../index.scss'

const initialSeconds = 5
const getInter = value => Number(value || 0)

export default class ReplicasInput extends Component {
  constructor(props) {
    super(props)

    const desire = props.desire

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

  handleScale = e => {
    const value = e.target.value
    if (/^\+?[1-9][0-9]*$/.test(value) || value === '') {
      this.setState({ desire: value, seconds: initialSeconds }, () => {
        this.showConfirm()
      })
    }
  }

  showConfirm = () => {
    this.setState({ showConfirm: true }, () => {
      this.startTimer()
    })
  }

  startTimer = () => {
    if (this.timer) this.stopTimer()
    this.updateTime()
  }

  stopTimer = () => {
    clearTimeout(this.timer)
    this.timer = null
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

  handleConfirm = () => {
    this.props.onChange(this.state.desire)
    this.hideConfirm()
  }

  handleCancel = () => {
    this.setState({ desire: this.props.desire }, () => {
      this.hideConfirm()
    })
  }

  hideConfirm = () => {
    this.setState({ showConfirm: false }, () => {
      this.stopTimer()
    })
  }

  render() {
    const { name } = this.props
    const { desire, showConfirm, seconds } = this.state
    return (
      <>
        <div className={styles.replicasInput}>
          <input name={name} value={desire} onChange={this.handleScale}></input>
        </div>
        <NotifyConfirm
          visible={showConfirm}
          width={400}
          title={t('ADJUST_REPLICAS')}
          content={t.html('REPLICAS_SCALE_NOTIFY_CONTENT', {
            num: Number(desire),
          })}
          cancelText={t('REPLICAS_SCALE_NOTIFY_CANCEL')}
          confirmText={t('REPLICAS_SCALE_NOTIFY_CONFIRM', { seconds })}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </>
    )
  }
}
