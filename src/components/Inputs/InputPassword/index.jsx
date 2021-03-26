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
import { isEmpty } from 'lodash'
import { InputPassword, Icon, Dropdown } from '@kube-design/components'
import classNames from 'classnames'
import { PATTERN_PASSWORD } from 'utils/constants'

import styles from './index.scss'

const PATTERN_WORD = /(?=.*?[A-Z])(?=.*?[a-z])/
const PATTERN_NUMBER = /(?=.*?[0-9])/

const getStrength = value => {
  if (isEmpty(value)) {
    return -1
  }

  let ret = 0
  if (PATTERN_WORD.test(value)) {
    ret += 4
  }

  if (PATTERN_NUMBER.test(value)) {
    ret += 2
  }

  if (value.length >= 6 && value < 12) {
    ret += 2
  } else if (value.length >= 12) {
    ret += 4
  }

  if (!PATTERN_PASSWORD.test(value)) {
    return 0
  }

  return ret
}

export default class Password extends React.Component {
  state = {
    strength: -1,
    showTip: false,
  }

  ref = React.createRef()

  handleChange = (e, value) => {
    const { withStrength, onChange } = this.props
    onChange && onChange(e, value)

    if (withStrength) {
      const strength = getStrength(value)
      this.setState({ strength, showTip: strength > -1 })
    }
  }

  handleDropdownClose = e => {
    if (
      e &&
      e.target &&
      this.ref &&
      this.ref.current &&
      this.ref.current.contains(e.target)
    ) {
      this.setState({ showTip: true })
    } else {
      this.setState({ showTip: false })
    }
  }

  handleInputClick = () => {
    const { strength } = this.state
    this.setState({ showTip: strength > -1 })
  }

  handleInputBlur = () => {
    this.setState({ showTip: false })
  }

  getColor = () => {
    const { strength } = this.state

    if (strength === -1) {
      return { width: 0, backgroundColor: '#fff' }
    }
    if (strength >= 0 && strength < 6) {
      return { width: '33%', backgroundColor: '#ca2621' }
    }
    if (strength >= 6 && strength < 8) {
      return { width: '66%', backgroundColor: '#f5a623' }
    }
    if (strength >= 8) {
      return { width: '100%', backgroundColor: '#55bc8a' }
    }
  }

  renderStrengthContent() {
    const { value = '' } = this.props

    return (
      <div className={styles.content}>
        <p>{t('Your password must meet the following requirements')}</p>
        <ul className={styles.rules}>
          <li>
            <Icon
              className={classNames(styles.icon, {
                [styles.selected]: PATTERN_WORD.test(value),
              })}
              name="check"
              size={12}
              type="light"
            />
            {t('At least 1 uppercase and lowercase letter')}
          </li>
          <li>
            <Icon
              className={classNames(styles.icon, {
                [styles.selected]: PATTERN_NUMBER.test(value),
              })}
              name="check"
              size={12}
              type="light"
            />
            {t('At least 1 number')}
          </li>
          <li>
            <Icon
              className={classNames(styles.icon, {
                [styles.selected]: value.length >= 6,
              })}
              name="check"
              size={12}
              type="light"
            />
            {t('Password length is at least 6 characters')}
          </li>
        </ul>
        <p>{t('Password Strength')}:</p>
        <div className={styles.barWrapper}>
          <div className={styles.bar} style={this.getColor()} />
        </div>
        <p className={styles.tip}>
          {t(
            'Avoid using the password that has already been used on other websites or the one that can be easily guessed.'
          )}
        </p>
      </div>
    )
  }

  render() {
    const { withStrength, tipClassName, ...rest } = this.props
    const { showTip, strength } = this.state

    if (withStrength) {
      return (
        <div className={styles.wrapper} ref={this.ref}>
          <Dropdown
            className={tipClassName}
            visible={showTip && strength > -1}
            content={this.renderStrengthContent()}
            placement="bottomRight"
            closeAfterClick={false}
            onClose={this.handleDropdownClose}
          >
            <div className={styles.trigger} />
          </Dropdown>
          <InputPassword
            {...rest}
            onChange={this.handleChange}
            onBlur={this.handleInputBlur}
            onClick={this.handleInputClick}
          />
        </div>
      )
    }

    return <InputPassword {...rest} />
  }
}
