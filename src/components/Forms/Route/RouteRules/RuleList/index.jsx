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

import { get, set, isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components/Base'

import Card from './Card'

import styles from './index.scss'

export default class RuleList extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    onShow: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    value: [],
    onChange() {},
    onShow() {},
  }

  static contextTypes = {
    formData: PropTypes.object,
  }

  handleAdd = () => {
    this.props.onShow()
  }

  handleEdit = data => {
    this.props.onShow(data)
  }

  handleDelete = host => {
    const { value, onChange } = this.props

    onChange(value.filter(item => item.host !== host))

    const tls = get(this.context.formData, 'spec.tls[0]')

    if (!tls) {
      return
    }

    if (isEmpty(tls.hosts)) {
      set(this.context.formData, 'spec.tls', [])
    } else {
      tls.hosts = tls.hosts.filter(item => item !== host)
      set(this.context.formData, 'spec.tls[0]', tls)
    }
  }

  renderEmpty() {
    const { disabled } = this.props
    return (
      <div className={styles.empty}>
        <p>{t('Please add at least one routing rule')}</p>
        <Button
          className={styles.add}
          onClick={this.handleAdd}
          disabled={disabled}
        >
          {t('Add Route Rule')}
        </Button>
      </div>
    )
  }

  renderContent() {
    const { value } = this.props
    const tls = get(this.context.formData, 'spec.tls[0]')

    return (
      <div className={styles.content}>
        <ul className={styles.list}>
          {value.map(item => (
            <Card
              rule={item}
              tls={tls}
              key={item.host}
              onEdit={this.handleEdit}
              onDelete={this.handleDelete}
            />
          ))}
        </ul>
        <div className="text-right">
          <Button className={styles.add} onClick={this.handleAdd}>
            {t('Add Route Rule')}
          </Button>
        </div>
      </div>
    )
  }

  render() {
    const { value } = this.props

    return (
      <div className={styles.wrapper}>
        {value.length <= 0 ? this.renderEmpty() : this.renderContent()}
      </div>
    )
  }
}
