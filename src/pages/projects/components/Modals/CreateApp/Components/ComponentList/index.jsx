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
import { isEmpty } from 'lodash'
import { Button } from 'components/Base'

import Item from './Item'

import styles from './index.scss'

export default class ServiceComponents extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    data: {},
    onAdd() {},
    onDelete() {},
  }

  handleAdd = () => {
    this.props.onAdd()
  }

  handleEdit = key => {
    this.props.onAdd(key)
  }

  handleDelete = key => {
    this.props.onDelete(key)
  }

  renderContent() {
    const { data } = this.props

    if (isEmpty(data)) {
      return (
        <div className={styles.empty}>
          <div>
            <p>
              {t(
                'Application components combine workloads and services as components in applications'
              )}
            </p>
            <Button onClick={this.handleAdd}>{t('Add Component')}</Button>
          </div>
        </div>
      )
    }

    return (
      <div>
        {Object.keys(data).map(key => (
          <Item
            key={key}
            data={data[key]}
            propsKey={key}
            onEdit={this.handleEdit}
            onDelete={this.handleDelete}
          />
        ))}
        <div className="text-right margin-t12">
          <Button onClick={this.handleAdd}>{t('Add Component')}</Button>
        </div>
      </div>
    )
  }

  render() {
    const { error } = this.props

    return (
      <div className={styles.wrapper}>
        <div className="h5">{t('Application Components')}</div>
        {this.renderContent()}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    )
  }
}
