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
import { isEmpty } from 'lodash'

import { Tag, Icon } from '@kube-design/components'
import { BoxInput } from 'components/Inputs'

import styles from './index.scss'

export default class KeyWords extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: [],
    onChange() {},
  }

  handleAdd = item => {
    const { value, onChange } = this.props
    onChange([...value, item])
  }

  handleDelete = item => {
    const { value, onChange } = this.props
    const newData = value.filter(v => v !== item)
    onChange(newData)
  }

  render() {
    const {
      value,
      validate,
      className,
      title = t('KEYWORD'),
      listTitle = t('KEYWORDS_LIST'),
      emptyDesc = t('EMPTY_KEYWORDS_DESC'),
      placeholder = t(' '),
    } = this.props

    return (
      <div className={classnames(styles.wrapper, className)}>
        <BoxInput
          className={styles.wrapper}
          title={title}
          placeholder={placeholder}
          validate={validate}
          onAdd={this.handleAdd}
        />
        <p className="margin-t8">{listTitle}</p>
        <div className={styles.boxWrapper}>
          {isEmpty(value) ? (
            <div className={styles.empty}>{emptyDesc}</div>
          ) : (
            value.map(item => {
              return (
                <Tag className={styles.tag} key={item}>
                  {item}
                  <Icon
                    name="close"
                    size={12}
                    clickable
                    type="light"
                    onClick={() => this.handleDelete(item)}
                  ></Icon>
                </Tag>
              )
            })
          )}
        </div>
      </div>
    )
  }
}
