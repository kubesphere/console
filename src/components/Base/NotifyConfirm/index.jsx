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

import { Icon, Button } from '@kube-design/components'

import styles from './index.scss'

export default class NotifyConfirm extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    width: PropTypes.number,
    type: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    btns: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    width: 'auto',
    type: 'info',
    title: 'title',
    content: 'content',
    confirmText: 'OK',
    cancelText: 'CANCEL',
    onConfirm() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      show: props.visible,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.visible !== state.show) {
      return { show: props.visible }
    }

    return null
  }

  getIconColr = () => {
    const { type } = this.props
    const colors = {
      primary: '#fff',
    }

    switch (type) {
      default:
      case 'info':
        colors.secondary = '#329dce'
        break
    }
    return colors
  }

  handleCancel = () => {
    this.setState({ show: false }, () => {
      const timer = setTimeout(() => {
        this.props.onCancel()
        clearTimeout(timer)
      }, 1000)
    })
  }

  renderBtns() {
    const {
      btns,
      confirmText,
      cancelText,
      onConfirm,
      isSubmitting,
    } = this.props

    if (btns) return btns

    return (
      <div>
        <Button onClick={this.handleCancel}>{t(cancelText)}</Button>
        <Button type="control" onClick={onConfirm} loading={isSubmitting}>
          {t(confirmText)}
        </Button>
      </div>
    )
  }

  renderCard() {
    const { visible, width, title, content } = this.props

    if (!visible) return null

    const { show } = this.state
    const style = {
      width,
    }

    return (
      <div
        className={classnames(styles.card, {
          [styles.in]: show,
          [styles.out]: !show,
        })}
        style={style}
      >
        <div className={styles.cardMain}>
          <div className={styles.title}>
            <Icon name="information" size={20} color={this.getIconColr()} />
            <strong>{title}</strong>
          </div>
          <div className={styles.content}>{content}</div>
        </div>
        <div className={styles.cardFoot}>{this.renderBtns()}</div>
      </div>
    )
  }

  render() {
    return <div className={styles.wrapper}>{this.renderCard()}</div>
  }
}
