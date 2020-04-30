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
import { SwatchesPicker } from 'react-color'
import classnames from 'classnames'

import styles from './index.scss'

export default class ColorSelector extends React.Component {
  state = {
    shouldMenuShow: false,
  }

  startSelect = () => {
    this.setState({ shouldMenuShow: true })
  }

  changeComplete = ({ hex }) => {
    this.setState({ shouldMenuShow: false })
    this.props.onChange(hex)
  }

  render() {
    const { value, className } = this.props
    const { shouldMenuShow } = this.state

    return (
      <div className={classnames(styles.wrapper, className)}>
        <div
          style={{
            backgroundColor: value,
          }}
          onClick={this.startSelect}
        />
        {shouldMenuShow ? (
          <div className={styles.menu}>
            <SwatchesPicker onChangeComplete={this.changeComplete} />
          </div>
        ) : null}
      </div>
    )
  }
}
