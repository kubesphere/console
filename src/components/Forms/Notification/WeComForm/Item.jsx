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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty } from 'lodash'

import { Tag, Icon } from '@kube-design/components'
import { BoxInput } from 'components/Inputs'

import styles from './index.scss'

export default class Item extends Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: [],
    onChange() {},
  }

  handleAdd = newValue => {
    const { value, onChange } = this.props
    onChange([...value, newValue])
  }

  handleDelete = newValue => {
    const { value, onChange } = this.props
    const newData = value.filter(item => item !== newValue)
    onChange(newData)
  }

  render() {
    const { validate, type, value, className } = this.props
    const text = type.toUpperCase()

    return (
      <div className={classnames(styles.wrapper, className)}>
        <BoxInput placeholder=" " validate={validate} onAdd={this.handleAdd} />
        <p className="margin-t8">{t(`${type.toUpperCase()}_LIST`)}</p>
        <div className={classnames(styles.boxWrapper, className)}>
          {isEmpty(value) ? (
            <div className={styles.empty}>{t(`EMPTY_${text}_DESC`)}</div>
          ) : (
            value.map(item => {
              return (
                <Tag className={styles.tag} key={item}>
                  {item}
                  <Icon
                    name="close"
                    type="light"
                    size={12}
                    clickable
                    onClick={() => this.handleDelete(item)}
                  />
                </Tag>
              )
            })
          )}
        </div>
      </div>
    )
  }
}
